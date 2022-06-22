import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [terms, setTerms] = useState("");

  async function search(e) {
    e.preventDefault();
    onSearch(terms);
  }

  function handleTermChange(e) {
    const value = e.target.value;
    setTerms(value);
  }
  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
      />
      <button className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );
}
