import React, {  CSSProperties, useState, useEffect } from 'react'
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
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Question, Answers_Attributes } from '../models/api/Question';
import { Chapter } from '../models/api/Chapters';


const headerStyles: CSSProperties = {
    display: "flex",
    marginLeft: 30,
    marginTop: 60,
    marginBottom: 50
};


const defaultQuestion: Question = {
    "id": null,
    "text": null,
    "difficulty": null,
    "answers_attributes": [
        {
            "correct": null,
            "text": null
        }
    ]
}


const defaultAnwswer_Attributes: Answers_Attributes[] = [
    {
        'text': null,
        'correct': false
    }
]
    

export const CreateQuestions = () => {
    const host = process.env.REACT_APP_BASEURL
    const history = useHistory()
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
    const [error, setError]: [string, (error: string) => void] = useState("")
    const { id } = useParams<{id: string}>()
    const idChapter = Number(id)
    
    const [ questions, setQuestions] = useState<Question>(defaultQuestion)
    const [ answers_attributes, setAnswers_attributes ] = useState<Answers_Attributes[]>(defaultAnwswer_Attributes)


    let addNewQuestionAttributes = () => {
        console.log("AddNewQuestionAttributes")
        setAnswers_attributes([...answers_attributes, {
            text: "",
            correct: false
        }])
    }
    
    const updateItem =(index: number, whichvalue: string, newvalue: string | boolean)=> {
        let newAnswers: Answers_Attributes = answers_attributes[index]
        newAnswers[whichvalue] = newvalue
        setAnswers_attributes([
            ...answers_attributes.slice(0, index),
            newAnswers,
            ...answers_attributes.slice(index + 1)
        ]);
    }

    const handleSubmit = () => {
        setQuestions({...questions, answers_attributes})
        setLoading(true)

        console.log('answers_attributes :', answers_attributes);
    }

    useEffect(() => {
        if(loading === true) {
            console.log('Question :', questions);

            axios.post(`${host}/v1/chapters/${idChapter}/questions`, {
                questions
            })
            .then(response => {
                console.log(response);
                //TODO: add redirection to current chapter       
            })
            .catch(err => {
                setError(err)
                console.log(err);
            })
        }
    }, [loading])

    return (

        <Container>
            <Content
                style={headerStyles}
            >
                <h1> Détail de la question </h1>
            </Content>
            <Content
                style={{
                    display: 'flex',
                    border: 3
                }}
            >
                <IconButton
                    onClick={() => history.push(`/chapitres/${idChapter}/`)} 
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
                                            updateItem(index, "text", value)
                                        }}
                                    />
                                    <Checkbox
                                        defaultChecked={false}
                                        onChange={(e, checked: boolean)=> {
                                            updateItem(index, "correct", checked)
                                        }}
                                        >
                                        Correcte
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