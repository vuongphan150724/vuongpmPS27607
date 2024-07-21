import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TimKiem.css";
import PhanTrang from "./PhanTrang";

function TimKiem() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value) {
      fetch(`http://localhost:3000/timkiem?q=${value}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          setResults(data);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setResults([]);
        });
    } else {
      setResults([]);
    }
  };

  return (
    <div className="timkiem-container">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={query}
        onChange={handleSearch}
        className="timkiem-input"
      />
      <div className="timkiem-results">
   
        {results.length > 0 && <PhanTrang listSP={results} pageSize={6} />}
      </div>
    </div>
  );
}

export default TimKiem;
