import { getAccessToken } from './googleAuth';
import { SheetAppointmentRecord } from '../types';

export interface ConnectedSheetConfig {
  spreadsheetId: string;
  spreadsheetTitle: string;
  sheetName: string;
  spreadsheetUrl: string;
  lastSyncedAt?: string;
  totalSyncedCount: number;
}

const STORAGE_KEY_CONFIG = 'nagpal_clinic_google_sheet_config';
const STORAGE_KEY_QUEUE = 'nagpal_clinic_pending_sheet_appointments';

/**
 * Generate clean 7-character alphanumeric random IDs matching template
 * e.g. "aOlvWx2", "aQXa5Nq"
 */
export function generateRandomId(length = 7): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Format submission timestamp matching template format "YYYY-MM-DD H:mm:ss"
 * e.g. "2026-09-04 9:43:38"
 */
export function formatSubmissionDate(date: Date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Extract spreadsheet ID from either a raw ID or full Google Sheets URL.
 * e.g. https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0
 */
export function extractSpreadsheetId(input: string): string {
  const trimmed = input.trim();
  const urlMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }
  // Check if it's already an ID
  if (/^[a-zA-Z0-9-_]{20,}$/.test(trimmed)) {
    return trimmed;
  }
  return trimmed;
}

/**
 * Retrieve saved sheet connection config from localStorage
 */
export function getSavedSheetConfig(): ConnectedSheetConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Save sheet connection config to localStorage
 */
export function saveSheetConfig(config: ConnectedSheetConfig | null): void {
  if (!config) {
    localStorage.removeItem(STORAGE_KEY_CONFIG);
  } else {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  }
}

/**
 * Fetch spreadsheet metadata to get title and available tab names.
 */
export async function fetchSpreadsheetMetadata(spreadsheetId: string): Promise<{
  title: string;
  sheets: string[];
}> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Please sign in with Google to access your Google Sheets.');
  }

  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=properties.title,sheets.properties.title`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      errData?.error?.message || `Failed to fetch spreadsheet (${res.status}). Verify spreadsheet ID and permissions.`
    );
  }

  const data = await res.json();
  const title = data.properties?.title || 'Untitled Spreadsheet';
  const sheets: string[] = (data.sheets || []).map((s: any) => s.properties?.title || 'Sheet1');

  return { title, sheets };
}

/**
 * Fetch existing rows from a spreadsheet tab to determine the current row count / token count.
 */
export async function fetchSpreadsheetRows(
  spreadsheetId: string,
  sheetName: string,
  maxRows = 50
): Promise<{ headers: string[]; rows: string[][]; totalRowCount: number }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Please sign in with Google to view spreadsheet rows.');
  }

  const range = `${sheetName}!A1:L${maxRows}`;
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Failed to read sheet rows (${res.status}).`);
  }

  const data = await res.json();
  const allValues: string[][] = data.values || [];
  const headers = allValues.length > 0 ? allValues[0] : [];
  const rows = allValues.length > 1 ? allValues.slice(1) : [];

  return {
    headers,
    rows,
    totalRowCount: allValues.length,
  };
}

/**
 * Standard Header Columns matching the user's attached sheet template:
 * Submission ID, Respondent ID, Submitted at, Name, Age, Phone No , Token No, Check Box
 * + Selected Service, Preferred Date, Time Window, Reason for Visit
 */
export const CLINIC_SHEET_HEADERS = [
  'Submission ID',
  'Respondent ID',
  'Submitted at',
  'Name',
  'Age',
  'Phone No ',
  'Token No',
  'Check Box',
  'Selected Service',
  'Preferred Date',
  'Time Window',
  'Reason for Visit',
];

/**
 * Initialize a brand new Google Spreadsheet with the exact columns and formatting
 */
export async function createClinicSpreadsheet(
  customTitle = 'Nagpal Clinic & Ultrasound - Appointments'
): Promise<ConnectedSheetConfig> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Please sign in with Google to create a Google Sheet.');
  }

  const requestBody = {
    properties: {
      title: customTitle,
    },
    sheets: [
      {
        properties: {
          title: 'Appointments',
          gridProperties: {
            frozenRowCount: 1,
          },
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: CLINIC_SHEET_HEADERS.map((header) => ({
                  userEnteredValue: { stringValue: header },
                  userEnteredFormat: {
                    backgroundColor: { red: 0.05, green: 0.37, blue: 0.34 }, // #0D5E56 Teal
                    textFormat: {
                      foregroundColor: { red: 1, green: 1, blue: 1 },
                      bold: true,
                      fontSize: 10,
                    },
                    horizontalAlignment: 'CENTER',
                  },
                })),
              },
            ],
          },
        ],
      },
    ],
  };

  const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Failed to create new spreadsheet (${res.status}).`);
  }

  const data = await res.json();
  const spreadsheetId = data.spreadsheetId;
  const spreadsheetUrl = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  const config: ConnectedSheetConfig = {
    spreadsheetId,
    spreadsheetTitle: customTitle,
    sheetName: 'Appointments',
    spreadsheetUrl,
    lastSyncedAt: new Date().toISOString(),
    totalSyncedCount: 0,
  };

  saveSheetConfig(config);
  return config;
}

/**
 * Ensure header row exists in an existing sheet if it is empty.
 */
export async function ensureSheetHeaders(
  spreadsheetId: string,
  sheetName: string
): Promise<void> {
  const token = await getAccessToken();
  if (!token) return;

  try {
    const checkRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!A1:H1`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!checkRes.ok) return;
    const checkData = await checkRes.json();
    if (!checkData.values || checkData.values.length === 0 || !checkData.values[0][0]) {
      // Write headers to row 1
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!A1:L1?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            range: `${sheetName}!A1:L1`,
            values: [CLINIC_SHEET_HEADERS],
          }),
        }
      );
    }
  } catch (err) {
    console.warn('Could not verify/write headers automatically:', err);
  }
}

/**
 * Append an appointment row directly to the connected Google Sheet
 */
export async function appendAppointmentToSheet(
  record: SheetAppointmentRecord,
  customSpreadsheetId?: string,
  customSheetName?: string
): Promise<{ success: boolean; rowNumber?: number; message?: string }> {
  const config = getSavedSheetConfig();
  const spreadsheetId = customSpreadsheetId || config?.spreadsheetId;
  const sheetName = customSheetName || config?.sheetName || 'Sheet1';

  if (!spreadsheetId) {
    // Queue locally for later sync
    queueAppointmentLocally(record);
    return {
      success: false,
      message: 'No Google Sheet connected. Appointment saved locally to pending queue.',
    };
  }

  const token = await getAccessToken();
  if (!token) {
    // Queue locally for later sync
    queueAppointmentLocally(record);
    return {
      success: false,
      message: 'Google authorization required. Appointment queued for automatic sync upon login.',
    };
  }

  // Row format matching attached spreadsheet:
  // Submission ID, Respondent ID, Submitted at, Name, Age, Phone No , Token No, Check Box, Selected Service, Preferred Date, Time Window, Reason for Visit
  const rowValues = [
    record.submissionId,
    record.respondentId,
    record.submittedAt,
    record.name,
    record.age || '',
    record.phone,
    record.tokenNo,
    record.checkBox ? 'TRUE' : 'FALSE',
    record.selectedService,
    record.preferredDate,
    record.timeWindow,
    record.reasonForVisit || '',
  ];

  const range = `${sheetName}!A:L`;
  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    range
  )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowValues],
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    queueAppointmentLocally(record);
    throw new Error(
      errData?.error?.message || `Failed to append row to Google Sheet (${res.status}). Saved to queue.`
    );
  }

  const responseData = await res.json();
  const updatedRange = responseData.updates?.updatedRange || '';
  const rowMatch = updatedRange.match(/(\d+)$/);
  const rowNumber = rowMatch ? parseInt(rowMatch[1], 10) : undefined;

  // Update saved config statistics
  if (config) {
    config.lastSyncedAt = new Date().toISOString();
    config.totalSyncedCount = (config.totalSyncedCount || 0) + 1;
    saveSheetConfig(config);
  }

  return {
    success: true,
    rowNumber,
    message: `Appointment successfully recorded in row ${rowNumber || 'new'}.`,
  };
}

/**
 * Queue appointment locally when offline or unauthenticated
 */
export function queueAppointmentLocally(record: SheetAppointmentRecord): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUEUE);
    const list: SheetAppointmentRecord[] = raw ? JSON.parse(raw) : [];
    // Avoid duplicate queueing by submissionId
    if (!list.some((item) => item.submissionId === record.submissionId)) {
      list.push(record);
      localStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(list));
    }
  } catch (err) {
    console.error('Error saving to local appointment queue:', err);
  }
}

/**
 * Retrieve queued offline/pending appointments
 */
export function getQueuedAppointments(): SheetAppointmentRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUEUE);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Clear queued appointments from storage
 */
export function clearQueuedAppointments(): void {
  localStorage.removeItem(STORAGE_KEY_QUEUE);
}

/**
 * Sync all pending queued appointments to Google Sheet
 */
export async function syncQueuedAppointments(): Promise<{
  synced: number;
  failed: number;
}> {
  const queue = getQueuedAppointments();
  if (queue.length === 0) return { synced: 0, failed: 0 };

  const config = getSavedSheetConfig();
  if (!config) throw new Error('No Google Sheet configured.');

  let synced = 0;
  let failed = 0;
  const remaining: SheetAppointmentRecord[] = [];

  for (const record of queue) {
    try {
      await appendAppointmentToSheet(record);
      synced++;
    } catch {
      failed++;
      remaining.push(record);
    }
  }

  if (remaining.length > 0) {
    localStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(remaining));
  } else {
    clearQueuedAppointments();
  }

  return { synced, failed };
}
