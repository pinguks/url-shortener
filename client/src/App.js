import "./App.css";
import React, { Component } from "react";
import axios from "axios";

import { CopyToClipboard } from "react-copy-to-clipboard";

class App extends Component {
  state = {
    shortenedLinks: [],
    inputText: "",
    inputPlaceholder: "Shorten your link"
  };

  componentDidMount() {
    const shortenedLinks = localStorage.getItem("shortenedLinks");

    if (shortenedLinks !== null) {
      this.setState({ shortenedLinks: JSON.parse(shortenedLinks) });
    }
  }

  savetoLocalStorage = () => {
    localStorage.setItem(
      "shortenedLinks",
      JSON.stringify(this.state.shortenedLinks)
    );
  };

  onInputChange = e => {
    this.setState({ inputText: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();

    const { inputText } = this.state;

    this.setState({ inputText: "" }, () => {
      axios
        .post("/", { url: inputText })
        .then(res => {
          this.setState(state => {
            return {
              shortenedLinks: [...state.shortenedLinks, res.data]
            };
          }, this.savetoLocalStorage);
        })
        .catch(err => {
          this.setState({
            inputText: "",
            inputPlaceholder: err.response.data.error
          });
        });
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <img
            src="https://tinyurl.com/siteresources/images/tinyurl_logo.png"
            alt="tinyurl logo"
          />
          <p>Making long URLs usable!</p>
        </header>
        <main>
          <div className="container">
            <form onSubmit={this.onFormSubmit}>
              <input
                type="text"
                placeholder={this.state.inputPlaceholder}
                value={this.state.inputText}
                onChange={this.onInputChange}
              />
              <button type="submit">Shorten</button>
            </form>
            <div className="List">
              {this.state.shortenedLinks.map((link, index) => {
                return (
                  <div key={index} className="List-item">
                    <p className="OriginalUrl">{link.originalUrl}</p>
                    <a
                      rel="noopener noreferrer"
                      href={link.shortenedUrl}
                      target="_blank"
                      className="ShortenedUrl"
                    >
                      {link.shortenedUrl}
                    </a>
                    <CopyToClipboard text={link.shortenedUrl}>
                      <button className="List-btn">Copy</button>
                    </CopyToClipboard>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
