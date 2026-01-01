import fs from 'fs';
import path from 'path';

export interface Assistant {
  id: string;
  name: string;
  language: string;
  tone: string;
  responseLength: {
    short: number;
    medium: number;
    long: number;
  };
  audioEnabled: boolean;
  rules: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'assistants.json');

/* ===== Helpers internos ===== */

function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify([], null, 2)
    );
  }
}

function readData(): Assistant[] {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeData(data: Assistant[]) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

/* ===== API pública (EXPORTS) ===== */

export function getAllAssistants(): Assistant[] {
  return readData();
}

export function getAssistantById(id: string): Assistant | undefined {
  return readData().find(a => a.id === id);
}

export function createAssistant(
  data: Omit<Assistant, 'id'>
): Assistant {
  const assistants = readData();

  const assistant: Assistant = {
    id: Date.now().toString(),
    ...data,
  };

  assistants.push(assistant);
  writeData(assistants);

  return assistant;
}

export function updateAssistant(
  id: string,
  data: Partial<Assistant>
): Assistant | null {
  const assistants = readData();
  const index = assistants.findIndex(a => a.id === id);

  if (index === -1) return null;

  assistants[index] = { ...assistants[index], ...data };
  writeData(assistants);

  return assistants[index];
}

export function deleteAssistant(id: string): boolean {
  const assistants = readData();
  const filtered = assistants.filter(a => a.id !== id);

  if (filtered.length === assistants.length) return false;

  writeData(filtered);
  return true;
}
