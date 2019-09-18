import axios from "axios";

export const setLinks = links => {
  return {
    type: "SET_LINKS",
    payload: links
  };
};

export const setInputText = text => {
  return {
    type: "SET_INPUT_TEXT",
    payload: text
  };
};

export const setInputPlaceHolder = text => {
  return {
    type: "SET_INPUT_PLACEHOLDER",
    payload: text
  };
};

export const addLink = link => {
  return {
    type: "ADD_LINK",
    payload: link
  };
};

export const saveLinkToDB = inputText => async dispatch => {
  try {
    const res = await axios.post("/api", { originalUrl: inputText });

    dispatch(addLink(res.data));
    dispatch(setInputPlaceHolder("Shorten your link"));
  } catch (error) {
    dispatch(setInputPlaceHolder(error.response.data.error));
  }
};
