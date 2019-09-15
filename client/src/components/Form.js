import React from "react";

function Form({ onFormSubmit, inputPlaceholder, inputText, onInputChange }) {
  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder={inputPlaceholder}
        value={inputText}
        onChange={onInputChange}
      />
      <button type="submit">Shorten</button>
    </form>
  );
}

export default Form;
