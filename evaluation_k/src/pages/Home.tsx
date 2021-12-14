import React, { CSSProperties } from "react";
// import { UserGlobalState } from '../core/user'
import { useHistory, Link } from "react-router-dom";
import { Container, Content, Header } from "rsuite";

const headerStyles: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  alignContent: "center",
  columnGap: 200,
  marginBottom: 20
};

export const Home = () => {
  // const [{ user }] = UserGlobalState()
  return (
    <Container>
      <Content>
        <div
          style={{
            minHeight: "50px",
            borderBottom: "1px solid #ECECF2"
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <div
            style={{
              listStyle: "none",
              textDecoration: 'none'
            }}
          >
            <ul>
              <li>
                <Link to="/admin/chapitres">Chapitres</Link>
              </li>
              <li>
                <Link to="/">Utilisateurs</Link>
              </li>
              <li>
                <Link to="/">Établissements</Link>
              </li>
              <li>
                <Link to="/evaluations">Évaluations</Link>
              </li>
            </ul>
          </div>
          <div
            style={{
              flex: "auto",
              padding: "35px",
              minHeight: "100vh",
              backgroundColor: "#F4F4F6"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0 0 30px 0",
                padding: "0 0 8px 0"
              }}
            >
              <h1
                style={{
                    display: "flex",
                    margin: "0 0 30px 0",
                    textAlign: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    backgroundColor: "#1E303E",
                    color: "#ffffff"
                  }}
              >Chapitres Mathématiques 4ème</h1>
            </div>
          </div>
        </div>
      </Content>
    </Container>
  );
};
