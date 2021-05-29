import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Room from "./pages/Room";

//　⏬このimportは、default export の際の記法になる。

// import AuthProvider from "./AuthService";

// 「AuthService.js」にて、export {AuthContext,AuthProvider}
// ⏫のようにexportしているので、⏬のようにimportする必要がある。

import { AuthProvider } from "./AuthService";

import LoggedInRoute from "./LoggedInRoute";

// styled-componentsのreset.css
import { Reset } from "styled-reset";

const App = () => {
  return (
    <>
      {/* <Reset /> */}
      <AuthProvider>
        <Router>
          <Switch>
            <LoggedInRoute exact path="/" component={Room} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
