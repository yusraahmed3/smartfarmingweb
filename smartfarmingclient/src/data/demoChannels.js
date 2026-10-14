
const makeReadings = (values) =>
  values.map((value, index) => ({
    value,
    date: Math.floor(
      (Date.now() - (values.length - 1 - index) * 3600000) / 1000
    ),
  }));

export const demoChannels = [
  {
    id: "demo-greenhouse",
    name: "Greenhouse A",
    fieldName1: "Temperature",
    fieldName2: "Humidity",
    fieldName3: "Soil Moisture",
    fieldValue1: makeReadings([22, 23, 24, 23, 25, 24, 24.5]),
    fieldValue2: makeReadings([62, 64, 65, 63, 66, 67, 68]),
    fieldValue3: makeReadings([450, 440, 435, 430, 425, 420, 420]),
  },
  {
    id: "demo-field",
    name: "Open Field B",
    fieldName1: "Temperature",
    fieldName2: "Humidity",
    fieldName3: "Soil Moisture",
    fieldValue1: makeReadings([25, 26, 27, 29, 30, 31, 32]),
    fieldValue2: makeReadings([51, 53, 50, 48, 47, 46, 45]),
    fieldValue3: makeReadings([650, 670, 700, 720, 750, 780, 800]),
  },
  {
    id: "demo-nursery",
    name: "Nursery C",
    fieldName1: "Temperature",
    fieldName2: "Humidity",
    fieldName3: "Soil Moisture",
    fieldValue1: makeReadings([20, 21, 22, 21, 23, 22, 22]),
    fieldValue2: makeReadings([70, 72, 73, 74, 72, 71, 72]),
    fieldValue3: makeReadings([300, 310, 320, 315, 305, 300, 295]),
  },
];
