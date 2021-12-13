import React, { CSSProperties, useState, useEffect } from "react";
import { UserGlobalState } from "../core/user";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Container, Content, Panel, Header, Input, Button, Modal } from "rsuite";
import axios from "axios"

import { Result as ResultType } from '../models/api/Result'
import { Chapter } from '../models/api/Chapters';
import { Question } from '../models/api/Question';

const headerStyles: CSSProperties = {
    display: "flex",
    margin: "0 0 30px 0",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#1E303E",
    color: "#ffffff"
  }

  const bodyStyles: CSSProperties = {
  display: "flex",
  marginLeft: 30,
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#fff",
  justifyContent: "space-between",
  borderRadius: "4px 4px 4px 4px"
}

export interface evaluationResultType {
    chapter_id: number
    chapterName: string
    totalQuestions: number
    goodAnswers: number
    comment: string
    color: string
}

const defaultEvalResult: evaluationResultType[] = [
    // TODO: ADD chapter number (number ? ) to index list of chapter
    {
        chapter_id: null,
        chapterName: null,
        totalQuestions: null,
        goodAnswers: null,
        comment : null,
        color: null
    }
]


export const Result = () => {
    const history = useHistory();
    const host = process.env.REACT_APP_BASEURL
    const { eval_id } = useParams<{eval_id: string}>()
    const [loading, setLoading]: [
        boolean,
        (loading: boolean) => void
      ] = React.useState<boolean>(true);
    const [error, setError] = React.useState(false)
    const [result, setResult] = useState<ResultType>()
    const [evalResult, setEvalResult] = useState<evaluationResultType[]>(defaultEvalResult)
    
    const fetchEvaluation = () => {
        axios
        .get(`${host}/v1/evaluations/${eval_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            setResult(response.data)
            setLoading(false)
        }
        )
        .catch(err => {
            setError(err);
            setLoading(false);
        })
    } 

    useEffect(() => {
        fetchEvaluation()
    }, [])

    useEffect(() => {
        console.log('Result :', result)
        if (result !== undefined) {

            let tempEvalResult: evaluationResultType[] = []

            result.choices.forEach(element => {
                let index = tempEvalResult.findIndex(obj => obj.chapter_id === element.answer.question.chapter_id)
                if (index === -1) {
                    // new chapter evalResult
                    let goodAnswer: number = 0
                    if (element.answer.correct === true) {
                        goodAnswer = 1
                    }
                    tempEvalResult.push({chapter_id: element.answer.question.chapter_id, chapterName: element.answer.question.chapter.name , totalQuestions : 1, goodAnswers : goodAnswer, comment: null, color: null})

                } else {
                    // update chapter in evalResult
                    tempEvalResult[index].totalQuestions ++;
                    tempEvalResult[index].goodAnswers += element.answer.correct === true ? 1 : 0
                    
                }
            });
            tempEvalResult.forEach(elem => {
                let grades = elem.goodAnswers / elem.totalQuestions
               
                if (grades >= 0.8) {
                    elem.comment = "Maitrisé 🏆"
                    elem.color = "green"
                } else if (grades >= 0.65) {
                    elem.comment = "À consolider 💪"
                    elem.color = "#FFB800"
                } else {
                    elem.comment = "À revoir 📖"
                    elem.color = "#FF2E00"
                }
            })
            setEvalResult(tempEvalResult)
        }
    }, [result])

    useEffect(()=> {
        console.log("evalResult :", evalResult)

    }, [evalResult])

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
            }}/>
            </Header>
            <Content style={headerStyles}>
                <Panel>
                    <h1>Mathématique - 4ème</h1>
                </Panel>
            </Content>
            <Content style={bodyStyles}>
                <div>
                    <h2> Félicitations ! Vous avez terminé l'évaluation 🎉 </h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <div
                    style={{
                        listStyleType: "none",
                        marginTop: 20   
                    }}
                >
                    {evalResult.map( (result, idx) => (
                        <div 
                            key={idx}
                            style={{
                                padding: "15px",
                                marginBottom: 20,
                                border: "1px solid #E9E9E9",
                                borderRadius: "4px 4px 4px 4px",
                                fontSize: 18
                            }}
                        >
                            {result.chapterName} <p style={{
                                color: `${result.color}`
                            }}
                            > {result.comment} - {result.goodAnswers}/{result.totalQuestions}</p> 
                        </div>
                    ))}

                    <Button
                        appearance='primary'
                        onClick={() => history.push(`/evaluation`)}
                    > Refaire le Teste </Button>
                </div>
            </Content>
        </Container>
    )
}