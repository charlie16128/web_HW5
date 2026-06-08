<script setup>
defineProps({
  total: {
    type: Number,
    required: true,
  },
  singleCount: {
    type: Number,
    required: true,
  },
  mealCount: {
    type: Number,
    required: true,
  },
  startYear: {
    type: Number,
    required: true,
  },
  endYear: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <aside class="summary-panel">
    <h2>資料摘要</h2>
    <p>目前共有 {{ total }} 筆價格資料，包含單點與套餐兩種分類。</p>

    <div class="stat-list">
      <span>{{ startYear }} - {{ endYear }}</span>
      <span>單點 {{ singleCount }} 筆</span>
      <span>套餐 {{ mealCount }} 筆</span>
    </div>
  </aside>
</template>

<style scoped>
.summary-panel {
  padding: 24px;
  background: #ffffff;
  border: 1px solid #e7e2d8;
  border-radius: 8px;
  box-shadow: 0 12px 28px rgba(35, 27, 20, 0.07);
}

h2,
p {
  margin: 0;
}

h2 {
  margin-bottom: 8px;
  color: #272727;
  font-size: 1.15rem;
  font-weight: 850;
}

p {
  color: #737373;
}

.stat-list {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}

.stat-list span {
  padding: 12px 14px;
  background: #fff9e6;
  border-radius: 8px;
  font-weight: 800;
}

@media (max-width: 760px) {
  .summary-panel {
    padding: 18px;
  }
}
</style>
