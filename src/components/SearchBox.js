import { bool, string, object, func } from "prop-types";

import Search from "./Search";
import Suggestions from "./Suggestions";

import "./SearchBox.css";

const SearchBox = ({
  loading,
  search,
  suggestions,
  searchHandler,
  setSuggestions,
  setSearch,
  skuDetailsHandler,
}) => {
  return (
    <div className="searchBox">
      <Search
        search={search}
        searchHandler={searchHandler}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        setSearch={setSearch}
        skuDetailsHandler={skuDetailsHandler}
      />
      <Suggestions
        loading={loading}
        suggestions={suggestions}
        search={search}
        skuDetailsHandler={skuDetailsHandler}
      />
    </div>
  );
};

SearchBox.propTypes = {
  loading: bool,
  search: string,
  suggestions: object,
  searchHandler: func,
  suggestionSelectHandler: func,
  setSuggestions: func,
  setSearch: func,
  skuDetailsHandler: func,
};

SearchBox.defaultProps = {
  loading: false,
  search: "",
};

export default SearchBox;
