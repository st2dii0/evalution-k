import React, { useState, CSSProperties, useEffect } from 'react'
import { UserGlobalState } from '../core/user'
import { useHistory } from "react-router-dom"

import axios from 'axios'

import Header from '../components/layout/Header'
import AddChapter from '../components/chapters/AddChapter'

import { Chapter } from '../models/api/Chapters'

require('dotenv').config()

const defaultChapter: Chapter[] = []

const chapterStyles: CSSProperties = {
    marginLeft: 30,
    marginTop: 60,
    marginBottom: 50
}
const headerStyles: CSSProperties = {
    marginBottom: 20,

}

export const Chapters = () => {
    const [{ user }] = UserGlobalState()
    const history = useHistory()
    const host = process.env.REACT_APP_BASEURL
    console.log(host);
    
    
    const [ chapters, setChapter ]: [Chapter[], (chapters: Chapter[]) => void] = useState(defaultChapter)
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true)
    const [error, setError]: [string, (error: string) => void] = React.useState("")

    let handleDeleteChapter = (id: number) => {        
        axios.delete(`${host}/v1/chapters/${id}`)
        let newChapters = [...chapters]
        setChapter(newChapters)
    }

    useEffect(()=>{
        axios.get<Chapter[]>(`${host}/v1/chapters/`, {
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
    return (
        <div
            style={chapterStyles}
        >
            {/* <Header /> */}
            <div
                style={headerStyles}
            >
                <h1> Chapitre: Mathématique 4ème </h1>
                {/* TODO: create view add chapter refer to /chapter/new */}
                <button onClick={()=> history.push('/chapitres/nouveau')} > + Ajouter un chapitre </button>
            </div>
            <div>
                {chapters.map((chapter) => (
                    <div
                        key={chapter.id}
                    >
                        <span> {chapter.number}. {chapter.name} </span> <button style={{backgroundColor: 'red'}} onClick={()=>handleDeleteChapter(chapter.id)} >supp</button>
                        <br/>
                    </div>
                ))}
            </div>

            {/* <AddChapter /> */}
        </div>
    )
}