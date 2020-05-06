import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Page404 from "./views/error/Page404";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Redirect exact from="/" to="/login"></Redirect>
        <Route path="*" component={Page404}></Route>
      </Switch>
    </Router>
  );
}

export default App;
