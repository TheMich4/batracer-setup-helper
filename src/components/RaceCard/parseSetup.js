// TODO FIX IT = WORKS BUT LOOKS SHIT
const parseSetup = (_setup) => {
  const setup = _setup.split("\n");

  const values = setup.filter((line) => line.startsWith("lo:") || line.startsWith("Spot"));

  if (values.length !== 12) {
    return false;
  }

  const test = values.map((value) => {
    if (value.startsWith("Spot")) {
      const x = value.split(": ")[1];
      return { low: x, high: x };
    }

    const splitValue = value.split(":");
    const low = splitValue[1].split(" ")[0];
    const high = splitValue[2];

    return { low, high };
  });

  return test;
};

export default parseSetup;
