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
  const [upperLimit, setUpperLimit] = useState(15);
  const [lowerLimit, setLowerLimit] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  // add my useEffects to listen for changes in state
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/data");
      setData(result.data);
    };

    fetchData();

    // add event listeners and functions to the different scroll directions
    function handleScrollDown() {
      if (
        window.innerHeight + window.scrollY !==
        document.documentElement.offsetHeight
      )
        return;
      console.log("Time to fetch more data!");
      setLowerLimit(lowerLimit + 15);
      setUpperLimit(upperLimit + 15);
      setIsFetching(true);
    }
    window.addEventListener("scroll", handleScrollDown);
    const handleScrollUp = function(e) {
      if (e.deltaY < 1 && lowerLimit !== 0) {
        console.log(lowerLimit);
        if (document.documentElement.scrollTop !== 0) return;
        console.log("Time to go back");
        setLowerLimit(lowerLimit - 15);
        setUpperLimit(upperLimit - 15);
        setIsFetching(true);
      }
    };
    window.addEventListener("wheel", handleScrollUp);

    // Remove the event listeners so that they aren't commited multiple times when the effect is reused
    return () => {
      window.removeEventListener("scroll", handleScrollDown);
      window.removeEventListener("wheel", handleScrollUp);
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
      window.scrollTo(0, 0);
    }

    fetchMoreData();
  }, [isFetching, upperLimit, lowerLimit]);

  /* Generate a grid that uses the limits set in state to slice a chunk of the whole dataset to display. 
     Passed the data to a lower level component for the rows themselves with props because I thought it was more manageable.*/
  return (
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
  );
};

export default Table;
