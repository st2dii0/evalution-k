import React, {  CSSProperties, useState } from 'react'
import { 
    Container,
    Content,
    Button,
    Form,
    FormGroup,
    FormControl,
    InputPicker,
    ControlLabel,
    HelpBlock,
    ButtonToolbar,
    Input,
    SelectPicker,
    InputNumber,
    IconButton,
    Icon,
    Checkbox
} from 'rsuite'
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Question } from '../models/api/Question';
import { Chapter } from '../models/api/Chapters';
import { number } from 'prop-types';



const headerStyles: CSSProperties = {
    display: "flex",
    marginLeft: 30,
    marginTop: 60,
    marginBottom: 50
};

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
    ]
}

const defaultQuestion: Question = {
    "id": null,
    "text": null,
    "difficulty": null,
    'answers_attributes': [
        {
            'correct': null,
            'text': null
        }
    ]
}

interface answerAttribute {
    correct: boolean
    text: string
}
const defaultAnswers_attributes: answerAttribute[] = [{
    "correct": null,
    "text": null
}]


export const CreateQuestions = () => {
    const host = process.env.REACT_APP_BASEURL
    const history = useHistory()
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true)
    const [error, setError]: [string, (error: string) => void] = useState("")
    const { id } = useParams<{id: string}>()
    const idChapter = Number(id)
    const [chapter, setChapter ] = useState<Chapter>(defaultChapter)

    const [ questions, setQuestions] = useState<Question>(defaultQuestion)
    
    const [ answers_attributes, setAnswers_attributes ] = useState(defaultAnswers_attributes)
    const [ answers_attributesText, setanswers_attributesText ] = useState("")
    const [ answers_attributesCorrect, setanswers_attributesCorrect ] = useState(false)

    let addNewQuestionAttributes = () => {
        setAnswers_attributes([...answers_attributes, {
            correct: false,
            text: ""
        }])
    }

    const fetchDataChapter = async () => {
        await axios.get<Chapter>(`${host}/v1/chapters/${idChapter}`, {
            headers:{
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                setLoading(true)
                setChapter(response.data)
                setLoading(false)
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }

    const handleSubmit =  () => {

        setAnswers_attributes([...answers_attributes, {
            text: answers_attributesText,
            correct: answers_attributesCorrect
        }])
        console.log('answers_attributes :', answers_attributes);
        console.log('Question :', questions);
        console.log('Answer_attributes :', answers_attributes);
        console.log('Chapter :', chapter);
    }

    // fetchDataChapter()
    console.log(chapter);    

    return (

        <Container>
            <Content
                style={headerStyles}
            >
                <h1> Questions </h1>
            </Content>
            <Content
                style={{
                    display: 'flex',
                    border: 3
                }}
            >
                <IconButton
                    onClick={() => history.push(`/chapitres/${chapter.id}/`)} 
                    icon={<Icon icon='back-arrow' />}
                />
                <h5> Informations sur la question </h5>
                <Form
                    layout="horizontal"
                    style={{
                      marginLeft: 60
                    }}
                >
                    <FormGroup>
                        <ControlLabel> Difficulté </ControlLabel>
                        <Input
                            style={{
                              width: 100
                            }}
                            type="number"
                            onChange={value => {
                                var n = Number(value);
                                console.log(n);
                                
                                setQuestions({...questions, difficulty: n})
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel> Texte </ControlLabel>

                        <Input
                            style={{
                              width: 600
                            }}
                            onChange={value => {
                                setQuestions({...questions, text: value})
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h5> Réponses possibles </h5>
                        <div>
                            {answers_attributes.map((element, index) => (
                                <div
                                    key={index}
                                > 

                                    <ControlLabel> Texte </ControlLabel>
                                    <Input
                                        style={{
                                        width: 600
                                        }}
                                        onChange={value => {
                                            setanswers_attributesText(value)
                                            // setAnswers_attributes({...answers_attributes, text: value})
                                        }}
                                    />
                                    <Checkbox
                                        onChange={(checked: boolean)=> {
                                            setanswers_attributesCorrect(checked)
                                        }}
                                    >
                                        Bonne réponse
                                    </Checkbox>
                                    <hr /> 
                                </div>
                            ))}
                            
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Button
                            appearance="primary"
                            style={{
                                backgroundColor: '#0D67F2',
                                color: '#ffffff',
                                marginLeft: 30
                            }}
                            onClick={() => addNewQuestionAttributes()}

                        >
                            Ajouter une question
                        </Button>
                        <Button
                            appearance="primary"
                            style={{
                                backgroundColor: '#0D67F2',
                                color: '#ffffff',
                                marginLeft: 30
                            }}
                            onClick={handleSubmit}
                        >
                            Enregister
                        </Button>
                    </FormGroup>
                </Form>
            </Content>
        </Container>
    )
}