import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import shortenText from "../utils/shortenText";

function ListItem({ originalUrl, shortenedUrl }) {
  return (
    <div className="List-item">
      <p className="OriginalUrl">{shortenText(originalUrl)}</p>
      <a
        className="ShortenedUrl"
        rel="noopener noreferrer"
        href={`/${shortenedUrl}`}
        target="_blank"
      >
        {`/${shortenedUrl}`}
      </a>
      <CopyToClipboard text={`${window.location.origin}/${shortenedUrl}`}>
        <button className="List-btn">Copy</button>
      </CopyToClipboard>
    </div>
  );
}

export default ListItem;
