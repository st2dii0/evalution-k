import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { UserProvider, UserState } from "./core/user"

import { Home } from "./pages/Home"
import { Chapters } from "./pages/Chapters"
import { Evaluation } from "./pages/Evaluation"
import { CreateQuestions } from "./pages/CreateQuestions"
import { CreateChapter } from "./pages/CreateChapter"
import { ChapterDetails } from './pages/ChapterDetails'
import { Result } from './pages/Result'

import "rsuite/dist/styles/rsuite-default.css"
import './App.css'

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const userInitialState: UserState = {
  user: user ? JSON.parse(user) : null,
  token: token
};

const reducer = (prevState: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "setUser":
      if (!action.payload) {
        localStorage.removeItem("user");
        return { ...prevState, user: null };
      }

      const user = { ...prevState.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(user));
      return { ...prevState, user };

    case "setToken":
      if (!action.payload) {
        localStorage.removeItem("token");
        return { ...prevState, token: null };
      }
      const token = action.payload;
      localStorage.setItem("token", token);
      return { ...prevState, token };

    default:
      return prevState;
  }
};

export const App = () => {
  return (
    <UserProvider initialState={userInitialState} reducer={reducer}>
      <Route exact path="/" component={Home} />
      <Route exact path="/chapitres" component={Chapters} />
      <Route exact path="/chapitres/:id" component={ChapterDetails} />
      <Route path="/chapitres/:id/nouveau" component={CreateChapter} />
      <Route path="/matiere/:field_id/niveau/:level_id/chapitre/nouveau" component={CreateChapter} />
      <Route path="/evaluation" component={Evaluation} />
      <Route path="/resultat/:eval_id" component={Result} />
      <Route path="/chapitres/:id/questions/nouveau" component={CreateQuestions} />
    </UserProvider>
  );
}

export default App;
