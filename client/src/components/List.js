import React, { useEffect } from "react";
import { connect } from "react-redux";

import ListItem from "./ListItem";

function List({ links }) {
  useEffect(() => {
    if (links.length > 0) {
      localStorage.setItem("shortenedLinks", JSON.stringify(links));
    }
  }, [links]);

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

const mapStateToProps = state => {
  return {
    links: state.links
  };
};

export default connect(
  mapStateToProps,
  null
)(List);
