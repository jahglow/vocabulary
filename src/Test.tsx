import React, { useContext, useState } from "react";
import { Grid, Typography, Button, Paper, makeStyles } from "@material-ui/core";
import { CheckCircle, Cancel } from "@material-ui/icons";
import { AppContext, ModuleVocabulary } from "./types";
import { pronounce } from "./pronounce";
import { AppHeader } from "./AppHeader";

const Test = () => {
  const classes = useStyles();
  const { state } = useContext(AppContext);
  const { currentVocab, translations, checkAnswer, getNextVocab } = state;
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);

  const handleClick = (vocab: ModuleVocabulary) => {
    if (checkAnswer(vocab)) {
      setResult("correct");
    } else {
      setResult("incorrect");
    }
  };

  return (
    <>
      <AppHeader />
      <div className={classes.root}>
        <Paper>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" align="center">
                <span
                  className={classes.word}
                  onClick={() => pronounce(currentVocab?.phrase)}
                >
                  {currentVocab?.phrase}
                </span>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                {currentVocab?.transcription}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {result !== null && (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => {
              setResult(null);
              getNextVocab();
            }}
          >
            Next
          </Button>
        )}
        <div className={classes.buttons}>
          {translations.map((vocab) => (
            <Button
              className={classes.button}
              variant="outlined"
              key={vocab.phrase}
              onClick={() => handleClick(vocab)}
              disabled={result !== null}
            >
              {result === "correct" && vocab.phrase === currentVocab?.phrase ? (
                <CheckCircle />
              ) : result === "incorrect" &&
                vocab.phrase !== currentVocab?.phrase ? (
                <Cancel />
              ) : null}
              {vocab.translation}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Test;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
    gap: 16,
  },
  word: {
    textDecoration: "underline",
    cursor: "pointer",
    padding: "2px 6px",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  button: {
    textTransform: "none",
  },
}));
