import SkuDetailRow from "./SkuDetailRow";

import "./SKUDetails.css";

const SKUDetails = ({ currentSKU }) => {
  return (
    <div className="searchDetails">
      {!currentSKU ? (
        <p>No details.</p>
      ) : (
        <>
          <SkuDetailRow label="Name" data={currentSKU.sku_name} />
          <SkuDetailRow label="Code" data={currentSKU.product_code} />
          <SkuDetailRow label="barcode" data={currentSKU.barcode} />
          <SkuDetailRow label="Stock in" data={currentSKU.stock_in} />
          <SkuDetailRow label="Stock out" data={currentSKU.stock_out} />
          <SkuDetailRow label="Stock on hand" data={currentSKU.stock_on_hand} />
          <SkuDetailRow
            label="Stock reserved"
            data={currentSKU.stock_reserved}
          />
          <SkuDetailRow
            label="Stock available"
            data={currentSKU.stock_available}
          />
        </>
      )}
    </div>
  );
};

export default SKUDetails;
