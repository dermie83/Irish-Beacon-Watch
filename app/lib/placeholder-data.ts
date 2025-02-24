// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

const date = new Date().toISOString();
console.log("Date....",date)
const lighthouses = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Hook',
    latitude: 52.1237486,
    longitude: -6.9319432,
    towerHeight: 35,
    lightHeight: 46,
    range: 23,
    greatLighthouse: true,
    constructed: '1172-01-01',
    currentDate: date,
  },
  {
    id: '410544b8-4001-4271-9855-fec4b6a6442a',
    name: 'Muglins',
    latitude: 53.281456,
    longitude: -6.1500728,
    towerHeight: 9,
    lightHeight: 14,
    range: 11,
    greatLighthouse: false,
    constructed: '1880-01-01',
    currentDate: date,
  },
  {
    id: '410544b6-4001-4271-9855-fec4b6a6442a',
    name: 'Blackrock',
    latitude: 53.581456,
    longitude: -6.1500728,
    towerHeight: 15,
    lightHeight: 18,
    range: 20,
    greatLighthouse: false,
    constructed: '1912-01-01',
    currentDate: date,
  },
];

export {lighthouses};