import React, {  CSSProperties } from 'react'
// import { UserGlobalState } from '../core/user'
// import { useHistory } from "react-router-dom"
import { Container, Content } from 'rsuite'


const headerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    columnGap: 200,
    marginBottom: 20,
}

export const Home = () => {
    // const [{ user }] = UserGlobalState()
    return (
        <Container>
            <Content>
                <h1> Home </h1>
            </Content>
            
        </Container>
    )
}
