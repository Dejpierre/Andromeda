// extensions/delivery-sort-relais/node_modules/@shopify/shopify_function/run.ts
function run_default(userfunction) {
  try {
    ShopifyFunction;
  } catch (e) {
    throw new Error(
      "ShopifyFunction is not defined. Please rebuild your function using the latest version of Shopify CLI."
    );
  }
  const input_obj = ShopifyFunction.readInput();
  const output_obj = userfunction(input_obj);
  ShopifyFunction.writeOutput(output_obj);
}

// extensions/delivery-sort-relais/src/cart_delivery_options_transform_run.js
var NO_CHANGES = { operations: [] };
function cartDeliveryOptionsTransformRun(input) {
  const operations = [];
  for (const group of input.cart.deliveryGroups) {
    const relaisIdx = group.deliveryOptions.findIndex(
      ({ title }) => /relais|mondial/i.test(title ?? "")
    );
    if (relaisIdx > 0) {
      operations.push({
        move: {
          deliveryOptionHandle: group.deliveryOptions[relaisIdx].handle,
          index: 0
        }
      });
    }
  }
  return operations.length ? { operations } : NO_CHANGES;
}

// <stdin>
function cartDeliveryOptionsTransformRun2() {
  return run_default(cartDeliveryOptionsTransformRun);
}
export {
  cartDeliveryOptionsTransformRun2 as cartDeliveryOptionsTransformRun
};
