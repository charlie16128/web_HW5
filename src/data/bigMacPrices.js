export const START_YEAR = 2003
export const END_YEAR = 2026
export const STORAGE_KEY = 'hw5-big-mac-prices'

export const CATEGORIES = [
  { value: '單點', label: '單點' },
  { value: '套餐', label: '套餐' },
]

const rawHistory = [
  { year: 2003, price: 70, category: '單點' },
  { year: 2003, price: 109, category: '套餐' },
  { year: 2011, price: 79, category: '單點' },
  { year: 2011, price: 115, category: '套餐' },
  { year: 2012, price: 119, category: '套餐' },
  { year: 2013, price: 59, category: '單點' },
  { year: 2013, price: 99, category: '套餐' },
  { year: 2014, price: 79, category: '單點' },
  { year: 2014, price: 109, category: '套餐' },
  { year: 2016, price: 115, category: '套餐' },
  { year: 2018, price: 119, category: '套餐' },
  { year: 2019, price: 72, category: '單點' },
  { year: 2020, price: 127, category: '套餐' },
  { year: 2021, price: 75, category: '單點' },
  { year: 2021, price: 130, category: '套餐' },
  { year: 2022, price: 140, category: '套餐' },
  { year: 2024, price: 78, category: '單點' },
  { year: 2024, price: 143, category: '套餐' },
]

export function buildInitialData() {
  const currentPrices = { 單點: 70, 套餐: 109 }
  const rows = []

  for (let year = START_YEAR; year <= END_YEAR; year += 1) {
    for (const { value: category } of CATEGORIES) {
      const found = rawHistory.find((item) => item.year === year && item.category === category)
      if (found) currentPrices[category] = found.price
      rows.push({ year, price: currentPrices[category], category })
    }
  }

  return rows
}
