<script setup>
defineProps({
  chart: {
    type: Object,
    required: true,
  },
  from: {
    type: Number,
    required: true,
  },
  to: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <section class="chart-panel">
    <div class="section-heading">
      <h2>{{ from }} - {{ to }} 價格趨勢</h2>
      <p>單位：新台幣 TWD</p>
    </div>

    <svg class="line-chart" :viewBox="`0 0 ${chart.width} ${chart.height}`" role="img">
      <title>大麥克單點與套餐價格趨勢圖</title>
      <line x1="36" y1="244" x2="684" y2="244" />
      <line x1="36" y1="36" x2="36" y2="244" />
      <polyline class="single-line" :points="chart.singleLine" />
      <polyline class="meal-line" :points="chart.mealLine" />
      <text x="42" y="28">{{ chart.maxPrice }}</text>
      <text x="42" y="268">{{ chart.minPrice }}</text>
      <text x="36" y="278">{{ chart.years[0] }}</text>
      <text x="636" y="278">{{ chart.years.at(-1) }}</text>
    </svg>

    <div class="legend">
      <span><i class="dot single"></i>單點</span>
      <span><i class="dot meal"></i>套餐</span>
    </div>
  </section>
</template>

<style scoped>
.chart-panel {
  padding: 24px;
  background: #ffffff;
  border: 1px solid #e7e2d8;
  border-radius: 8px;
  box-shadow: 0 12px 28px rgba(35, 27, 20, 0.07);
}

.section-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

h2,
p {
  margin: 0;
}

h2 {
  color: #272727;
  font-size: 1.15rem;
  font-weight: 850;
}

p {
  color: #737373;
}

.line-chart {
  width: 100%;
  min-height: 260px;
  overflow: visible;
}

.line-chart line {
  stroke: #d8d3ca;
  stroke-width: 2;
}

.line-chart text {
  fill: #6c6c6c;
  font-size: 13px;
  font-weight: 700;
}

.line-chart polyline {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 5;
}

.single-line {
  stroke: #d71920;
}

.meal-line {
  stroke: #ffc72c;
}

.legend {
  display: flex;
  gap: 18px;
  color: #555555;
  font-weight: 800;
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border-radius: 999px;
}

.dot.single {
  background: #d71920;
}

.dot.meal {
  background: #ffc72c;
}

@media (max-width: 760px) {
  .chart-panel {
    padding: 18px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
  }
}
</style>
