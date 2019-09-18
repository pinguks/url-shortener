import "./App.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { setLinks } from "./actions";

import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";

const App = ({ setLinks }) => {
  useEffect(() => {
    const shortenedLinks = localStorage.getItem("shortenedLinks");

    if (shortenedLinks) {
      setLinks(JSON.parse(shortenedLinks));
    }
  }, [setLinks]);

  return (
    <div className="App">
      <Header />
      <main>
        <div className="container">
          <Form />
          <List />
        </div>
      </main>
    </div>
  );
};

export default connect(
  null,
  { setLinks }
)(App);
