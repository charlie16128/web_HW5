<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  scrollable: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <article class="panel">
    <div class="section-heading">
      <h2>{{ title }}</h2>
      <p>{{ rows.length }} 筆</p>
    </div>

    <div :class="{ 'table-scroll': scrollable }">
      <table>
        <thead>
          <tr>
            <th>年份</th>
            <th>類別</th>
            <th>價格</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in rows" :key="`${item.year}-${item.category}`">
            <td>{{ item.year }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.price }} 元</td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>

<style scoped>
.panel {
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

.table-scroll {
  max-height: 420px;
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 13px 12px;
  text-align: left;
  border-bottom: 1px solid #eee8dc;
}

th {
  color: #302c24;
  background: #ffc72c;
  font-weight: 900;
}

tr:nth-child(even) td {
  background: #fff9e6;
}

@media (max-width: 760px) {
  .panel {
    padding: 18px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
  }
}
</style>
