import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";

interface Props {
  correctCount: number;
  totalCount: number;
  incorrectAnswers: {
    phrase: string;
    transcription?: string;
    translation: string;
  }[];
}

const Results: React.FC<Props> = ({
  correctCount,
  totalCount,
  incorrectAnswers,
}) => {
  useEffect(() => {
    // update document title with score
  }, [correctCount, totalCount]);

  return (
    <>
      <Typography variant="h4">
        You scored {correctCount} out of {totalCount}!
      </Typography>
      {incorrectAnswers.length > 0 && (
        <>
          <Typography variant="h6">Incorrect Answers:</Typography>
          <ul>
            {incorrectAnswers.map((answer) => (
              <li key={answer.phrase}>
                {answer.phrase} - {answer.transcription} - {answer.translation}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Results;
