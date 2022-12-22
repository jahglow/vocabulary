import { useState, useEffect, useCallback } from "react";
import { JsonData, UseVocabulary, ModuleVocabulary } from "./types";
import data from "./modules.json";

console.log(data);

export const useVocabulary = (): UseVocabulary => {
  const [modules, setModules] = useState<{ id: string; name: string }[]>(() =>
    (data as never as JsonData[]).map(({ id, name }) => ({
      id,
      name,
    }))
  );

  const [vocabularies, setVocabularies] = useState<ModuleVocabulary[]>(() =>
    (data as never as JsonData[]).flatMap(({ vocabulary, id }) =>
      vocabulary.map((vocab, index) => ({
        ...vocab,
        moduleId: id,
        index,
      }))
    )
  );

  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const getNextVocabulary = useCallback(
    (selectedVocabularies: ModuleVocabulary[]) => {
      const randomIndex = random(selectedVocabularies.length);
      const vocab = selectedVocabularies[randomIndex];
      setCurrentVocab(vocab);
      setTranslations(getRandomTranslations(selectedVocabularies, randomIndex));
    },
    []
  );

  const getVocabularies = useCallback(
    (moduleIds: string[]) => {
      const selectedVocabularies = vocabularies.filter(({ moduleId }) =>
        moduleIds.includes(moduleId)
      );
      setSelectedModules(moduleIds);
      setSelectedVocabularies(selectedVocabularies);
      getNextVocabulary(selectedVocabularies);
    },
    [getNextVocabulary, vocabularies]
  );

  const handleModuleToggle = useCallback(
    (moduleId: string) => () => {
      setSelectedModules((selectedModules) => {
        const newSelectedModules = selectedModules.includes(moduleId)
          ? selectedModules.filter((id) => id !== moduleId)
          : [...selectedModules, moduleId];
        getVocabularies(newSelectedModules);
        return newSelectedModules;
      });
    },
    [getVocabularies]
  );

  const [selectedVocabularies, setSelectedVocabularies] = useState<
    ModuleVocabulary[]
  >([]);

  const [currentVocab, setCurrentVocab] = useState<ModuleVocabulary | null>(
    null
  );

  const [translations, setTranslations] = useState<ModuleVocabulary[]>([]);

  const getNextVocab = useCallback(() => {
    getNextVocabulary(selectedVocabularies);
  }, [getNextVocabulary, selectedVocabularies]);

  const checkAnswer = useCallback(
    (vocab: ModuleVocabulary) => !!currentVocab && currentVocab === vocab,
    [currentVocab]
  );

  return {
    modules,
    vocabularies,
    getVocabularies,
    currentVocab,
    translations,
    checkAnswer,
    getNextVocab,
    handleModuleToggle,
    selectedModules,
    selectedVocabularies,
  };
};

const getRandomTranslations = (
  vocabularies: ModuleVocabulary[],
  index: number
): ModuleVocabulary[] =>
  getRandomNumbers(index, vocabularies.length).map((i) => vocabularies[i]);

const random = (max: number) => Math.floor(Math.random() * max);

const getRandomNumbers = (initialIndex: number, maxNumber: number) => {
  const numbers = new Set<number>();
  const max = maxNumber < 4 ? maxNumber : 4;
  const randomPos = random(max);
  let size = 0;
  while (size < max) {
    if (randomPos === size) {
      numbers.add(initialIndex);
    } else {
      numbers.add(random(maxNumber));
    }
    size++;
  }

  return [...numbers];
};
