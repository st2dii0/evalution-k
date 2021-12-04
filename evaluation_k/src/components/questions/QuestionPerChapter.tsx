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
    <div
      style={{
        marginLeft: "16.6%",
        width: "66.6%"
      }}
    >
      <div 
        className="paginationEval"
        style={
          {
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }
        }
      >
        <button
          onClick={page === 1 ? previousChapter : prevPage}
          className={`pageEval ${page === 1 && "disabled"}`}
          style={{
            margin: 1, 
            border: "1px solid #E9E9E9",
            borderRadius: "4px 4px 4px 4px",
            fontSize: 16,
            color: "#000000"
          }}
        >
          &larr;
        </button>
        {/* @ts-ignore */}
        {[...Array(totalPages).keys()].map(el => (
          <button
            onClick={() => setPage(el + 1)}
            key={el}
            className={`pageEval ${page === el + 1 ? "active" : ""}`}
            style={{
              width: `${100 / totalPages}%`, 
              margin: 1,
              border: "1px solid #E9E9E9",
              borderRadius: "4px 4px 4px 4px",
              fontSize: 14, 
              backgroundColor: `${localChoices.find(obj => obj.question_id === chapter.questions[el].id) !== undefined ? "#28a745" : "#ffc107"}`
            }}
          >
            {el + 1}
          </button>
        ))}
        <button
          onClick={page === totalPages ? nextChapter : nextPage}
          className={`pageEval ${page === totalPages && "disabled"}`}
          style={{
            margin: 1, 
            border: "1px solid #E9E9E9",
            borderRadius: "4px 4px 4px 4px",
            fontSize: 16,
            color: "#000000"
          }}
        >
          &rarr;
        </button>
      </div>
      <div className="questions">
        {chapter.questions !== undefined ? (
          chapter.questions
            .slice(firstContentIndex, lastContentIndex)
            .map((question: Question, idx) => (
              <div 
                key={idx}
                style={{
                  listStyleType: "none",
                 
                }}
              >
                {/* Display Questions 1 by 1 */}
                <h4
                  style={{
                    display: "flex",
                    margin: "40px 0",
                    fontSize: "24px",
                    color: "#2D3339",
                    justifyContent: "center",
                  }}
                >{question.text}</h4>
                  {question !== undefined ? (
                    question.answers.map((answer) => (
                      <Radio
                        style={{
                          padding: "15px",
                          marginBottom: 20,
                          border: "1px solid #E9E9E9",
                          borderRadius: "4px 4px 4px 4px",
                          fontSize: 18
                        }}
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
                <div style={{
                  display: 'flex',
                  width: "100%",
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: 'stretch',
                }}>
                  <Button
                    style={{
                      color: '#FFFFFF',
                      backgroundColor: '#007bff',
                      justifyContent: "end",
                      position: "relative",
                      display: "inline-block",
                      width: "100%",
                      fontSize: 18,
                      marginBottom: 30
                    }}
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
