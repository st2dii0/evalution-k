import React, { useState, CSSProperties, useEffect } from 'react'
import { UserGlobalState } from '../core/user'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import { Container, Content, Button, Form, FormGroup, FormControl, InputPicker, ControlLabel, HelpBlock, 
    ButtonToolbar, Input } from 'rsuite'
import { Card } from '@material-ui/core'
import { Chapter } from '../models/api/Chapters'
import { async } from 'q';

const headerStyles: CSSProperties = {
    display: 'flex',
    marginLeft: 30,
    marginTop: 60,
    marginBottom: 50
}

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

const data = [
    {
        "label": "Mathématique"
    },
    {
        "label": "Français"
    },
    {
        "label": "Biologie"
    },
    {
        "label": "Anglais"
    },
]
const data2 = [
    {
        "label": 1,
        "value": "Mathématique"
    },
    {
        "label": 2,
        "value": "Français"
    },
    {
        "label": 3,
        "value": "Biologie"
    },
    {
        "label": 4,
        "value": "Anglais"
    },
]

const fetchData =  async () => {
    try {
        const res = 
        await axios.get(`http://1c1d-213-41-111-106.ngrok.io/v1/chapters/new`, {
            headers:{
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                console.log(`axios response:  ${response.data.fields}`)
                let datafield = response.data.fields
                // datafield.forEach(element => {
                //     console.log(element.name)
                // });
            })
            .catch(err => {
                console.log(err)
            })
    } catch(err) {
        console.log(err)
    }
} 
        
//     let plop = res.fields

// const  dataFields = 0

export const CreateChapter = () => {
    const host = process.env.REACT_APP_BASEURL

    const [ chapter, setChapter] = useState()

    fetchData()
    

    let handleSubmit = (event: any ) => {
        event.preventDefault()
        alert(JSON.stringify(chapter))
    }
    return(
        <Container>
            <Content
                style={headerStyles}
            >
                <h1> Créer un nouveau chapitre </h1>
            </Content>
            <Content
                style={{
                    display: 'flex',
                    marginLeft: 20,
                    marginRight: 20,
                    padding: '11.4px 12px',
                    border: '2px solid #eee'
                }}
            >

            <Form 
                layout="horizontal"
                style={{
                    marginLeft: 60
                }}
            >
                <FormGroup> 
                    <ControlLabel> Numéro </ControlLabel>  
                    <Input
                        style={{
                            width: 100
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel> Nom </ControlLabel>    
                    <Input
                        style={{
                            width: 300
                        }}
                    />
                </FormGroup> 
                <FormGroup>
                    <ControlLabel> Matière </ControlLabel>  
                    <InputPicker 
                        data={data}
                        style={{ width: 224 }}
                        appearance="default"
                        placeholder="Mathématiques"
                    />
                </FormGroup> 
                <FormGroup>
                    <ControlLabel> Niveau </ControlLabel>  
                    <InputPicker 
                        data={data2}
                        style={{ width: 224 }}
                        appearance="default"
                        placeholder="3ème"
                    />
                </FormGroup> 
                <Button 
                    appearance="primary"
                    style={{
                        width: 100,
                        backgroundColor: '#0064FF',
                        color: '#ffffff',
                        marginLeft: 180
                    }}
                > Enregister </Button>
            </Form>
            </Content>
        </Container>
    )
}

export default CreateChapter