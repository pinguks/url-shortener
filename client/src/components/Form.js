import React from "react";
import { connect } from "react-redux";

import { setInputText, saveLinkToDB } from "../actions";

function Form({ inputPlaceholder, inputText, setInputText, saveLinkToDB }) {
  const onFormSubmit = e => {
    e.preventDefault();

    saveLinkToDB(inputText);
    setInputText("");
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder={inputPlaceholder}
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />
      <button type="submit">Shorten</button>
    </form>
  );
}

const mapStateToProps = state => {
  return {
    inputText: state.inputText,
    inputPlaceholder: state.inputPlaceholder
  };
};

export default connect(
  mapStateToProps,
  { setInputText, saveLinkToDB }
)(Form);
