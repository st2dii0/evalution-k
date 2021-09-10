import React, { useState, CSSProperties, useEffect } from 'react'
import { UserGlobalState } from '../core/user'
import { useHistory, useParams, useLocation, Link } from "react-router-dom"
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
    "created_at": new Date(),
    "updated_at": new Date(),
    "questions": [
            {
                "id": null,
                "chapter_id": null,
                "text": "",
                "difficulty": null,
                "created_at": new Date(),
                "updated_at": new Date()
                  
            }
    ],
    "chapters": [
        {
            "id": null,
            "field_id": null,
            "level_id": null,
            "chapter_id": null,
            "name": "",
            "number": null,
            "created_at": new Date,
            "updated_at": new Date,
    }
    ]
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
    backgroundColor: '#0D67F2',
    color: '#ffffff',
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
    const { id } = useParams<{id: string}>()
    const host = process.env.REACT_APP_BASEURL
    const [ chapter, setChapter ] = useState<Chapter>(defaultChapter)   
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true)
    const [error, setError]: [string, (error: string) => void] = React.useState("")
    
    const handleClickNewSubChapter = (chapter: Chapter) => {
        history.push(
            {
                pathname: `/chapitres/${chapter.id}/nouveau`,
            }
        )         
    }

    useEffect(() => {
        axios.get(`${host}/v1/chapters/${id}`, {
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(response => {
                setChapter(response.data)
                setLoading(false)                
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }, [])

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
                                <p> <b> Nom : </b> { chapter.name} </p>
                                //TODO: Change date format to dd/mm/yyyy
                                <p> <b> Mise à jour : </b>  {chapter.updated_at.toString()}  </p>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                    columnGap: 235
                                }}
                            >
                                <p> <b> Numèro : </b>   {chapter.number} </p>
                                <p> <b> Chapitre parent : </b>  {chapter.chapter_id} </p>
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

                <div>
                    {
                        chapter.questions !== undefined ?  
                        chapter.questions.map((question, idx) => (
                        <div key={idx}>
                            <span onClick={() => console.log(`Chapter id: ${question.text}`)}> 
                                {question.text} 
                            </span>
                            <IconButton style={deleteButtonStyles}  icon={<Icon icon="trash2" />} />
                        </div>))
                        : <></>
                    }
                </div>

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
                        onClick={() => handleClickNewSubChapter(chapter)}
                        style={buttonStyles} 
                    > + Ajouter un chapitre </Button>
                </div>
                
                <Content>
                    {
                        chapter.chapters !== undefined ?
                        chapter.chapters.map((chapter, idx) => (
                        <div
                            key={idx}
                        >
                            <div>
                                <span 
                                    onClick={() => {
                                        history.push(`/chapitres/${chapter.id}`)
                                        setChapter({...chapter, id: chapter.id})
                                    }}>
                                    { chapter.number != null ? `${chapter.number}. ` :  ''} {chapter.name}
                                </span>
                                <IconButton style={deleteButtonStyles}  icon={<Icon icon="trash2" />} />
                            </div>
                        </div>
                    ))
                    : <></>
                }
                </Content>  

            </Content>

        </Container>
    
    )
}
export default ChapterDetails
