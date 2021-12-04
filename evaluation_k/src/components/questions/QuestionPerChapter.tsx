import React, { CSSProperties, useState } from "react";
import { Button, RadioGroup, Radio } from "rsuite";

import { Chapter } from '../../models/api/Chapters';
import { Question, Answers_Attributes } from "../../models/api/Question";
import usePagination from "./Pagination";
import { localChoices } from '../../pages/Evaluation'

type ChapterProps = {
    chapter: Chapter
    saveAnswer: (question_id: number, answer_id: number) => void
    previousChapter: () => void
    nextChapter: () => void
    localChoices: localChoices[]
}

export const QuestionPerChapter: React.FunctionComponent<ChapterProps> = ({chapter, nextChapter, previousChapter, saveAnswer, localChoices}) => {

    const displayChoiceRadio = (question_id: number, answer_id: number): boolean => {
      // console.log('answer_id: ', answer_id)
      let index = localChoices.findIndex(obj => obj.question_id === question_id)
      if (index === -1 ) {        
        return false
      } else {
        if (localChoices[index].answer_id === answer_id) {
          return true
        } 
      }
      return false
    }

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
            // {... console.log('Active page',page)}
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
                {/* Display Questions 1 by 1 */}
                <h4>{question.text}</h4>
                {/* {console.log("Question: ", question)} */}
                  {question !== undefined ? (
                    question.answers.map((answer) => (
                      <Radio
                        key={answer.id}
                        value={`value-${answer.id}`}
                        onChange={() => saveAnswer(question.id , answer.id)}
                        checked={displayChoiceRadio(question.id , answer.id)? (
                          true
                          ) : false }
                      > {answer.text} </Radio>
                    ))
                    ) : (
                      <> </>
                      )}
                <div>
                  <Button 
                    onClick={page === totalPages ? nextChapter : nextPage}
                    className={`pageEval ${page === totalPages && "disabled"}`}
                  >Enregister</Button>
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
