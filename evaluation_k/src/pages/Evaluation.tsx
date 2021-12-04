import React, { CSSProperties, useState, useEffect } from "react";
import { UserGlobalState } from "../core/user";
import { useHistory } from "react-router-dom";
import { Container, Content, Panel, Header, Input, Button, Modal } from "rsuite";
import axios from "axios";

import { Evaluation as typeEvaluation } from "../models/api/Evaluation"
import { Chapter } from "../models/api/Chapters";
import usePagination from "../components/questions/Pagination";
import { QuestionPerChapter } from "../components/questions/QuestionPerChapter";

const headerStyles: CSSProperties = {
  display: "flex",
  margin: "0 0 30px 0",
  textAlign: "center",
  alignContent: "center",
  justifyContent: "center",
  backgroundColor: "#1E303E",
  color: "#ffffff"
};
const bodyStyles: CSSProperties = {
  display: "flex",
  marginLeft: 30,
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#fff",
  justifyContent: "space-between",
  borderRadius: "4px 4px 4px 4px"
};

export interface localChoices {
  answer_id: number;
  question_id: number;
}

type choices = [ 
  { answer_id: number}
]

export interface localChoicesQuiz {
    question_id: number
    answer_id: number
    selected: boolean
}

const defaultChapter: Chapter[] = [];

const evaluationDefault: typeEvaluation = {
    student_name: null,
    school_id: null,
    user_id: null,
    choices_attributes: [
        {
            answer_id: null
        }
    ]
}

const choicesDefaults: localChoices[] = [
  {
    answer_id: null,
    question_id: null
  }
];


export const Evaluation = () => {
  // const [{ user }] = UserGlobalState()
  const history = useHistory();
  const host = process.env.REACT_APP_BASEURL
  const [chapters, setChapters]: [
    Chapter[],
    (chapters: Chapter[]) => void
  ] = useState(defaultChapter)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [studentName, setStudentName] = useState("")
  const [countChapters, setCountChapters] = useState(0)
  const [choiceAttributes, setChoiceAttributes] = useState()
  const [localChoices, setLocalChoices] = useState<localChoices[]>(choicesDefaults)
  const [evaluation, setEvaluation] = useState<typeEvaluation>(evaluationDefault)
  const [openModal, setOpenModal] = useState(true);

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
    count: chapters.length
  })

  const fetchChapter = () => {
    axios
      .get(`${host}/v1/chapters`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        setChapters(response.data)
        setCountChapters(response.data.length)
        // console.log("chapters: ", chapters)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(true)
      })
  }

  const saveAnswer = (question_id: number, answer_id: number) => {
    let index = localChoices.findIndex(obj => obj.question_id === question_id)
    if (index === -1 ) {
      // add
      setLocalChoices([...localChoices, { question_id: question_id, answer_id: answer_id }])
    } else {
      // update
      let newAnswers: localChoices = localChoices[index]
      newAnswers.answer_id = answer_id
      setLocalChoices([
          ...localChoices.slice(0, index),
          newAnswers,
          ...localChoices.slice(index + 1)
      ])
    }
  }

  const hanldeSubmit = async () => {
    // set localChoices to evaluation {} then post

    let choicesAttributes: choices = [{answer_id: null}]
    await localChoices.forEach(element => {
      if (element.answer_id !== null) {
        choicesAttributes.push({answer_id: element.answer_id});
      }
    })
    choicesAttributes.shift()

    setEvaluation({...evaluation, 
      student_name: studentName,
      school_id: 123456,
      user_id: 789,
      choices_attributes: choicesAttributes
    })
    setLoading(false)

    console.log("choices_attributes", choicesAttributes)
  }

  const nextChapter = () => {
    if (page !== totalPages) {
      nextPage()
    } else {
      hanldeSubmit()
    }
  }

  const handleClose = () => {
    if (studentName !== null) {
      setOpenModal(false);
      console.log("student Name:", studentName);
    }
  }

  useEffect(() => {
    fetchChapter()
    console.log("default localChoices: ", localChoices)
    console.log("Evaluation :", evaluation);
  }, [loading])

  useEffect(() => {
    // console.log("default localChoices: ", localChoices)
  }, [localChoices])

  useEffect(() => {
    console.log("Evaluation :", evaluation);
    // call api
    if (evaluation.student_name !== null) {
      console.log("data to send: ", evaluation)
      axios
        .post(`${host}/v1/field/1/level/1/evaluations/new`, {
          evaluation
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          setError(true)
          console.log(err);
        })
    }
  }, [evaluation])

  return (
    <Container>
      <Header>
        <img
          src={require("../assets/mymentor.jpeg").default}
          alt="mymentor"
          style={{
            maxWidth: 200,
            width: 150,
            marginLeft: 10
          }}
        />
      </Header>
      <Content style={headerStyles}>
        <Panel>
          <h1>Mathématique - 4ème</h1>
        </Panel>
      </Content>
      <Content style={bodyStyles}>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>Error fetching data</h2>
        ) : (
          <>
            <div 
              className="pagination"
              style={{
                display: "flex",
                flexDirection: "row"
              }}
            >
              <button
                onClick={prevPage}
                className={`page ${page === 1 && "disabled"}`}
                style={{
                  margin: 1,
                  border: "1px solid #E9E9E9",
                  borderRadius: "4px 4px 4px 4px",
                  fontSize: 14
                }}
              >
                &larr;
              </button>
              {/* @ts-ignore */}
              {[...Array(totalPages).keys()].map(el => (
                <button
                  onClick={() => setPage(el + 1)}
                  key={el}
                  className={`page ${page === el + 1 ? "active" : ""}`}
                  style={{
                    margin: 1,
                    border: "1px solid #E9E9E9",
                    borderRadius: "4px 4px 4px 4px",
                    fontSize: 14
                  }}
                >
                  {el + 1}
                </button>
              ))}
              <button
                onClick={nextChapter}
                className={`page ${page === totalPages && "disabled"}`}
                style={{
                  margin: 1,
                  border: "1px solid #E9E9E9",
                  borderRadius: "4px 4px 4px 4px",
                  fontSize: 14
                }}
              >
                &rarr;
              </button>
            </div>
            
            <div className="items" style={{width: "100%"}}>
              {chapters
                .slice(firstContentIndex, lastContentIndex)
                .map((chapter: Chapter) => (
                  <div key={chapter.id}>
                    <div>
                      <h3
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          fontSize: "26px",
                          color: "#2D3339",
                          cursor: "default",
                        }}
                      >{chapter.name}</h3>
                      <QuestionPerChapter
                        chapter={chapter}
                        previousChapter={prevPage}
                        nextChapter={nextChapter}
                        saveAnswer={saveAnswer}
                        localChoices={localChoices}
                      />
                    </div>
                  </div>
                ))}
            </div>

          </>
        )}
        <div className="modal-container">
              <Modal 
                // show={openModal}
                show={false}
                backdrop="static" 
                onClose={handleClose} 
                keyboard={false}
                style={{
                  fontSize: "20px",
                  color: "#2D3339",
                  marginTop: 15
                }}
              >
              <Modal.Header>
                  <Modal.Title
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "#2D3339",

                    }}
                  > Nouvelle évaluation </Modal.Title> 
                </Modal.Header>
                <Modal.Body>
                  <p> Comment t'appelles-tu ? </p>
                  <Input 
                    placeholder="Nom Prénom"
                    type="string"
                    onChange={(value) => setStudentName(value)}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClose} appearance="primary"> Valider </Button>
                </Modal.Footer>
              </Modal>
            </div>
      </Content>
    </Container>
  )
}
