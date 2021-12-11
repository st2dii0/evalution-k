import React, { CSSProperties, useState, useEffect } from "react";
import { UserGlobalState } from "../core/user";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Container, Content, Panel, Header, Input, Button, Modal } from "rsuite";
import axios from "axios"

import { Result as ResultType } from '../models/api/Result'
import { Chapter } from '../models/api/Chapters';
import { Question } from '../models/api/Question';
import { check } from "prettier";

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
    
}

const defaultEvalResult: evaluationResultType[] = [
    {
        chapter_id: null,
        chapterName: null,
        totalQuestions: null,
        goodAnswers: null,
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

            result.choices.forEach(element => {
                let index = evalResult.findIndex(obj => obj.chapter_id === element.answer.question.chapter_id)
                if (index === -1) {
                    // on crée un chapitre dans evalResult
                    let goodAnswer: number = 0;
                    if (element.answer.correct == true) {
                        goodAnswer = 1
                    }
                    setEvalResult([... evalResult, { chapter_id: element.answer.question.chapter_id, chapterName: element.answer.question.chapter.name , totalQuestions : 1, goodAnswers : goodAnswer}])
                } else {
                    // on update le chapitre dans evalResult
                
                    let tempChapter = evalResult[index];
                    tempChapter.totalQuestions ++;
                    element.answer.correct == true ? tempChapter.goodAnswers += 1 : tempChapter.goodAnswers
    
                    setEvalResult([
                        ...evalResult.slice(0, index),
                        tempChapter,
                        ...evalResult.slice(index + 1)
                    ])
                }
            });
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
                {evalResult.map( (res, idx) => (
                    <div key={idx}>
                        
                    </div>
                ))}
            </Content>
        </Container>
    )
}