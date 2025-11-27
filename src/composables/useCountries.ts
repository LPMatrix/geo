export interface Country {
  name: string
  capital: string
  code: string
  continent: string
  population?: number
  area?: number
}

let countriesData: Country[] = seedCountries as Country[]

const STORAGE_KEY = 'countriesData_v1'

const normalizeRegion = (region: string): string => {
  if (!region) return 'Other'
  if (region === 'Americas') return 'North America'
  return region
}

export const preloadCountries = async (): Promise<number> => {
  try {
    const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (cached) {
      const data = JSON.parse(cached) as Country[]
      if (Array.isArray(data) && data.length > countriesData.length) {
        countriesData = data
        return countriesData.length
      }
    }

    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,cca2,region,population,area')
    if (!res.ok) return countriesData.length
    const json = await res.json()
    const fetched: Country[] = (json || [])
      .map((c: any) => {
        const capital = Array.isArray(c.capital) && c.capital.length > 0 ? String(c.capital[0]) : ''
        const name = c?.name?.common ? String(c.name.common) : ''
        const code = c?.cca2 ? String(c.cca2).toUpperCase() : ''
        const continent = normalizeRegion(String(c.region || ''))
        const population = typeof c.population === 'number' ? c.population : undefined
        const area = typeof c.area === 'number' ? c.area : undefined
        return { name, capital, code, continent, population, area }
      })
      .filter((c: Country) => c.name && c.capital && c.code && c.continent)

    const map = new Map<string, Country>()
    for (const c of countriesData) map.set(c.name.toLowerCase(), c)
    for (const c of fetched) map.set(c.name.toLowerCase(), c)
    countriesData = Array.from(map.values())

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(countriesData))
    }

    return countriesData.length
  } catch {
    return countriesData.length
  }
}

export const getCountriesCount = (): number => countriesData.length

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
import seedCountries from '@/data/countries.json'