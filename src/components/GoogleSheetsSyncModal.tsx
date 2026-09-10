import React, { useState, useEffect } from 'react';
import {
  X,
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  PlusCircle,
  Link2,
  AlertCircle,
  LogIn,
  LogOut,
  Clock,
  ChevronRight
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logout,
  getCurrentUser,
  subscribeToAuth,
  getAccessToken,
} from '../services/googleAuth';
import {
  getSavedSheetConfig,
  saveSheetConfig,
  ConnectedSheetConfig,
  fetchSpreadsheetMetadata,
  fetchSpreadsheetRows,
  createClinicSpreadsheet,
  extractSpreadsheetId,
  ensureSheetHeaders,
  getQueuedAppointments,
  syncQueuedAppointments,
} from '../services/googleSheets';

interface GoogleSheetsSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSheetsSyncModal: React.FC<GoogleSheetsSyncModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [hasToken, setHasToken] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [config, setConfig] = useState<ConnectedSheetConfig | null>(getSavedSheetConfig());

  // Input states
  const [sheetUrlOrId, setSheetUrlOrId] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSyncingQueue, setIsSyncingQueue] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sheet data preview
  const [sheetRows, setSheetRows] = useState<string[][]>([]);
  const [sheetHeaders, setSheetHeaders] = useState<string[]>([]);
  const [isLoadingRows, setIsLoadingRows] = useState(false);

  // Queued offline items
  const [pendingQueueCount, setPendingQueueCount] = useState(getQueuedAppointments().length);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user, token) => {
      setCurrentUser(user);
      setHasToken(!!token);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen) {
      const saved = getSavedSheetConfig();
      setConfig(saved);
      setPendingQueueCount(getQueuedAppointments().length);
      setErrorMessage(null);
      setSuccessMessage(null);
      if (saved && hasToken) {
        loadRows(saved.spreadsheetId, saved.sheetName);
      }
    }
  }, [isOpen, hasToken]);

  const loadRows = async (spreadsheetId: string, sheetName: string) => {
    setIsLoadingRows(true);
    try {
      const result = await fetchSpreadsheetRows(spreadsheetId, sheetName, 20);
      setSheetHeaders(result.headers);
      setSheetRows(result.rows);
    } catch (err: any) {
      console.warn('Could not load sheet rows:', err);
    } finally {
      setIsLoadingRows(false);
    }
  };

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setSuccessMessage(`Signed in as ${res.user.email}`);
        const currentConfig = getSavedSheetConfig();
        if (currentConfig) {
          loadRows(currentConfig.spreadsheetId, currentConfig.sheetName);
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to sign in with Google. Please check pop-up permissions.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setSheetRows([]);
    setSheetHeaders([]);
    setSuccessMessage('Signed out successfully.');
  };

  const handleConnectExisting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sheetUrlOrId.trim()) return;

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsConnecting(true);

    try {
      const spreadsheetId = extractSpreadsheetId(sheetUrlOrId);
      if (!spreadsheetId) {
        throw new Error('Please enter a valid Google Sheet URL or Spreadsheet ID.');
      }

      const meta = await fetchSpreadsheetMetadata(spreadsheetId);
      const chosenTab = meta.sheets[0] || 'Sheet1';

      // Ensure standard column headers exist
      await ensureSheetHeaders(spreadsheetId, chosenTab);

      const newConfig: ConnectedSheetConfig = {
        spreadsheetId,
        spreadsheetTitle: meta.title,
        sheetName: chosenTab,
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
        lastSyncedAt: new Date().toISOString(),
        totalSyncedCount: config?.totalSyncedCount || 0,
      };

      saveSheetConfig(newConfig);
      setConfig(newConfig);
      setSuccessMessage(`Connected to "${meta.title}" (${chosenTab})!`);
      setSheetUrlOrId('');
      loadRows(spreadsheetId, chosenTab);

      // Auto sync any pending queued appointments
      if (pendingQueueCount > 0) {
        handleSyncQueue();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Could not connect to Google Sheet. Ensure you are signed in with access.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCreateNew = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsCreating(true);

    try {
      const newConfig = await createClinicSpreadsheet('Nagpal Clinic & Ultrasound - Patient Appointments');
      setConfig(newConfig);
      setSuccessMessage('Created new appointment spreadsheet in your Google Drive!');
      loadRows(newConfig.spreadsheetId, newConfig.sheetName);

      // Auto sync any pending queued appointments
      if (pendingQueueCount > 0) {
        handleSyncQueue();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to create spreadsheet in Google Drive.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleSyncQueue = async () => {
    setIsSyncingQueue(true);
    setErrorMessage(null);
    try {
      const res = await syncQueuedAppointments();
      setPendingQueueCount(getQueuedAppointments().length);
      if (res.synced > 0) {
        setSuccessMessage(`Successfully fed ${res.synced} appointment(s) into your Google Sheet!`);
        if (config) {
          loadRows(config.spreadsheetId, config.sheetName);
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error syncing appointments to Google Sheet.');
    } finally {
      setIsSyncingQueue(false);
    }
  };

  const handleDisconnect = () => {
    saveSheetConfig(null);
    setConfig(null);
    setSheetRows([]);
    setSheetHeaders([]);
    setSuccessMessage('Google Sheet disconnected from website.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B1F3A]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#0B1F3A] text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F8B8D]/20 border border-[#0F8B8D]/40 flex items-center justify-center text-[#25D366]">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                  Google Sheets Integration
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                Live Appointment Sheet Feed
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Notifications */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <div className="flex-1">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <div className="flex-1">{successMessage}</div>
            </div>
          )}

          {/* Authentication Status Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {currentUser ? (
                <div className="w-10 h-10 rounded-full bg-[#0F8B8D] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'G'}
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                  <LogIn className="w-5 h-5" />
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-[#0B1F3A]">
                  {currentUser ? currentUser.displayName || 'Authorized Google User' : 'Google Account Authorization'}
                </p>
                <p className="text-[11px] text-slate-500">
                  {currentUser ? currentUser.email : 'Sign in to grant the clinic website permission to feed appointment rows'}
                </p>
              </div>
            </div>

            {!hasToken ? (
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isAuthenticating}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 shadow-xs transition-colors cursor-pointer disabled:opacity-60"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>{isAuthenticating ? 'Connecting...' : 'Sign in with Google'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect Google</span>
              </button>
            )}
          </div>

          {/* Connected Sheet Status */}
          {config ? (
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-emerald-900">
                    Connected Spreadsheet
                  </span>
                  <span className="text-[10px] bg-emerald-200/80 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    Tab: {config.sheetName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={config.spreadsheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Open Sheet</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={handleDisconnect}
                    className="px-2.5 py-1.5 text-slate-500 hover:text-rose-600 text-xs rounded-lg transition-colors cursor-pointer"
                    title="Disconnect this sheet"
                  >
                    Unlink
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#0B1F3A]">
                  {config.spreadsheetTitle}
                </h4>
                <p className="text-[11px] text-slate-500 font-mono break-all mt-0.5">
                  ID: {config.spreadsheetId}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1 border-t border-emerald-200/60">
                <span>
                  Total Feeded: <strong>{config.totalSyncedCount || 0}</strong> bookings
                </span>
                <span>•</span>
                <span>
                  Status:{' '}
                  <span className="text-emerald-700 font-semibold">
                    Automatic Row-by-Row Active
                  </span>
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">No Google Sheet is currently linked.</p>
                  <p className="text-amber-800 text-[11px] mt-0.5">
                    Connect your existing Google Sheet (paste its URL below) or click to create a pre-formatted spreadsheet matching your attached CSV template.
                  </p>
                </div>
              </div>

              {/* Option A: Connect Existing Sheet */}
              <form onSubmit={handleConnectExisting} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A]">
                  <Link2 className="w-4 h-4 text-[#0F8B8D]" />
                  <span>Option 1: Paste Your Google Sheet URL or ID</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sheetUrlOrId}
                    onChange={(e) => setSheetUrlOrId(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/1.../edit"
                    className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0F8B8D]"
                  />
                  <button
                    type="submit"
                    disabled={isConnecting || !sheetUrlOrId.trim()}
                    className="px-4 py-2.5 bg-[#0F8B8D] hover:bg-[#0d797b] text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    {isConnecting ? 'Linking...' : 'Connect Sheet'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Tip: Make sure the Google account you signed in with above has edit access to the sheet.
                </p>
              </form>

              {/* Option B: Create New Sheet */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A]">
                    <PlusCircle className="w-4 h-4 text-[#0F8B8D]" />
                    <span>Option 2: Create New Google Sheet with Attached Template</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Instantly creates a new sheet in your Drive with columns: <em>Submission ID, Respondent ID, Submitted at, Name, Age, Phone No, Token No, Check Box</em> + booking details.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCreateNew}
                  disabled={isCreating || !hasToken}
                  className="px-4 py-2.5 bg-[#0B1F3A] hover:bg-[#132d52] text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 cursor-pointer shadow-xs whitespace-nowrap"
                >
                  {isCreating ? 'Creating in Drive...' : 'Create & Connect'}
                </button>
              </div>
            </div>
          )}

          {/* Pending Queue Section */}
          {pendingQueueCount > 0 && (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-bold text-blue-900">
                  {pendingQueueCount} Offline / Pending Booking(s) Waiting
                </p>
                <p className="text-blue-700 text-[11px]">
                  Bookings made prior to connecting can be fed into your sheet now.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSyncQueue}
                disabled={isSyncingQueue || !config || !hasToken}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-50 shadow-xs flex items-center gap-1.5 whitespace-nowrap"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingQueue ? 'animate-spin' : ''}`} />
                <span>Sync Now</span>
              </button>
            </div>
          )}

          {/* Live Sheet Data Preview Table */}
          {config && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
                    Recent Row Entries in Sheet
                  </h4>
                  {isLoadingRows && <span className="text-[11px] text-slate-400 animate-pulse">Loading...</span>}
                </div>
                <button
                  type="button"
                  onClick={() => loadRows(config.spreadsheetId, config.sheetName)}
                  className="inline-flex items-center gap-1 text-[11px] text-[#0F8B8D] hover:underline font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Refresh Preview</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 max-h-60 bg-white">
                <table className="w-full text-left text-[11px] text-slate-600">
                  <thead className="bg-[#0B5E56] text-white font-bold sticky top-0 uppercase text-[10px] tracking-wider">
                    <tr>
                      {(sheetHeaders.length > 0
                        ? sheetHeaders
                        : ['Submission ID', 'Respondent ID', 'Submitted at', 'Name', 'Age', 'Phone No ', 'Token No', 'Check Box']
                      ).map((col, idx) => (
                        <th key={idx} className="px-3 py-2 border-r border-[#08453f] whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sheetRows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={sheetHeaders.length || 8}
                          className="px-4 py-6 text-center text-slate-400 italic"
                        >
                          {isLoadingRows ? 'Loading rows...' : 'No appointment rows recorded yet. Book a test appointment to watch it feed here in real-time!'}
                        </td>
                      </tr>
                    ) : (
                      sheetRows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                          {row.map((val, cIdx) => (
                            <td key={cIdx} className="px-3 py-2 border-r border-slate-100 whitespace-nowrap">
                              {cIdx === 7 && val === 'TRUE' ? (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                                  TRUE
                                </span>
                              ) : (
                                val
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Row mapping explanation for user confidence */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <p className="font-bold text-slate-700">Row-Wise Automatic Feeding Specs:</p>
            <p>
              • <strong>Submission ID & Respondent ID:</strong> Auto-generated 7-character unique tokens.
            </p>
            <p>
              • <strong>Submitted at:</strong> Formatted timestamp (e.g. <code>2026-09-10 15:30:00</code>).
            </p>
            <p>
              • <strong>Name, Age, Phone No :</strong> Direct patient details from the booking modal.
            </p>
            <p>
              • <strong>Token No:</strong> Sequential numeric appointment token.
            </p>
            <p>
              • <strong>Check Box:</strong> Automatically logged as <code>TRUE</code>.
            </p>
            <p>
              • <strong>Service, Date, Time & Notes:</strong> Appended in subsequent columns for complete clinic context.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            Nagpal Clinic & Ultrasound • Google Sheets Sync
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
