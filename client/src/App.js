import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Home />
    </Container>
  );
};

export default App;
