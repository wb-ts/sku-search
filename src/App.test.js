import React from "react";
import { request } from "https";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import App from "./App";
import SearchBox from "./components/SearchBox";
import { listForSimple, SKUDetail } from "./list";
import SKUDetails from "./components/SKUDetails";
import Suggestions from "./components/Suggestions";

let container = null;
const url =
  "https://toro278.us-east.toroserver.com/api/demo_api_inventory/1.0/sku/search?sku_name=a";
const suggestions = {
  list: [],
  cursor: null,
};

export const getList = async (name) => {
  const jsonRes = await fetch(
    `https://toro278.us-east.toroserver.com/api/demo_api_inventory/1.0/sku/search?sku_name=${name}`
  );
  const { sku } = await jsonRes.json();
  return sku;
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("Rendering App", () => {
  act(() => {
    render(<App url={url} />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"App\\">
      <div class=\\"wrapper\\">
        <div class=\\"searchBox\\">
          <div class=\\"search\\"><input id=\\"input\\" type=\\"text\\" placeholder=\\"Search here...\\" value=\\"\\"></div>
          <ul class=\\"suggestions\\">
            <p>Search</p>
          </ul>
        </div>
        <div class=\\"searchDetails\\">
          <p>No details.</p>
        </div>
      </div>
    </div>"
  `); /* ... gets filled automatically by jest ... */
});
it("Display a list of SKU names", async () => {
  const data = await getList("a");
  console.log("###################### Search Result for 'a' ##########################");
  console.log(data);
  const suggestions = {
    list: data,
    cursor: null,
  };
  act(() => {
    render(<SearchBox search="a" suggestions={suggestions} />, container);
  });
  expect(suggestions.list).toEqual(listForSimple);
});
it("Display Details for selected list", async () => {
  const data = await getList("Tape measure  8m");
  console.log("###################### Search Result for 'Tape measure  8m' ##########################");
  console.log(data);
  const currentSKUDetail = data ;
  act(() => {
    render(<SKUDetails currentSKU={currentSKUDetail} />, container);
  });
  expect(currentSKUDetail).toEqual(SKUDetail);
});
