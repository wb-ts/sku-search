import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _debounce from 'lodash/debounce';
import SearchBox from "./SearchBox";
import SKUDetails from "./SKUDetails";

const SkuSearch = ({ url }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState({
    list: [],
    cursor: null,
  });
  const [currentSKU, setCurrentSKU] = useState(null);
  const [loading, setLoading] = useState(false);
  var setTimeout;

  useEffect(() => {
    debounceFun();
    return debounceFun.cancel;
  }, [search])
  useEffect(() => {
    setCurrentSKU(suggestions.list[suggestions.cursor]);
  }, [suggestions.cursor]);

  const loadData = async () => {
    if (!search) {
      setSuggestions({
        ...suggestions,
        list: [],
        cursor:null,
      });
      return
    }
    else {
      setLoading(true);
      const jsonRes = await fetch(`${url}${search}`);
      const { sku } = await jsonRes.json();
      setLoading(false);
      if( ! sku ){
        setSuggestions({
          ...suggestions,
          list: [],
          cursor:null,
        });
      }
      
      setSuggestions({
        ...suggestions,
        list: sku,
      });
    }
    
  };
  const debounceFun = _debounce(loadData, 500);

  const searchHandler = (e) => {
    // e.persist();
    const value = e.target.value;
    setSearch(value);
  };
  
  const skuDetailsHandler = (index) => {
    console.log("index: ", index, suggestions.list[index]);
    setSuggestions({
      ...suggestions,
      cursor: index,
    })    
  };

  return (
    <div className="wrapper">
      <SearchBox
        loading={loading}
        search={search}
        suggestions={suggestions}
        searchHandler={searchHandler}
        setSuggestions={setSuggestions}
        setSearch={setSearch}
        skuDetailsHandler={skuDetailsHandler}
      />
      <SKUDetails currentSKU={currentSKU} />
    </div>
  );
};

SkuSearch.propTypes = {
  url: PropTypes.string,
};

SkuSearch.defaultProps = {
  url: "",
};

export default SkuSearch;
