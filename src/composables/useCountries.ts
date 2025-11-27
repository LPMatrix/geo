export interface Country {
  name: string
  capital: string
  code: string
  continent: string
  population?: number
  area?: number
}

export const countriesData: Country[] = [
  // Europe
  { name: 'France', capital: 'Paris', code: 'FR', continent: 'Europe', population: 67390000, area: 551695 },
  { name: 'Germany', capital: 'Berlin', code: 'DE', continent: 'Europe', population: 83240000, area: 357022 },
  { name: 'Italy', capital: 'Rome', code: 'IT', continent: 'Europe', population: 59550000, area: 301340 },
  { name: 'Spain', capital: 'Madrid', code: 'ES', continent: 'Europe', population: 47350000, area: 505990 },
  { name: 'United Kingdom', capital: 'London', code: 'GB', continent: 'Europe', population: 67530000, area: 243610 },
  { name: 'Poland', capital: 'Warsaw', code: 'PL', continent: 'Europe', population: 37970000, area: 312679 },
  { name: 'Netherlands', capital: 'Amsterdam', code: 'NL', continent: 'Europe', population: 17440000, area: 41850 },
  { name: 'Belgium', capital: 'Brussels', code: 'BE', continent: 'Europe', population: 11590000, area: 30528 },
  { name: 'Greece', capital: 'Athens', code: 'GR', continent: 'Europe', population: 10720000, area: 131957 },
  { name: 'Portugal', capital: 'Lisbon', code: 'PT', continent: 'Europe', population: 10290000, area: 92090 },
  { name: 'Sweden', capital: 'Stockholm', code: 'SE', continent: 'Europe', population: 10380000, area: 450295 },
  { name: 'Norway', capital: 'Oslo', code: 'NO', continent: 'Europe', population: 5421000, area: 385207 },
  { name: 'Austria', capital: 'Vienna', code: 'AT', continent: 'Europe', population: 9006000, area: 83871 },
  { name: 'Switzerland', capital: 'Bern', code: 'CH', continent: 'Europe', population: 8655000, area: 41285 },
  { name: 'Denmark', capital: 'Copenhagen', code: 'DK', continent: 'Europe', population: 5831000, area: 43094 },
  { name: 'Finland', capital: 'Helsinki', code: 'FI', continent: 'Europe', population: 5541000, area: 338424 },
  { name: 'Ireland', capital: 'Dublin', code: 'IE', continent: 'Europe', population: 4996000, area: 70273 },
  { name: 'Czech Republic', capital: 'Prague', code: 'CZ', continent: 'Europe', population: 10700000, area: 78867 },
  { name: 'Hungary', capital: 'Budapest', code: 'HU', continent: 'Europe', population: 9722000, area: 93028 },
  { name: 'Romania', capital: 'Bucharest', code: 'RO', continent: 'Europe', population: 19240000, area: 238397 },

  // Asia
  { name: 'China', capital: 'Beijing', code: 'CN', continent: 'Asia', population: 1412000000, area: 9596961 },
  { name: 'India', capital: 'New Delhi', code: 'IN', continent: 'Asia', population: 1380000000, area: 3287263 },
  { name: 'Japan', capital: 'Tokyo', code: 'JP', continent: 'Asia', population: 125800000, area: 377975 },
  { name: 'South Korea', capital: 'Seoul', code: 'KR', continent: 'Asia', population: 5174000, area: 100210 },
  { name: 'Thailand', capital: 'Bangkok', code: 'TH', continent: 'Asia', population: 69800000, area: 513120 },
  { name: 'Vietnam', capital: 'Hanoi', code: 'VN', continent: 'Asia', population: 97340000, area: 331212 },
  { name: 'Indonesia', capital: 'Jakarta', code: 'ID', continent: 'Asia', population: 273500000, area: 1904569 },
  { name: 'Malaysia', capital: 'Kuala Lumpur', code: 'MY', continent: 'Asia', population: 32780000, area: 329847 },
  { name: 'Philippines', capital: 'Manila', code: 'PH', continent: 'Asia', population: 109600000, area: 300000 },
  { name: 'Singapore', capital: 'Singapore', code: 'SG', continent: 'Asia', population: 5850000, area: 719 },
  { name: 'Pakistan', capital: 'Islamabad', code: 'PK', continent: 'Asia', population: 225200000, area: 881913 },
  { name: 'Bangladesh', capital: 'Dhaka', code: 'BD', continent: 'Asia', population: 166300000, area: 147570 },
  { name: 'Sri Lanka', capital: 'Sri Jayawardenepura Kotte', code: 'LK', continent: 'Asia', population: 21800000, area: 65610 },
  { name: 'Nepal', capital: 'Kathmandu', code: 'NP', continent: 'Asia', population: 29140000, area: 147516 },
  { name: 'Myanmar', capital: 'Naypyidaw', code: 'MM', continent: 'Asia', population: 54410000, area: 676578 },
  { name: 'Cambodia', capital: 'Phnom Penh', code: 'KH', continent: 'Asia', population: 16710000, area: 181035 },
  { name: 'Laos', capital: 'Vientiane', code: 'LA', continent: 'Asia', population: 7276000, area: 236800 },
  { name: 'Mongolia', capital: 'Ulaanbaatar', code: 'MN', continent: 'Asia', population: 3279000, area: 1564110 },
  { name: 'Kazakhstan', capital: 'Astana', code: 'KZ', continent: 'Asia', population: 18990000, area: 2724900 },
  { name: 'Uzbekistan', capital: 'Tashkent', code: 'UZ', continent: 'Asia', population: 34920000, area: 447400 },

  // North America
  { name: 'United States', capital: 'Washington, D.C.', code: 'US', continent: 'North America', population: 331900000, area: 9833517 },
  { name: 'Canada', capital: 'Ottawa', code: 'CA', continent: 'North America', population: 38250000, area: 9984670 },
  { name: 'Mexico', capital: 'Mexico City', code: 'MX', continent: 'North America', population: 128900000, area: 1964375 },
  { name: 'Guatemala', capital: 'Guatemala City', code: 'GT', continent: 'North America', population: 17920000, area: 108889 },
  { name: 'Cuba', capital: 'Havana', code: 'CU', continent: 'North America', population: 11330000, area: 109884 },
  { name: 'Haiti', capital: 'Port-au-Prince', code: 'HT', continent: 'North America', population: 11400000, area: 27750 },
  { name: 'Dominican Republic', capital: 'Santo Domingo', code: 'DO', continent: 'North America', population: 10850000, area: 48671 },
  { name: 'Honduras', capital: 'Tegucigalpa', code: 'HN', continent: 'North America', population: 10120000, area: 112090 },
  { name: 'Nicaragua', capital: 'Managua', code: 'NI', continent: 'North America', population: 6779000, area: 130370 },
  { name: 'Costa Rica', capital: 'San José', code: 'CR', continent: 'North America', population: 5134000, area: 51100 },
  { name: 'Panama', capital: 'Panama City', code: 'PA', continent: 'North America', population: 4329000, area: 75420 },
  { name: 'Jamaica', capital: 'Kingston', code: 'JM', continent: 'North America', population: 2961000, area: 10991 },
  { name: 'Trinidad and Tobago', capital: 'Port of Spain', code: 'TT', continent: 'North America', population: 1404000, area: 5128 },
  { name: 'Bahamas', capital: 'Nassau', code: 'BS', continent: 'North America', population: 393000, area: 13943 },
  { name: 'Belize', capital: 'Belmopan', code: 'BZ', continent: 'North America', population: 398000, area: 22966 },
  { name: 'Barbados', capital: 'Bridgetown', code: 'BB', continent: 'North America', population: 287000, area: 430 },
  { name: 'Saint Lucia', capital: 'Castries', code: 'LC', continent: 'North America', population: 184000, area: 616 },
  { name: 'Grenada', capital: "Saint George's", code: 'GD', continent: 'North America', population: 113000, area: 344 },

  // South America
  { name: 'Brazil', capital: 'Brasília', code: 'BR', continent: 'South America', population: 215300000, area: 8515767 },
  { name: 'Argentina', capital: 'Buenos Aires', code: 'AR', continent: 'South America', population: 45810000, area: 2780400 },
  { name: 'Colombia', capital: 'Bogotá', code: 'CO', continent: 'South America', population: 51030000, area: 1141748 },
  { name: 'Peru', capital: 'Lima', code: 'PE', continent: 'South America', population: 33470000, area: 1285216 },
  { name: 'Venezuela', capital: 'Caracas', code: 'VE', continent: 'South America', population: 28440000, area: 912050 },
  { name: 'Chile', capital: 'Santiago', code: 'CL', continent: 'South America', population: 19120000, area: 756096 },
  { name: 'Ecuador', capital: 'Quito', code: 'EC', continent: 'South America', population: 17790000, area: 283561 },
  { name: 'Bolivia', capital: 'Sucre', code: 'BO', continent: 'South America', population: 11830000, area: 1098581 },
  { name: 'Paraguay', capital: 'Asunción', code: 'PY', continent: 'South America', population: 6725000, area: 406752 },
  { name: 'Uruguay', capital: 'Montevideo', code: 'UY', continent: 'South America', population: 3519000, area: 176215 },
  { name: 'Guyana', capital: 'Georgetown', code: 'GY', continent: 'South America', population: 787000, area: 214969 },
  { name: 'Suriname', capital: 'Paramaribo', code: 'SR', continent: 'South America', population: 591000, area: 163820 },

  // Africa
  { name: 'Nigeria', capital: 'Abuja', code: 'NG', continent: 'Africa', population: 218500000, area: 923768 },
  { name: 'Ethiopia', capital: 'Addis Ababa', code: 'ET', continent: 'Africa', population: 117900000, area: 1104300 },
  { name: 'Egypt', capital: 'Cairo', code: 'EG', continent: 'Africa', population: 104300000, area: 1002450 },
  { name: 'South Africa', capital: 'Cape Town', code: 'ZA', continent: 'Africa', population: 60400000, area: 1221037 },
  { name: 'Kenya', capital: 'Nairobi', code: 'KE', continent: 'Africa', population: 54030000, area: 580367 },
  { name: 'Uganda', capital: 'Kampala', code: 'UG', continent: 'Africa', population: 47120000, area: 241038 },
  { name: 'Algeria', capital: 'Algiers', code: 'DZ', continent: 'Africa', population: 44620000, area: 2381741 },
  { name: 'Sudan', capital: 'Khartoum', code: 'SD', continent: 'Africa', population: 44920000, area: 1861484 },
  { name: 'Morocco', capital: 'Rabat', code: 'MA', continent: 'Africa', population: 37370000, area: 446550 },
  { name: 'Angola', capital: 'Luanda', code: 'AO', continent: 'Africa', population: 33430000, area: 1246700 },
  { name: 'Ghana', capital: 'Accra', code: 'GH', continent: 'Africa', population: 32830000, area: 238533 },
  { name: 'Mozambique', capital: 'Maputo', code: 'MZ', continent: 'Africa', population: 32080000, area: 801590 },
  { name: 'Madagascar', capital: 'Antananarivo', code: 'MG', continent: 'Africa', population: 28420000, area: 587041 },
  { name: 'Cameroon', capital: 'Yaoundé', code: 'CM', continent: 'Africa', population: 27920000, area: 475442 },
  { name: 'Ivory Coast', capital: 'Yamoussoukro', code: 'CI', continent: 'Africa', population: 27050000, area: 322463 },
  { name: 'Niger', capital: 'Niamey', code: 'NE', continent: 'Africa', population: 25200000, area: 1267000 },
  { name: 'Burkina Faso', capital: 'Ouagadougou', code: 'BF', continent: 'Africa', population: 22100000, area: 274200 },
  { name: 'Mali', capital: 'Bamako', code: 'ML', continent: 'Africa', population: 21300000, area: 1240192 },
  { name: 'Malawi', capital: 'Lilongwe', code: 'MW', continent: 'Africa', population: 20180000, area: 118484 },
  { name: 'Zambia', capital: 'Lusaka', code: 'ZM', continent: 'Africa', population: 18920000, area: 752618 },

  // Oceania
  { name: 'Australia', capital: 'Canberra', code: 'AU', continent: 'Oceania', population: 25700000, area: 7692024 },
  { name: 'Papua New Guinea', capital: 'Port Moresby', code: 'PG', continent: 'Oceania', population: 9119000, area: 462840 },
  { name: 'New Zealand', capital: 'Wellington', code: 'NZ', continent: 'Oceania', population: 5124000, area: 268838 },
  { name: 'Fiji', capital: 'Suva', code: 'FJ', continent: 'Oceania', population: 902000, area: 18274 },
  { name: 'Solomon Islands', capital: 'Honiara', code: 'SB', continent: 'Oceania', population: 707000, area: 28896 },
  { name: 'Vanuatu', capital: 'Port Vila', code: 'VU', continent: 'Oceania', population: 312000, area: 12189 },
  { name: 'Samoa', capital: 'Apia', code: 'WS', continent: 'Oceania', population: 202000, area: 2831 },
  { name: 'Micronesia', capital: 'Palikir', code: 'FM', continent: 'Oceania', population: 116000, area: 702 },
  { name: 'Tonga', capital: "Nuku'alofa", code: 'TO', continent: 'Oceania', population: 106000, area: 747 },
  { name: 'Kiribati', capital: 'Tarawa', code: 'KI', continent: 'Oceania', population: 121000, area: 811 }
]

export const getCountriesByContinent = (continent: string): Country[] => {
  return countriesData.filter(country => country.continent === continent)
}

export const getRandomCountries = (count: number): Country[] => {
  const shuffled = [...countriesData].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const getCountryByName = (name: string): Country | undefined => {
  return countriesData.find(country => 
    country.name.toLowerCase() === name.toLowerCase()
  )
}

export const getCountryByCapital = (capital: string): Country | undefined => {
  return countriesData.find(country => 
    country.capital.toLowerCase() === capital.toLowerCase()
  )
}

export const getContinents = (): string[] => {
  return [...new Set(countriesData.map(country => country.continent))]
}