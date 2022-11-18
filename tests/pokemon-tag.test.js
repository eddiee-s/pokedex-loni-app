import getPokemonTag from "../utils/pokemon-tag";

/********************* TAG CONVERSION TEST ****************/
/***
 * INPUT can be STRING OR NUMBER in next format --> 3
 * OUTPUT is alwats STRING in next format --> #003
 */
const inputValue = 11;
const outputTestMeters = "#011";

const testData = [
  { inputValue: 1, outputValue: "#001" },
  { inputValue: "1", outputValue: "#001" },
  { inputValue: 5, outputValue: "#005" },
  { inputValue: 41, outputValue: "#041" },
  { inputValue: "89", outputValue: "#089" },
  { inputValue: "3", outputValue: "#003" },
  { inputValue: 981, outputValue: "#981" },
  { inputValue: "774", outputValue: "#774" },
  { inputValue: 23, outputValue: "#023" },
  { inputValue: 60, outputValue: "#060" },
  { inputValue: 359, outputValue: "#359" },
];

testData.forEach((data) => {
  test("Number to # tag Conversion Function test ", () => {
    let measuresTest = getPokemonTag(data.inputValue);
    expect(measuresTest).toBe(data.outputValue);
  });
});