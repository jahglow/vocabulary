import React, { useState, useContext, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { AppContext } from "./types";
import { pronounce } from "./pronounce";
import { AppHeader } from "./AppHeader";

const useStyles = makeStyles({
  hidden: {
    visibility: "hidden",
  },
  word: {
    textDecoration: "underline",
    cursor: "pointer",
    padding: "2px 6px",
  },
});

export const WordList = () => {
  const {
    state: { selectedVocabularies },
  } = useContext(AppContext);
  const classes = useStyles();
  const [hidePhrase, setHidePhrase] = useState<boolean>(false);
  const [hideTranslation, setHideTranslation] = useState<boolean>(false);

  const toggleHidePhrase = useCallback(() => {
    setHidePhrase((hidePhrase) => !hidePhrase);
  }, []);

  const toggleHideTranslation = useCallback(() => {
    setHideTranslation((hideTranslation) => !hideTranslation);
  }, []);

  return (
    <>
      <AppHeader />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>
                Word
                <IconButton
                  onClick={toggleHidePhrase}
                  disabled={hideTranslation}
                >
                  {hidePhrase ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </TableCell>
              <TableCell>
                Translation
                <IconButton
                  onClick={toggleHideTranslation}
                  disabled={hidePhrase}
                >
                  {hideTranslation ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedVocabularies.map((vocab, index) => (
              <TableRow key={vocab.phrase}>
                <TableCell>{index + 1}.</TableCell>
                <TableCell hidden={hidePhrase}>
                  <div className={hidePhrase ? classes.hidden : ""}>
                    <span
                      className={classes.word}
                      onClick={() => pronounce(vocab.phrase)}
                    >
                      {vocab.phrase}
                    </span>
                    <br />
                    <code>{vocab.transcription}</code>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={hideTranslation ? classes.hidden : ""}>
                    {vocab.translation}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
