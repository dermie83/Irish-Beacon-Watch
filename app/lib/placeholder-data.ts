// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

const date = new Date().toISOString();
// console.log("Date....",date)
const lighthouses = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Hook',
    latitude: 52.1237486,
    longitude: -6.9319432,
    abovewater: 56,
    towerheight: 46,
    range: 23,
    greatlighthouse: true,
    constructed: '1172-01-01',
    currentdate: date,
    image_url: '/lighthouses/hook.jpg',
  },
  {
    id: '410544b8-4001-4271-9855-fec4b6a6442a',
    name: 'Muglins',
    latitude: 53.281456,
    longitude: -6.1500728,
    abovewater: 14,
    towerheight: 14,
    range: 11,
    greatlighthouse: false,
    constructed: '1880-01-01',
    currentdate: date,
    image_url: '/lighthouses/muglins.jpg',
  },
  {
    id: '410544b6-4001-4271-9855-fec4b6a6442a',
    name: 'Blackrock (Mayo)',
    latitude: 54.0671404,
    longitude: -10.3298027,
    abovewater: 11,
    towerheight: 15,
    range: 14,
    greatlighthouse: false,
    constructed: '1882-01-01',
    currentdate: date,
    image_url: '/lighthouses/blackrock (mayo).jpg',
  },
  {
    id: '410544b6-4001-4271-9855-fec4b6a6542a',
    name: 'Achillbeg',
    latitude: 53.8670819,
    longitude: -9.951644,
    abovewater: 56,
    towerheight: 9,
    range: 11,
    greatlighthouse: false,
    constructed: '1913-01-01',
    currentdate: date,
    image_url: '/lighthouses/achillbeg.jpg',
  },
  {
    id: '410544b6-4001-4271-9856-fec4b6a6542a',
    name: 'Aranmore',
    latitude: 54.9956698,
    longitude: -8.5689206,
    abovewater: 71,
    towerheight: 23,
    range: 18,
    greatlighthouse: false,
    constructed: '1914-01-01',
    currentdate: date,
    image_url: '/lighthouses/aranmore.jpg',
  },
  {
    id: '410544b6-4001-4273-9856-fec4b6a6542a',
    name: 'Ardnakinna',
    latitude: 51.6185016,
    longitude: -9.9206617,
    abovewater: 62,
    towerheight: 20,
    range: 9,
    greatlighthouse: false,
    constructed: '1915-01-01',
    currentdate: date,
    image_url: '/lighthouses/ardnakinna.jpg',
  },
  {
    id: '410544b6-4001-4272-9756-fec4b6a6542a',
    name: 'Baily',
    latitude: 53.3616564,
    longitude: -6.0547587,
    abovewater: 41,
    towerheight: 13,
    range: 18,
    greatlighthouse: false,
    constructed: '1916-01-01',
    currentdate: date,
    image_url: '/lighthouses/baily.jpg',
  },
  {
    id: '417544b6-4001-4272-9756-fec4b6a6542a',
    name: 'Ballagh Rocks',
    latitude: 54.9993383,
    longitude: -8.4832241,
    abovewater: 13,
    towerheight: 10,
    range: 5,
    greatlighthouse: false,
    constructed: '1901-01-01',
    currentdate: date,
    image_url: '/lighthouses/ballagh rocks.jpg',
  },
  {
    id: '417544b6-5001-4272-9756-fec4b6a6542a',
    name: 'Ballinacourty',
    latitude: 52.0854834,
    longitude: -7.5700418,
    abovewater: 16,
    towerheight: 13,
    range: 8,
    greatlighthouse: false,
    constructed: '1901-01-01',
    currentdate: date,
    image_url: '/lighthouses/ballinacourty.jpg',
  },
  {
    id: '417544b6-5001-4272-9796-fec4b6a6542a',
    name: 'Ballycotton',
    latitude: 51.8257562,
    longitude: -7.988996,
    abovewater: 59,
    towerheight: 15,
    range: 14,
    greatlighthouse: false,
    constructed: '1900-01-01',
    currentdate: date,
    image_url: '/lighthouses/ballycotton.jpg',
  },
  {
    id: '417544b6-5011-4272-9796-fec4b6a6542a',
    name: 'Blackhead (Antrim)',
    latitude: 54.7669073,
    longitude: -5.6916006,
    abovewater: 45,
    towerheight: 16,
    range: 27,
    greatlighthouse: false,
    constructed: '1845-01-01',
    currentdate: date,
    image_url: '/lighthouses/blackhead (antrim).jpg',
  },
  {
    id: '417544b6-5011-4232-9796-fec4b6a6542a',
    name: 'Blackhead (Clare)',
    latitude: 53.1539097,
    longitude: -9.2676088,
    abovewater: 20,
    towerheight: 8,
    range: 8,
    greatlighthouse: false,
    constructed: '1745-01-01',
    currentdate: date,
    image_url: '/lighthouses/blackhead (clare).jpg',
  },
  {
    id: '417544b6-5311-4232-9796-fec4b6a6542a',
    name: 'Blackhorse Rocks Beacon',
    latitude: 52.6631704,
    longitude: -8.9326418,
    abovewater: 1,
    towerheight: 9,
    range: 5,
    greatlighthouse: false,
    constructed: '1800-01-01',
    currentdate: date,

    image_url: '/lighthouses/Horse Rock 1905.jpg',
  },
  {
    id: '417544b6-5311-8232-9796-fec4b6a6542a',
    name: 'Blackrock (Sligo)',
    latitude: 54.3065999,
    longitude: -8.6517151,
    abovewater: 24,
    towerheight: 25,
    range: 10,
    greatlighthouse: false,
    constructed: '1850-01-01',
    currentdate: date,
    image_url: '/lighthouses/blackrock (sligo).jpg',
  },
  {
    id: '417544b6-5300-8232-9796-fec4b6a6542a',
    name: 'Blacksod',
    latitude: 54.1009294,
    longitude: -11.3790751,
    abovewater: 13,
    towerheight: 12,
    range: 9,
    greatlighthouse: false,
    constructed: '1831-01-01',
    currentdate: date,
    image_url: '/lighthouses/blacksod.jpg',
  },
  {
    id: '417544b6-5311-8232-9296-fec4b6a6542a',
    name: 'Broadhaven',
    latitude: 54.2683101,
    longitude: -10.5478491,
    abovewater: 27,
    towerheight: 15,
    range: 12,
    greatlighthouse: false,
    constructed: '1788-01-01',
    currentdate: date,
    image_url: '/lighthouses/broadhaven.jpg',
  },
  {
    id: '417544b6-5322-8232-9296-fec4b6a6542a',
    name: 'Bull Rock',
    latitude: 51.5919437,
    longitude: -10.9481086,
    abovewater: 70,
    towerheight: 4,
    range: 18,
    greatlighthouse: false,
    constructed: '1889-01-01',
    currentdate: date,
    image_url: '/lighthouses/bull rock.jpg',
  },
  {
    id: '417544b6-5322-3332-9216-fec4b6a6542a',
    name: 'Buncrana',
    latitude: 55.1265883,
    longitude: -7.4669514,
    abovewater: 2,
    towerheight: 7,
    range: 10,
    greatlighthouse: false,
    constructed: '1887-01-01',
    currentdate: date,
    image_url: '/lighthouses/buncrana.jpg',
  },
];

export {lighthouses};