export const weatherConditions = {
  "Bone Dry": 0,
  Greasy: 9,
  Moist: 18,
  Drizzle: 27,
  "Light Rain": 36,
  Rain: 45,
  "Wet and Slippery": 54,
  "Steady Rain": 63,
  "Heavy Rain": 72,
  "Treacherous Rain and Spray": 81,
  Monsoon: 90,
  Storm: 100,
};

export const elements = {
  frontWing: { label: "Front Wing", adjustment: 20 },
  rearWing: { label: "Rear Wing", adjustment: 35 },
  frontSusp: { label: "Front Suspension", adjustment: -20 },
  rearSusp: { label: "Rear Suspension", adjustment: -35 },
  frontArb: { label: "Front Anti-Roll Bar", adjustment: -18 },
  rearArb: { label: "Rear Anti-Roll Bar", adjustment: -30 },
  frontRh: { label: "Front Ride Height", adjustment: -12 },
  rearRh: { label: "Rear Ride Height", adjustment: -13 },
  frontTp: { label: "Front Tire Pressure", adjustment: 10 },
  rearTp: { label: "Rear Tire Pressure", adjustment: 12 },
  gears: { label: "Gears", adjustment: -5 },
  brakeBias: { label: "Brake Bias", adjustment: 15 },
};

export const defaultValues = Object.entries(elements).reduce(
  (values, element) => ({ ...values, [element[0]]: { low: 0, high: 100 } }),
  {}
);

export const defaultSetup = {
  wings: { front: { low: 0, high: 100 }, rear: { low: 0, high: 100 } },
  suspension: { front: { low: 0, high: 100 }, rear: { low: 0, high: 100 } },
  arb: { front: { low: 0, high: 100 }, rear: { low: 0, high: 100 } },
  rideHeight: { front: { low: 0, high: 100 }, rear: { low: 0, high: 100 } },
  tyrePressure: { front: { low: 0, high: 100 }, rear: { low: 0, high: 100 } },
  gears: { gears: { low: 0, high: 100 } },
  brake: { brake: { low: 0, high: 100 } },
};
