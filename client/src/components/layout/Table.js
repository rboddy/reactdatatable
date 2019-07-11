import React, { useState, useEffect } from "react";
import uuid from "uuid";
import axios from "axios";
import TableRow from "./TableRow";

const Table = () => {
  // set all initial state using the useState hook
  const [data, setData] = useState([
    {
      id: null,
      Content: "",
      Time: "",
      Category_1: ""
    }
  ]);
  const [upperLimit, setUpperLimit] = useState(6);
  const [lowerLimit, setLowerLimit] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  // add my useEffects to listen for changes in state
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/data");
      setData(result.data);
    };

    fetchData();

    //setup the arrow keys
    document.onkeydown = function(e) {
      switch (e.keyCode) {
        case 38:
          if (lowerLimit !== 0) {
            console.log("Time to go back");
            setLowerLimit(lowerLimit - 15);
            setUpperLimit(upperLimit - 15);
            setIsFetching(true);
          }
          break;
        case 40:
          console.log("Time to fetch more data!");
          setLowerLimit(lowerLimit + 15);
          setUpperLimit(upperLimit + 15);
          setIsFetching(true);
          break;
      }
    };
  }, [lowerLimit, upperLimit]);

  useEffect(() => {
    if (!isFetching) return;

    function fetchMoreData() {
      const fetchData = async () => {
        const result = await axios("/api/data");
        setData(result.data);
      };
      fetchData();
      setIsFetching(false);
    }

    fetchMoreData();
  }, [isFetching, upperLimit, lowerLimit]);

  function dataUp() {
    if (lowerLimit !== 0) {
      console.log("Time to go back");
      setLowerLimit(lowerLimit - 15);
      setUpperLimit(upperLimit - 15);
      setIsFetching(true);
    }
  }
  function dataDown() {
    console.log("Time to fetch more data!");
    setLowerLimit(lowerLimit + 15);
    setUpperLimit(upperLimit + 15);
    setIsFetching(true);
  }

  /* Generate a grid that uses the limits set in state to slice a chunk of the whole dataset to display. 
     Passed the data to a lower level component for the rows themselves with props because I thought it was more manageable.*/
  return (
    <div>
      <div className="instructions">
        <p>Use the up and down arrow keys to load next or previous rows.</p>
        <p>Alternatively, use these buttons</p>
        <button className="removeBtn" onClick={dataUp}>
          <i className="fas fa-arrow-circle-up fa-3x" />
        </button>
        <button className="removeBtn" onClick={dataDown}>
          <i className="fas fa-arrow-circle-down fa-3x" />
        </button>
      </div>

      <div className="dataTable" id="dataTable">
        <div className="dataTableHeader">ID</div>
        <div className="dataTableHeader">Content</div>
        <div className="dataTableHeader">Time</div>
        <div className="dataTableHeader">Categories</div>
        {data.slice(lowerLimit, upperLimit).map(item => (
          <TableRow
            key={uuid.v4()}
            id={item.id}
            content={item.Content}
            time={item.Time}
            categories={[
              item.Category_1,
              item.Category_2,
              item.Category_3,
              item.Category_4,
              item.Category_5,
              item.Category_6,
              item.Category_7,
              item.Category_8,
              item.Category_9,
              item.Category_10,
              item.Category_11
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export default Table;
