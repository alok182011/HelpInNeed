import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Container>
        <BrowserRouter>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </BrowserRouter>
      </Container>
    </AuthProvider>
  );
}

export default App;
