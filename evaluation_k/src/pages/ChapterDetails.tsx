import React, { useState, CSSProperties, useEffect } from 'react'
import { UserGlobalState } from '../core/user'
import { useHistory } from "react-router-dom"

import axios from 'axios'
import Header from '../components/layout/Header'
import { Container, Content, Button, Icon, IconButton } from 'rsuite'

import { Chapter } from '../models/api/Chapters'

require('dotenv').config()

const defaultChapter: Chapter = {
    "id": null,
    "field_id": null,
    "level_id": null,
    "chapter_id": null,
    "name": "",
    "number": null,
    "created_at": new Date,
    "updated_at": new Date,
    "questions": [
            {
                    "id": null,
                    "chapter_id": null,
                    "text": "",
                    "difficulty": null,
                    "created_at": new Date,
                    "updated_at": new Date
                  
            }
    ],
    "chapters": []
}

const chapterStyles: CSSProperties = {
    marginLeft: 30,
    marginTop: 60,
    marginBottom: 50
}

const chapterDisplayStyles: CSSProperties = {
    display: 'flex',
}

const buttonStyles: CSSProperties = {
    width: 60,
    height: 40
}

const headerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    columnGap: 10
}

export const ChapterDetails = () => {
    const [{ user }] = UserGlobalState()
    const history = useHistory()
    const host = process.env.REACT_APP_BASEURL

    const [ chapters, setChapter ] = useState({
        "id": null,
        "field_id": null,
        "level_id": null,
        "chapter_id": null,
        "name": "",
        "number": null,
        "created_at": new Date,
        "updated_at": new Date,
        "questions": [
                {
                        "id": null,
                        "chapter_id": null,
                        "text": "",
                        "difficulty": null,
                        "created_at": new Date,
                        "updated_at": new Date
                      
                }
        ],
        "chapters": []
    })
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true)
    const [error, setError]: [string, (error: string) => void] = React.useState("")

    const idChapter = 1

    useEffect(() => {
        axios.get(`${host}/v1/chapters/${idChapter}`, {
            headers:{
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                setChapter(response.data)
                console.log(response)
                setLoading(false)
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }, [chapters])

    return (
        <Container>
            <Content
                style={headerStyles}
            >
                <IconButton 
                    style={buttonStyles} 
                    onClick={() => history.push("/chapitres")} 
                    icon={<Icon icon='back-arrow' />}
                />
                <span> CHAPITRE MATHEMATIQUES 3ème </span>
            </Content>
            <Content>
                <h2> Description </h2> <Button> Modifier </Button>
                <span>Nom {chapters.name} </span>
                {/* <span>Mise à jour {chapters.updated_at} </span> */}
                <span> Numèro  {chapters.number} </span>
                <span> Chapitre parent </span>

                <div>
                    <h2>
                        Questions
                    </h2>
                    <button 
                    > + Ajouter une question </button>
                    {chapters.questions.map((question) => (
                        <div
                            key={question.id}
                        >
                            <span
                                onClick={() => console.log(`Chapter id: ${question.text}`)
                                }
                            > 
                                {question.text} 
                            </span>  
                            <button >supp</button>
                        </div>
                    ))}
                </div>

                <div>
                    
                    <h2> Sous-chapitre </h2>
                    <button 
                    > + Ajouter un chapitre </button>
                    {chapters.chapters.map((sChapter) => (
                        <div
                            key={sChapter}
                        >
                            <span></span>
                        </div>
                    ))}
                </div>
            </Content>

        </Container>
    )
}
