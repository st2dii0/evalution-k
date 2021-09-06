import React, { useState, CSSProperties, useEffect } from 'react'
import { UserGlobalState } from '../core/user'
import { useHistory } from "react-router-dom"

import axios from 'axios'
import { Container, Content, Button, Icon, IconButton } from 'rsuite'


import Header from '../components/layout/Header'

import { Chapter } from '../models/api/Chapters'

require('dotenv').config()

const defaultChapter: Chapter[] = []

const chapterStyles: CSSProperties = {
    marginLeft: 30,
    marginTop: 60,
    marginBottom: 50
}

const chapterDisplayStyles: CSSProperties = {
    display: 'flex',
}

const deleteButtonStyles: CSSProperties = {
    backgroundColor: 'red',
    color: '#ffffff',
    marginLeft: 60,
    marginRight: 40
}

const headerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    columnGap: 200,
    marginBottom: 20,
}

const buttonStyles: CSSProperties = {
    // width: 147,
    // height: 30,
    backgroundColor: '#0D67F2',
    color: '#ffffff',
    // borderRadius: 4
}

export const Chapters = () => {
    const [{ user }] = UserGlobalState()
    const history = useHistory()
    const host = process.env.REACT_APP_BASEURL
    const [ chapters, setChapters ]: [Chapter[], (chapters: Chapter[]) => void] = useState(defaultChapter)
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true)
    const [error, setError]: [string, (error: string) => void] = useState("")

    const handleClick = (chapter: Chapter) => {
        history.push(
            {
                pathname: `/chapitres/chapitre/${chapter.id}`,
                state: chapter
            }
        )            
    }

    useEffect( () => {
        axios.get<Chapter[]>(`${host}/v1/chapters/`, {
            headers:{
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                setChapters(response.data)
                setLoading(false)
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }, [])

    const handleDeleteChapter = (id: number, chapters: Chapter[]) => {        
        axios.delete(`${host}/v1/chapters/${id}`)
            .then( response => {
                if(response.status == 204){
                    // setChapters reset global state => reload
                    setChapters(chapters.filter(chapter => chapter.id != id))
                } else {
                }
            }
        )
    }

    return (
        <Container
            style={chapterStyles}
        >
            {/* <Header /> */}
            <Content
                style={headerStyles}
            >
                <h1> Chapitre: Mathématique 4ème </h1>
                {/* TODO: create view add chapter refer to /chapter/new */}
                <Button 
                    onClick={()=> history.push('/chapitres/nouveau')}
                    style={buttonStyles}
                > + Ajouter un chapitre </Button>
            </Content>
            <Content>
                {chapters.map((chapter) => (
                    <div
                        key={chapter.id}
                    >
                        <div
                            style={chapterDisplayStyles}
                        >  
                            <span
                                onClick={ 
                                    () => handleClick(chapter)                 
                                }
                            > 
                            { chapter.number}. {chapter.name}  
                            </span>  
                            <IconButton style={deleteButtonStyles} onClick={()=>handleDeleteChapter(chapter.id, chapters)} icon={<Icon icon="trash2" />} />
                        </div> 
                        <br/>
                    </div>
                ))}
            </Content>

            {/* <AddChapter /> */}
        </Container>
    )
}