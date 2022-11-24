const neededContainerCases = [3, 10, 10];
const cases = [
  [
    {
      name: "Container renter A",
      container: 1,
      totalCost: 1,
    },
    {
      name: "Container renter B",
      container: 2,
      totalCost: 1,
    },
    {
      name: "Container renter C",
      container: 3,
      totalCost: 3,
    },
  ],
  [
    {
      name: "Container renter A",
      container: 5,
      totalCost: 5,
    },
    {
      name: "Container renter B",
      container: 2,
      totalCost: 10,
    },
    {
      name: "Container renter C",
      container: 2,
      totalCost: 3,
    },
  ],
  [
    {
      name: "Container renter A",
      container: 5,
      totalCost: 5,
    },
    {
      name: "Container renter B",
      container: 2,
      totalCost: 10,
    },
    {
      name: "Container renter C",
      container: 10,
      totalCost: 3,
    },
  ],
];

function comparePricePerOneContainer(currentOwner, nextOwner) {
  return currentOwner.costPerOne - nextOwner.costPerOne;
}

function consoleLogResult(result, neededContainer) {
  let totalCost = result.reduce((total, owner) => total + owner.totalCost, 0);
  result.forEach((owner) => {
    console.log(
      `[Contact with] ${owner.name} ${owner.container} container, price: ${owner.totalCost}`
    );
    neededContainer -= owner.container;
  });
  if (neededContainer !== 0) {
    console.log("Not enough containers");
  }
  console.log(`[Summary] total cost ${totalCost}`);
}

function rentContainer(neededContainer, listings) {
  const result = [];
  // Add cost per one container property
  listings.forEach((owner) => {
    owner.costPerOne = owner.totalCost / owner.container;
  });
  // Sort from the smallest to the biggest
  listings.sort(comparePricePerOneContainer);
  for (let index = 0; index < listings.length; index++) {
    if (listings[index].container >= neededContainer) {
      listings[index].container = neededContainer;
      listings[index].totalCost = neededContainer * listings[index].costPerOne;
      result.push(listings[index]);
      return result;
    }
    result.push(listings[index]);
    neededContainer -= listings[index].container;
  }
  return result;
}
consoleLogResult(
  rentContainer(neededContainerCases[0], cases[0]),
  neededContainerCases[0]
);
