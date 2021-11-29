import React, { CSSProperties, useState } from "react";
import { Radio, Button } from "rsuite";

import { Chapter } from '../../models/api/Chapters';
import { Question } from "../../models/api/Question";
import usePagination from "./Pagination";

type ChapterProps = {
    chapter: Chapter
    previousChapter: () => void
    nextChapter: () => void
}

export const QuestionPerChapter: React.FunctionComponent<ChapterProps> = ({chapter, nextChapter, previousChapter}) => {
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages
  } = usePagination({
    contentPerPage: 1,
    count: chapter.questions.length
  });

  return (
    <div>
      <div className="paginationEval">
        <button
          onClick={page === 1 ? previousChapter : prevPage}
          className={`pageEval ${page === 1 && "disabled"}`}
        >
          &larr;
        </button>
        {/* @ts-ignore */}
        {[...Array(totalPages).keys()].map(el => (
          <button
            onClick={() => setPage(el + 1)}
            key={el}
            className={`pageEval ${page === el + 1 ? "active" : ""}`}
          >
            {el + 1}
          </button>
        ))}
        <button
          onClick={page === totalPages ? nextChapter : nextPage}
          className={`pageEval ${page === totalPages && "disabled"}`}
        >
          &rarr;
        </button>
      </div>
      <div className="questions">
        {chapter.questions !== undefined ? (
          chapter.questions
            .slice(firstContentIndex, lastContentIndex)
            .map((question: Question, idx) => (
              <div key={idx}>
                {/* Display Questions 1 by 1   */}
                <h4>{question.text}</h4>
                {console.log("Question: ", question)}
                {question !== undefined ? (
                  question.answers.map((anwser, index) => (
                    <div key={index}>
                      <Radio> {anwser.text} </Radio>
                    </div>
                  ))
                ) : (
                  <> </>
                )}
                <div>
                  <Button onClick={() => {}}>Enregister</Button>
                </div>
              </div>
            ))
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};
