import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./Main";
import AddMemberForm from "./AppHeader/addMemberForm";
import LoginForm from "./AppHeader/loginForm";
import TestForm from "./AppHeader/testForm";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
          <Route path="/signUp" element={<AddMemberForm />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/test" element={<TestForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
