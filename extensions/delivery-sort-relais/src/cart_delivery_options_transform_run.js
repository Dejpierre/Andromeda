// @ts-check

const NO_CHANGES = { operations: [] };

/**
 * @param {import("../generated/api").CartDeliveryOptionsTransformRunInput} input
 * @returns {import("../generated/api").CartDeliveryOptionsTransformRunResult}
 */
export function cartDeliveryOptionsTransformRun(input) {
  const operations = [];

  for (const group of input.cart.deliveryGroups) {
    const relaisIdx = group.deliveryOptions.findIndex(({ title }) =>
      /relais|mondial/i.test(title ?? '')
    );

    if (relaisIdx > 0) {
      operations.push({
        move: {
          deliveryOptionHandle: group.deliveryOptions[relaisIdx].handle,
          index: 0,
        },
      });
    }
  }

  return operations.length ? { operations } : NO_CHANGES;
}
