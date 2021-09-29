import Loader from "./Loader";
// import {List} from "react-window";
import { useEffect } from "react";
import "./Suggestions.css";

const Suggestions = ({
  suggestions,
  search,
  loading,
  skuDetailsHandler,
}) => {

  return( loading ? (
    <Loader />
  ) : (
    <ul className="suggestions">
      {suggestions.list.length
        ? suggestions.list.map(({ sku_id, sku_name }, index) => (
            <li
              key={sku_id}
              
              onClick={() => {
                skuDetailsHandler(index);
              }}
              
              className={`list-item ${suggestions.cursor === index ? "active" : ""}`}
            >
              {sku_name}
            </li>
          ))
        : !search ? <p>Search</p> : <p>No Results fot that!</p>}

    </ul>
  )
  )
};

export default Suggestions;
