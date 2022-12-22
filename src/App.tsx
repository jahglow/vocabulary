import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Test from "./Test";
import Results from "./Results";
import { WordList } from "./WordList";
import { useVocabulary } from "./useVocabulary";
import { AppContext } from "./types";

const App = () => {
  const {
    modules,
    selectedModules,
    vocabularies,
    getVocabularies,
    currentVocab,
    translations,
    checkAnswer,
    getNextVocab,
    handleModuleToggle,
    selectedVocabularies,
  } = useVocabulary();

  return (
    <AppContext.Provider
      value={{
        state: {
          modules,
          selectedModules,
          vocabularies,
          getVocabularies,
          currentVocab,
          translations,
          checkAnswer,
          getNextVocab,
          handleModuleToggle,
          selectedVocabularies,
        },
      }}
    >
      <Router>
        <Switch>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/results">
            <Results correctCount={0} incorrectAnswers={[]} totalCount={0} />
          </Route>
          <Route path="/word-list">
            <WordList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
