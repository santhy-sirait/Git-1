const environmentFactors = {
    sun: "low",
    wind: "medium"
};

function getYieldForPlant(crop) {
    // Calculate the yield of a single plant
    let total_yield = crop.yield;

    for (const factor in environmentFactors) {
        if (crop.factor.hasOwnProperty(factor)) {
            total_yield *= (1 + crop.factor[factor][environmentFactors[factor]] / 100);
        }
    }

    return total_yield;
}
    
function getYieldForCrop(input) {
    // Calculate the yield of a crop by multiplying the number of plants by the yield per plant

    return getYieldForPlant(input.crop, environmentFactors) * input.numCrops;
}
  
function getTotalYield(obj) {
    // Calculate the total yield for a group of crops by iterating over the crops and adding their individual yields
    let total_yield = 0;

    for (const crop of obj.crops) {
        total_yield += getYieldForCrop(crop, environmentFactors);
    }

    return total_yield;
}
  
function getCostsForCrop(input) {
    // Calculate the costs for a crop by multiplying the number of plants by the cost per plant

    return input.crop.cost * input.numCrops;
}

function getRevenueForCrop(input) {
    // Calculate the revenue for a crop by multiplying the yield by the sale price

    return input.crop.yield * input.numCrops * input.crop.sale_price;
}

function getProfitForCrop(input) {
    // Calculate the profit for a crop by subtracting the costs from the revenue

    return getRevenueForCrop(input) - (input.crop.cost * input.numCrops);
}

function getTotalProfit(crops) {
    // Calculate the total profit for a group of crops by iterating over the crops and adding their individual profits
    let totalProfit = 0;

    for (const crop of crops) {
        totalProfit += getProfitForCrop(crop);
    }

    return totalProfit;
}



describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
        }
    };

    test("Get yield for plant with environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(15);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(15);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                sun: {
                    low: -20,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: 30,
                    high: -60,
                }
            }
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(15.82);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getCostsForCrop", () => {
    test("Calculate costs for crop", () => {
        const corn = {
            name: "corn",
            cost: 10,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        };
        const input = {
            crop: corn,
            numCrops: 5,
        };
        expect(getCostsForCrop(input)).toBe(50);
    });
});

describe("getRevenueForCrop", () => {
    test("Calculate revenue for crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            sale_price: 5,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        };
        const input = {
            crop: corn,
            numCrops: 5,
        };
        expect(getRevenueForCrop(input)).toBe(75);
    });
});

describe("getProfitForCrop", () => {
    test("Calculate profit for crop", () => {
        const corn = {
            name: "corn",
            cost: 10,
            yield: 3,
            sale_price: 5,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        };
        const input = {
            crop: corn,
            numCrops: 5,
        };
        expect(getProfitForCrop(input)).toBe(25);
    });
});

describe("getTotalProfit", () => {
    test("Calculate total profit with multiple crops", () => {
        const corn = {
            name: "corn",
            cost: 10,
            yield: 3,
            sale_price: 5,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        };
        const pumpkin = {
            name: "pumpkin",
            cost: 5,
            yield: 4,
            sale_price: 4,
            factor: {
                sun: {
                    low: -20,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: 30,
                    high: -60,
                }
            }
        };
        const crops = [{ crop: corn, numCrops: 5 }, { crop: pumpkin, numCrops: 2 }];
        expect(getTotalProfit(crops)).toBe(47);
    });
});


