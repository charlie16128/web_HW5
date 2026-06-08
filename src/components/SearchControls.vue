<script setup>
defineProps({
  singleYear: {
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
  minYear: {
    type: Number,
    required: true,
  },
  maxYear: {
    type: Number,
    required: true,
  },
})

defineEmits(['update:single-year', 'update:start-year', 'update:end-year'])
</script>

<template>
  <section class="controls-panel">
    <div class="field">
      <label for="singleYear">單一年份查詢</label>
      <div class="inline-control">
        <input
          id="singleYear"
          :value="singleYear"
          type="number"
          :min="minYear"
          :max="maxYear"
          @input="$emit('update:single-year', Number($event.target.value))"
        />
        <span>年</span>
      </div>
    </div>

    <div class="field">
      <label>區間年份查詢</label>
      <div class="range-control">
        <input
          :value="startYear"
          type="number"
          :min="minYear"
          :max="maxYear"
          aria-label="起始年份"
          @input="$emit('update:start-year', Number($event.target.value))"
        />
        <span>到</span>
        <input
          :value="endYear"
          type="number"
          :min="minYear"
          :max="maxYear"
          aria-label="結束年份"
          @input="$emit('update:end-year', Number($event.target.value))"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.controls-panel {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) minmax(320px, 1.4fr);
  gap: 20px;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #e7e2d8;
  border-radius: 8px;
  box-shadow: 0 12px 28px rgba(35, 27, 20, 0.07);
}

.field {
  display: grid;
  gap: 8px;
}

label {
  color: #4b4b4b;
  font-weight: 800;
}

input {
  width: 100%;
  min-height: 46px;
  padding: 0 13px;
  color: #252525;
  background: #fffdf8;
  border: 2px solid #e5dfd2;
  border-radius: 8px;
  outline: none;
}

input:focus {
  border-color: #ffc72c;
}

.inline-control,
.range-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.range-control input {
  min-width: 0;
}

@media (max-width: 760px) {
  .controls-panel {
    grid-template-columns: 1fr;
    padding: 18px;
  }

  .range-control {
    flex-wrap: wrap;
  }

  .range-control input {
    flex: 1 1 120px;
  }
}
</style>
