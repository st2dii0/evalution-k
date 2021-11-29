import React, { CSSProperties, useState, useEffect } from "react"
import { UserGlobalState } from "../core/user"
import { useHistory } from "react-router-dom"
import { Container, Content, Panel, Header, Radio, Button } from "rsuite"
import axios from "axios"

import { Chapter } from "../models/api/Chapters"
import { Question, Answers_Attributes } from "../models/api/Question"
import usePagination from "../components/questions/Pagination"
import  { QuestionPerChapter }  from "../components/questions/QuestionPerChapter"

const headerStyles: CSSProperties = {
  display: "flex",
  marginBottom: 50,
  margin: "0 0 30px 0",
  padding: "20px 0",
  textAlign: "center",
  alignContent: "center",
  justifyContent: "center",
  backgroundColor: "#1E303E",
  color: "#ffffff"
}
const bodyStyles: CSSProperties = {
  display: "flex",
  marginLeft: 30,
  flexDirection: "column",
  alignItems: "center"
}

const defaultChapter: Chapter[] = []

export const Evaluation = () => {
  // const [{ user }] = UserGlobalState()
  const history = useHistory()
  const host = process.env.REACT_APP_BASEURL
  const [chapters, setChapters]: [
    Chapter[],
    (chapters: Chapter[]) => void
  ] = useState(defaultChapter)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [countChapters, setCountChapters] = useState(0)

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages
  } = usePagination({
    contentPerPage: 1,
    count: chapters.length
  })

  const fetchChapter = () => {
    axios
      .get(`${host}/v1/chapters`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        setChapters(response.data)
        setCountChapters(response.data.length)
        console.log("chapters: ", chapters)
        setLoading(false)
        console.log("chapterCount: ", countChapters)
      })
      .catch(err => {
        console.log(err)
        setError(true)
      })
  }

  useEffect(() => {
    fetchChapter()
  }, [loading])

  return (
    <Container>
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
        <Panel>
          <h1>Mathématique - 4ème</h1>
        </Panel>
      </Content>
      <Content style={bodyStyles}>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>Error fetching data</h2>
        ) : (
          <>
            <div className="pagination">
              <button
                onClick={prevPage}
                className={`page ${page === 1 && "disabled"}`}
              >
                &larr;
              </button>
              {/* @ts-ignore */}
              {[...Array(totalPages).keys()].map(el => (
                <button
                  onClick={() => setPage(el + 1)}
                  key={el}
                  className={`page ${page === el + 1 ? "active" : ""}`}
                >
                  {el + 1}
                </button>
              ))}
              <button
                onClick={nextPage}
                className={`page ${page === totalPages && "disabled"}`}
              >
                &rarr;
              </button>
            </div>
            <div className="items">
              {chapters
                .slice(firstContentIndex, lastContentIndex)
                .map((chapter: Chapter) => (
                  // create a component EvalChapter
                  <div key={chapter.id}>
                    <div>
                      <h3>{chapter.name}</h3>
                      <QuestionPerChapter chapter={chapter} />
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </Content>
    </Container>
  )
}
