// import { mount } from "cypress/react18";
import ProductDetails from "components/ProductDetails";

const props = {
  amount: 50,
  itemData: {
    variations: [{
      itemVariationData: {
        name: "Small"
      }
    }]
  },
  quantity: 1000,
  setQuantity: () => {},
  data: undefined,
  handleSelectChange: () => {},
  selectedVariation: [],
  handleBuyNow: () => {},
  handleAddToCart: () => {},
  isProductInCart: () => {}
};

describe("<Stepper>", () => {
  it("mounts", () => {
    // cy.mount(

    //   <ProductDetails props={props}/>
    // );
    
  });
});
