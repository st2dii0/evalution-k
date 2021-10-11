import React, { useState, CSSProperties, useEffect } from "react";
import { UserGlobalState } from "../core/user";
import { useHistory, Link, useParams } from "react-router-dom";

import axios from "axios";
import { Container, Content, Button, Icon, IconButton, Header } from "rsuite";

import { Chapter } from "../models/api/Chapters";

require("dotenv").config();

const defaultChapter: Chapter[] = [];

const chapterStyles: CSSProperties = {
  marginLeft: 20,
  marginBottom: 50,
  textDecoration: "none"
};

const chapterDisplayStyles: CSSProperties = {
  display: "flex"
};

const deleteButtonStyles: CSSProperties = {
  display: " flex",
  justifyContent: "flex-end",
  backgroundColor: "red",
  color: "#ffffff",
  marginLeft: 60
};

const headerStyles: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  alignContent: "center",
  columnGap: 200,
  marginBottom: 20
};

const buttonStyles: CSSProperties = {
  backgroundColor: "#0D67F2",
  color: "#ffffff"
};

export const Chapters = () => {
  const [{ user }] = UserGlobalState();
  const history = useHistory();
  const host = process.env.REACT_APP_BASEURL;
  const [chapters, setChapters]: [
    Chapter[],
    (chapters: Chapter[]) => void
  ] = useState(defaultChapter);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<
    boolean
  >(true);
  const [error, setError]: [string, (error: string) => void] = useState("");

  const handleClickNewchapter = () => {
    history.push({
      // {/*TODO: Change this url when new features comes */}
      pathname: `/matiere/${1}/niveau/${1}/chapitre/nouveau`
    });
  };

  useEffect(() => {
    axios
      .get<Chapter[]>(`${host}/v1/chapters/`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        setChapters(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleDeleteChapter = (id: number) => {
    axios.delete(`${host}/v1/chapters/${id}`).then(response => {
      if (response.status === 204) {
        setChapters(chapters.filter(chapter => chapter.id !== id));
      }
    });
  };

  return (
    <Container 
        style={chapterStyles}
    >
        <Header>
        <img
          src={require("../assets/mymentor.jpeg").default}
          alt="mymentor"
          style={{
            maxWidth: 200,
            width: 150,
            marginLeft: 10
          }}
        />
      </Header>
      <Content style={headerStyles}>
        <h1> Chapitre: Mathématiques 3ème </h1>
        <Button onClick={() => handleClickNewchapter()} style={buttonStyles}>
          {" "}
          + Ajouter un chapitre{" "}
        </Button>
      </Content>
      <Content style={chapterStyles}>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>Error fetching data</h2>
        ) : (
          <>
            {chapters.map((chapter, idx) => (
              <div key={idx}>
                <div style={chapterDisplayStyles}>
                  <Link to={`/chapitres/${chapter.id}`}>
                    {chapter.number != null ? `${chapter.number}. ` : ""}{" "}
                    {chapter.name}
                  </Link>
                  <IconButton
                    style={deleteButtonStyles}
                    onClick={() => handleDeleteChapter(chapter.id)}
                    icon={<Icon icon="trash2" />}
                  />
                </div>
                <br />
              </div>
            ))}
          </>
        )}
      </Content>
    </Container>
  );
};
