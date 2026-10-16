export type SavedChecklist = {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  scenarioTitleTe: string;
  steps: { id: string; text: string; textTe: string; explain: string; explainTe: string; urgent: boolean; completed: boolean }[];
  savedAt: string;
};

const STORAGE_KEY = 'suraksha-saved-checklists';

export function getSavedChecklists(): SavedChecklist[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveChecklist(checklist: SavedChecklist): void {
  const existing = getSavedChecklists();
  const filtered = existing.filter((item) => item.id !== checklist.id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([checklist, ...filtered]));
}

export function deleteSavedChecklist(id: string): void {
  const existing = getSavedChecklists();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.filter((item) => item.id !== id)));
}

export function updateSavedChecklist(id: string, steps: SavedChecklist['steps']): void {
  const existing = getSavedChecklists();
  const item = existing.find((c) => c.id === id);
  if (item) {
    item.steps = steps;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }
}
