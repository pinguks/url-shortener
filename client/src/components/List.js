import React from "react";

import ListItem from "./ListItem";

function List({ links }) {
  return (
    <div className="List">
      {links.map((link, index) => (
        <ListItem
          key={index}
          originalUrl={link.originalUrl}
          shortenedUrl={link.shortenedUrl}
        />
      ))}
    </div>
  );
}

export default List;
