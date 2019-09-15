import "./App.css";
import React, { Component } from "react";
import axios from "axios";

import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";

class App extends Component {
  state = {
    links: [],
    inputText: "",
    inputPlaceholder: "Shorten your link"
  };

  componentDidMount() {
    const shortenedLinks = localStorage.getItem("shortenedLinks");

    if (shortenedLinks) {
      this.setState({ links: JSON.parse(shortenedLinks) });
    }
  }

  savetoLocalStorage = () => {
    localStorage.setItem("shortenedLinks", JSON.stringify(this.state.links));
  };

  onInputChange = e => {
    this.setState({ inputText: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();

    const { inputText } = this.state;

    this.setState({ inputText: "" }, async () => {
      try {
        const res = await axios.post("/", { originalUrl: inputText });

        this.setState(
          {
            links: [...this.state.links, res.data],
            inputPlaceholder: "Shorten your link"
          },
          this.savetoLocalStorage
        );
      } catch (error) {
        this.setState({
          inputPlaceholder: error.response.data.error
        });
      }
    });
  };

  render() {
    const { links, inputPlaceholder, inputText } = this.state;

    return (
      <div className="App">
        <Header />
        <main>
          <div className="container">
            <Form
              onFormSubmit={this.onFormSubmit}
              inputPlaceholder={inputPlaceholder}
              inputText={inputText}
              onInputChange={this.onInputChange}
            />
            <List links={links} />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
