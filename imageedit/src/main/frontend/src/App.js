import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Main from "./Main";
import LoginForm from "./AppHeader/loginForm";
import AddMemberForm from "./AppHeader/addMemberForm";

const App = () => {
  return (
    <div className='App'>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Main />}></Route>
					<Route path="/signUp" element={<AddMemberForm />}></Route>
					<Route path="/login" element={<LoginForm />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
  );
};

export default App;
