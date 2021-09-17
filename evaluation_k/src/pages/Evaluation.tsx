import React, {  CSSProperties, useState } from 'react'
import { UserGlobalState } from '../core/user'
import { useHistory } from "react-router-dom"
import { Container, Content, Panel, Header, Radio, Button } from 'rsuite'


const headerStyles: CSSProperties = {
    display: "flex",
    marginBottom: 50,
    margin: '0 0 30px 0',
    padding:'20px 0',
    textAlign: 'center',
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: '#1E303E',
    color: '#ffffff'
}
const bodyStyles: CSSProperties = {
    display: 'flex',
    marginLeft: 30,
    flexDirection: 'column',
    alignItems: 'center',
}

export const Evaluation = () => {
    // const [{ user }] = UserGlobalState()
    // const history = useHistory()
    const [ activePage, setActivePage ] = useState()

    // const handle 

    return (
        <Container>
            <Header>
                <img 
                    src={require("../assets/mymentor.jpeg").default}
                    alt='mymentor'
                    style={{
                        maxWidth: 200,
                        width: 150,
                        marginLeft: 10
                    }}
                />

            </Header>
            <Content
                style={headerStyles}
            >
                <Panel>
                    <h1>
                        Mathématique - 4ème
                    </h1>
                </Panel>
            </Content>
            <Content
                style={bodyStyles}
            >
                <h3> chapter.Title </h3>
                
                    <h5> question[activePage].text </h5>
                    <Radio>
                        question[activePage].answer_attributes[index].text
                    </Radio>
                    <Radio>
                        question[activePage].answer_attributes[index].text
                    </Radio>
                    <Radio>
                        question[activePage].answer_attributes[index].text
                    </Radio>

                    <Button
                        appearance='primary'
                    >
                        Valider
                    </Button>

            </Content>
        </Container>
    )
}