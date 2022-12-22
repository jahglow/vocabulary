import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Test from "./Test";
// import Results from "./Results";
import { WordList } from "./WordList";
import { useVocabulary } from "./useVocabulary";
import { AppContext } from "./types";
import { makeRoute } from "./makeRoute";

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
          <Route path={makeRoute("/test")}>
            <Test />
          </Route>
          {/* <Route path={`${ROOT_ROUTE}/results`}>
            <Results correctCount={0} incorrectAnswers={[]} totalCount={0} />
          </Route> */}
          <Route path={makeRoute("/word-list")}>
            <WordList />
          </Route>
          <Route path={makeRoute("/")}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
