import SkuSearch from "./components/SkuSearch";

const API_URL =
  "https://toro278.us-east.toroserver.com/api/demo_api_inventory/1.0/sku/search?sku_name=";

function App() {
  return (
    <div className="App" >
      <SkuSearch url={API_URL}  />
    </div>
  );
}

export default App;
