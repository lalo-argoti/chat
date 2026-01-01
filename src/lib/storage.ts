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

const STORAGE_KEY = 'assistants';

/* =========================
   CONTEXTO CLIENTE (BROWSER)
   ========================= */

function getFromLocalStorage(): Assistant[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveToLocalStorage(data: Assistant[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* =========================
   CONTEXTO SERVIDOR (API)
   ========================= */

let serverAssistants: Assistant[] = [];

/* =========================
   API UNIFICADA
   ========================= */

export function getAllAssistants(): Assistant[] {
  if (typeof window === 'undefined') {
    return serverAssistants;
  }
  return getFromLocalStorage();
}

export function getAssistantById(id: string): Assistant | undefined {
  return getAllAssistants().find(a => a.id === id);
}

export function createAssistant(
  data: Omit<Assistant, 'id'>
): Assistant {
  const assistant: Assistant = {
    id: Date.now().toString(),
    ...data,
  };

  if (typeof window === 'undefined') {
    serverAssistants.push(assistant);
  } else {
    const current = getFromLocalStorage();
    current.push(assistant);
    saveToLocalStorage(current);
  }

  return assistant;
}

export function updateAssistant(
  id: string,
  data: Partial<Assistant>
): Assistant | null {
  const assistants = getAllAssistants();
  const index = assistants.findIndex(a => a.id === id);

  if (index === -1) return null;

  assistants[index] = { ...assistants[index], ...data };

  if (typeof window === 'undefined') {
    serverAssistants = assistants;
  } else {
    saveToLocalStorage(assistants);
  }

  return assistants[index];
}

export function deleteAssistant(id: string): void {
  const filtered = getAllAssistants().filter(a => a.id !== id);

  if (typeof window === 'undefined') {
    serverAssistants = filtered;
  } else {
    saveToLocalStorage(filtered);
  }
}
