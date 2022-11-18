import {
  getPokemonHeightFt,
  getPokemonHeightMeters,
  getPokemonWeightKg,
  getPokemonWeightLbs,
} from "../utils/pokemon-mesures";

/********************* HEIGHT FUNCTIONS TEST ****************/
//!MOCK DATA HEIGHT TEST
const mockTestHeightData = [
  { input: 11, meters: "1.10m", feets: "3.61ft" },
  { input: 6, meters: "0.60m", feets: "1.97ft" },
];

mockTestHeightData.forEach((data) => {
  test("Height to Meters Conversion Testing", () => {
    let measuresTest = getPokemonHeightMeters(data.input);
    expect(measuresTest).toBe(data.meters);
  });

  test("Height To Feet Conversion Testing", () => {
    let measuresTest = getPokemonHeightFt(data.input);
    expect(measuresTest).toBe(data.feets);
  });
});

/********************* WEIGHT FUNCTIONS TEST ****************/
//!MOCK DATA WEIGHT TEST
const mockTestWeightData = [
  { input: 190, kg: "19.00 kg", lbs: "41.89 lbs" },
  { input: 85, kg: "8.50 kg", lbs: "18.74 lbs" },
];
mockTestWeightData.forEach((data) => {
  test("Height to Meters Conversion Testing", () => {
    let measuresTest = getPokemonWeightKg(data.input);
    expect(measuresTest).toBe(data.kg);
  });

  test("Height To Feet Conversion Testing", () => {
    let measuresTest = getPokemonWeightLbs(data.input);
    expect(measuresTest).toBe(data.lbs);
  });
});