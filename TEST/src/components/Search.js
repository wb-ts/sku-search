import "./Search.css";
import { useState } from "react";

const Search = ({
  search,
  searchHandler,
  suggestions,
  setSuggestions,
  setSearch,
  skuDetailsHandler,
}) => {
  const arrowKeyNavigationHandler = (e) => {
    const { list, cursor } = suggestions;
    if (e.keyCode === 38 && cursor > 0) {
        
      setSuggestions((prevState) => ({
        ...prevState,
        cursor: prevState.cursor - 1,
      }));
    } else if (e.keyCode === 40 && cursor < list.length - 1) {
      
      setSuggestions((prevState) => ({
        ...prevState,
        cursor: prevState.cursor + 1,
      }));
    }
  };

  const keyPressHandler = ({ key }) => {
    const firstSuggestion = suggestions.list[0];
    if (
      key === "Enter" &&
      firstSuggestion
    ) {
      setSearch("");
      setSuggestions({
        list: [],
        cursor: 0,
      });
      let suggestion;
      if (!suggestions.cursor) {
        suggestion = firstSuggestion.sku_name;
      } else {
        suggestion = suggestions.list[suggestions.cursor].sku_name;
      }
      setSearch(suggestion);
    }
  };

  return (
    <div className="search">
      <input
        id="input"
        type="text"
        placeholder="Search here..."
        defaultValue={search}
        onChange={searchHandler}
        onKeyPress={(e) => {
          keyPressHandler(e);
          skuDetailsHandler(suggestions.cursor);
        }}
        onKeyDown={arrowKeyNavigationHandler}
      />
    </div>
  );
};

export default Search;
