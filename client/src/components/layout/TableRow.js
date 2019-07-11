import React, { Fragment } from "react";
import uuid from "uuid";

const TableRow = props => {
  const trimmedCategories = props.categories.filter(function(el) {
    return el != null;
  });
  return (
    <Fragment>
      <div>{props.id}</div>
      <div>{props.content}</div>
      <div>{props.time}</div>
      <div className="finalDiv">
        <ul className="categoriesList">
          {trimmedCategories.map(category => (
            <li key={uuid.v4()}>{category}</li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default TableRow;
