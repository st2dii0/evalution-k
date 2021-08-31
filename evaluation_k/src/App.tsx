import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { UserProvider, UserState } from "./core/user"

import { Home } from "./pages/Home"
import { Chapters } from "./pages/Chapters"
import { Evaluation } from "./pages/Evaluation"
import { Questions } from "./pages/Questions"
import { CreateChapter } from "./pages/CreateChapter";

import logo from './logo.svg'

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
      <Route exact path="/chapitres/nouveau" component={CreateChapter} />
      <Route exact path="/evaluation" component={Evaluation} />
      <Route exact path="/question" component={Questions} />
    </UserProvider>
  );
}

export default App;
