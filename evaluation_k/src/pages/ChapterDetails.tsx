import React, { useState, CSSProperties, useEffect } from 'react'
import { UserGlobalState } from '../core/user'
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom"
import axios from 'axios'
import Header from '../components/layout/Header'
import { Container, Content, Button, Icon, IconButton, Form } from 'rsuite'

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
    // width: 147,
    // height: 30,
    backgroundColor: '#0D67F2',
    color: '#ffffff',
    // borderRadius: 4
}

const deleteButtonStyles: CSSProperties = {
    backgroundColor: 'red',
    color: '#ffffff',
    marginLeft: 50
}

const buttonBodyStyles: CSSProperties = {
    width: 147,
    height: 30,
    backgroundColor: '#0D67F2',
    color: '#ffffff',
    borderRadius: 4
}

const headerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 30,
    columnGap: 10
}

export const ChapterDetails = () => {
    
    const [{ user }] = UserGlobalState()
    const history = useHistory()
    const location = useLocation()
    const host = process.env.REACT_APP_BASEURL

    const [ chapter, setChapter ] = useState({})
    
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true)
    const [error, setError]: [string, (error: string) => void] = React.useState("")
    
    const handleClick = (chapter: Chapter) => {
        history.push(
            {
                pathname: `/chapitres/nouveau`,
                state: chapter
            }
        )         
    }

    useEffect(() => {
        axios.get(`${host}/v1/chapters/${location.state.id}`, {
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
    }, [])

    const RenderQuestions = () => {
        if (chapter.questions != undefined){
            return (
                <div>
                    {
                        chapter.questions.map((question) => (
                        <div key={question.id}>
                            <span onClick={() => console.log(`Chapter id: ${question.text}`)}> 
                                {question.text} 
                            </span>  
                            <IconButton style={deleteButtonStyles}  icon={<Icon icon="trash2" />} />
                        </div>))
                    }
                </div>
            )
        }else{
            return ''
        }
    }

    const RenderChapters = () => {
        if (chapter.chapters != undefined){
            return (
                <div>
                    {chapter.chapters.map((sChapter) => (
                        <div
                            key={sChapter}
                        >
                        </div>
                    ))}
                </div> 
            )
        }else{
            return ''
        }
    }

    return (
        <Container>
            <Content
                style={headerStyles}
            >
                <IconButton
                    onClick={() => history.push("/chapitres")} 
                    icon={<Icon icon='back-arrow' />}
                />
                <h5> CHAPITRE MATHEMATIQUES 3ème </h5>
                
            </Content>
            <Content
                style={{
                    marginLeft: 60
                }}
            >
                <div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            columnGap: 200
                        }}
                    >
                        <h2> Description </h2> 
                        <Button> Modifier </Button>
                    </div>
                    <hr style={{marginRight: 200 }}/>
                    
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            columnGap: 200
                        }}
                    >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    columnGap: 200
                                }}
                            >
                                <p>Nom {chapter.name} </p>
                                <p> Mise à jour  </p>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    columnGap: 200
                                }}
                            >
                                <p> Numèro  {chapter.number} </p>
                                <p> Chapitre parent </p>
                            </div>                         
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignContent: 'center',
                        columnGap: 200,
                    }}
                >
                    <h2>
                        Questions
                    </h2>
                    <Button
                        style={buttonStyles} 
                    > + Ajouter une question </Button>
                </div>

                <RenderQuestions />
                
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignContent: 'center',
                        columnGap: 200,
                        marginBottom: 40
                    }}
                >
                    
                    <h2> Sous-chapitre </h2>
                    <Button
                        onClick={() => handleClick()}
                        style={buttonStyles} 
                    > + Ajouter un chapitre </Button>
                </div>
                <RenderChapters /> 

            </Content>

        </Container>
    )
}
export default ChapterDetails
