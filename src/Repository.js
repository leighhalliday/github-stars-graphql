import React from "react";

const Repository = ({
  data: { name, description, url, pushedAt, languages }
}) => (
  <div>
    <h2>{name}</h2>
    <a href={url} target="_blank" rel="noopener noreferrer">
      {url}
    </a>
    <p>
      <small>
        <em>{pushedAt}</em>
        {" / "}
        <strong>{languages.nodes.map(node => node.name).join(", ")}</strong>
      </small>
    </p>
    <p>{description}</p>
  </div>
);

export default Repository;
