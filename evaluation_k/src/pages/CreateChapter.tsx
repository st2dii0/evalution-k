import React, { useState, CSSProperties, useEffect } from 'react'
import { UserGlobalState } from '../core/user'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import { 
    Container, Content, Button, Form, FormGroup, FormControl, InputPicker, ControlLabel, HelpBlock, 
    ButtonToolbar, Input 
} from 'rsuite'
import { Chapter } from '../models/api/Chapters'

import { useLocation } from 'react-router-dom'


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



export const CreateChapter = () => {
    const host = process.env.REACT_APP_BASEURL
    const location = useLocation()

    console.log('state :', location.state);
    
    const [ chapter, setChapter] = useState(location.state)

    
    // console.log(` obj chapter from sub chapter: ${  }`);
    
    const fetchData =  async () => {
        try {
            const res = 
            await axios.get(`${host}/v1/chapters/new`, {
                headers:{
                    "Content-Type": "application/json"
                }
            })
                //TODO: Adding condition for sub chapter {with chapter_id} and new chapter {with field_id & level_id}
                .then(response => {
                    console.log(`axios response:  ${response.data.fields}`)
                    let datafield = response.data.fields
                    // datafield.forEach(element => {
                    //     console.log(element.name)
                    // });
                    
                    const data_fields = response.data.fields
                    const data_levels = response.data.levels
                })
                .catch(err => {
                    console.log(err)
                })
        } catch(err) {
            console.log(err)
        }
    }

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
                    <ControlLabel> Chapitre parent </ControlLabel>  
                    <InputPicker 
                        data={[]}
                        style={{ width: 224 }}
                        appearance="default"
                        placeholder="chapitre parent"
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