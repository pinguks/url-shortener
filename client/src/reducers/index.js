import { combineReducers } from "redux";

function linksReducer(state = [], { type, payload }) {
  switch (type) {
    case "SET_LINKS":
      return payload;
    case "ADD_LINK":
      return [...state, payload];
    default:
      return state;
  }
}

function inputTextReducer(state = "", { type, payload }) {
  switch (type) {
    case "SET_INPUT_TEXT":
      return payload;
    default:
      return state;
  }
}

function inputPlaceholderReducer(
  state = "Shorten your link",
  { type, payload }
) {
  switch (type) {
    case "SET_INPUT_PLACEHOLDER":
      return payload;
    default:
      return state;
  }
}

export default combineReducers({
  links: linksReducer,
  inputText: inputTextReducer,
  inputPlaceholder: inputPlaceholderReducer
});
