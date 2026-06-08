<script setup>
import { computed, ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import ManagePriceForm from './components/ManagePriceForm.vue'
import PriceChart from './components/PriceChart.vue'
import PriceTable from './components/PriceTable.vue'
import SearchControls from './components/SearchControls.vue'
import SummaryPanel from './components/SummaryPanel.vue'
import { buildInitialData, CATEGORIES, END_YEAR, START_YEAR, STORAGE_KEY } from './data/bigMacPrices'

function loadRows() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (Array.isArray(saved) && saved.length > 0) return saved
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }

  return buildInitialData()
}

const rows = ref(loadRows())
const initialMode = new URLSearchParams(window.location.search).get('mode')
const mode = ref(initialMode === 'manage' ? 'manage' : 'search')
const singleYear = ref(2026)
const startYear = ref(START_YEAR)
const endYear = ref(END_YEAR)
const message = ref('')
const messageType = ref('success')
const editForm = ref({
  year: 2026,
  price: 78,
  category: '單點',
})

const sortedRows = computed(() =>
  [...rows.value].sort((a, b) => a.year - b.year || a.category.localeCompare(b.category)),
)

const singleResults = computed(() =>
  sortedRows.value.filter((item) => item.year === Number(singleYear.value)),
)

const rangeBounds = computed(() => {
  const from = Math.min(Number(startYear.value), Number(endYear.value))
  const to = Math.max(Number(startYear.value), Number(endYear.value))
  return { from, to }
})

const rangeResults = computed(() =>
  sortedRows.value.filter(
    (item) => item.year >= rangeBounds.value.from && item.year <= rangeBounds.value.to,
  ),
)

const chart = computed(() => {
  const data = rangeResults.value
  const years = [...new Set(data.map((item) => item.year))]
  const prices = data.map((item) => item.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const priceSpan = Math.max(maxPrice - minPrice, 1)
  const width = 720
  const height = 280
  const pad = 36

  const pointFor = (year, price) => {
    const x =
      years.length === 1
        ? width / 2
        : pad + ((year - years[0]) / (years.at(-1) - years[0])) * (width - pad * 2)
    const y = height - pad - ((price - minPrice) / priceSpan) * (height - pad * 2)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }

  const lineFor = (category) =>
    years
      .map((year) => data.find((item) => item.year === year && item.category === category))
      .filter(Boolean)
      .map((item) => pointFor(item.year, item.price))
      .join(' ')

  return {
    width,
    height,
    years,
    minPrice,
    maxPrice,
    singleLine: lineFor('單點'),
    mealLine: lineFor('套餐'),
  }
})

const singleCount = computed(() => sortedRows.value.filter((item) => item.category === '單點').length)
const mealCount = computed(() => sortedRows.value.filter((item) => item.category === '套餐').length)

function saveRows() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows.value))
}

function showMessage(text, type = 'success') {
  message.value = text
  messageType.value = type
}

function upsertPrice() {
  const year = Number(editForm.value.year)
  const price = Number(editForm.value.price)
  const category = editForm.value.category

  if (!year || !price || !category) {
    showMessage('請完整輸入年份、價格與類別。', 'error')
    return
  }

  const nextYear = sortedRows.value.find(
    (item) => item.category === category && item.year > year && item.price !== price,
  )?.year
  const fillUntil = nextYear ? nextYear - 1 : year
  let changed = 0

  for (let targetYear = year; targetYear <= fillUntil; targetYear += 1) {
    const index = rows.value.findIndex(
      (item) => item.year === targetYear && item.category === category,
    )

    if (index >= 0) rows.value[index] = { year: targetYear, price, category }
    else rows.value.push({ year: targetYear, price, category })
    changed += 1
  }

  saveRows()
  showMessage(`已更新 ${year} 年 ${category} 價格，共影響 ${changed} 筆資料。`)
}

function resetData() {
  rows.value = buildInitialData()
  saveRows()
  showMessage('已重設為預設的大麥克價格資料。')
}
</script>

<template>
  <main class="app-shell">
    <AppHeader :mode="mode" @change-mode="mode = $event" @reset="resetData" />

    <section v-if="mode === 'search'" class="workspace">
      <SearchControls
        v-model:single-year="singleYear"
        v-model:start-year="startYear"
        v-model:end-year="endYear"
        :min-year="START_YEAR"
        :max-year="END_YEAR"
      />

      <PriceChart :chart="chart" :from="rangeBounds.from" :to="rangeBounds.to" />

      <div class="table-grid">
        <PriceTable :title="`${singleYear} 年查詢結果`" :rows="singleResults" />
        <PriceTable title="區間查詢結果" :rows="rangeResults" scrollable />
      </div>
    </section>

    <section v-else class="workspace manage-layout">
      <ManagePriceForm
        v-model:form="editForm"
        :categories="CATEGORIES"
        :message="message"
        :message-type="messageType"
        @submit="upsertPrice"
      />
      <SummaryPanel
        :total="sortedRows.length"
        :single-count="singleCount"
        :meal-count="mealCount"
        :start-year="START_YEAR"
        :end-year="END_YEAR"
      />
    </section>
  </main>
</template>

<style scoped>
.app-shell {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0;
}

.workspace {
  display: grid;
  gap: 18px;
  margin-top: 18px;
}

.table-grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.8fr) minmax(320px, 1.2fr);
  gap: 18px;
}

.manage-layout {
  grid-template-columns: minmax(320px, 1fr) minmax(260px, 0.7fr);
  align-items: start;
}

@media (max-width: 760px) {
  .app-shell {
    width: min(100% - 20px, 1120px);
    padding: 10px 0 24px;
  }

  .table-grid,
  .manage-layout {
    grid-template-columns: 1fr;
  }
}
</style>
