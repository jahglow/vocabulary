import { createContext } from "react";

export interface JsonData {
  // moduleId
  id: string;
  // moduleName
  name: string;
  vocabulary: Vocabulary[];
}

export interface UseVocabulary {
  modules: { id: string; name: string }[];
  vocabularies: ModuleVocabulary[];
  getVocabularies: (moduleIds: string[]) => void;
  currentVocab: ModuleVocabulary | null;
  translations: ModuleVocabulary[];
  checkAnswer: (vocab: ModuleVocabulary) => boolean;
  getNextVocab: () => void;
  handleModuleToggle: (moduleId: string) => () => void;
  selectedModules: string[];
  selectedVocabularies: ModuleVocabulary[];
}

export type State = UseVocabulary;

export interface Vocabulary {
  phrase: string;
  transcription?: string;
  translation: string;
}

export interface ModuleVocabulary extends Vocabulary {
  moduleId: string;
  index: number;
}

export interface AppContextValue {
  state: State;
}

export const AppContext = createContext<AppContextValue>({} as AppContextValue);
