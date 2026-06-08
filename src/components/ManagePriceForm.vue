<script setup>
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
  messageType: {
    type: String,
    default: 'success',
  },
})

const emit = defineEmits(['update:form', 'submit'])

function updateField(field, value) {
  emit('update:form', { ...props.form, [field]: value })
}
</script>

<template>
  <form class="edit-panel" @submit.prevent="$emit('submit')">
    <div class="section-heading">
      <h2>新增 / 更新價格</h2>
      <p>輸入年份、價格與類別後，系統會更新該筆資料。</p>
    </div>

    <div class="field">
      <label for="editYear">年份</label>
      <input
        id="editYear"
        :value="form.year"
        type="number"
        min="1967"
        max="2100"
        required
        @input="updateField('year', Number($event.target.value))"
      />
    </div>

    <div class="field">
      <label for="editPrice">價格 TWD</label>
      <input
        id="editPrice"
        :value="form.price"
        type="number"
        min="1"
        required
        @input="updateField('price', Number($event.target.value))"
      />
    </div>

    <div class="field">
      <label for="editCategory">類別</label>
      <select id="editCategory" :value="form.category" required @change="updateField('category', $event.target.value)">
        <option v-for="category in categories" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>
    </div>

    <p v-if="message" class="message" :class="messageType">{{ message }}</p>
    <button class="submit-button" type="submit">儲存資料</button>
  </form>
</template>

<style scoped>
.edit-panel {
  display: grid;
  gap: 18px;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #e7e2d8;
  border-radius: 8px;
  box-shadow: 0 12px 28px rgba(35, 27, 20, 0.07);
}

.section-heading {
  display: grid;
  gap: 4px;
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

.section-heading p {
  color: #737373;
}

.field {
  display: grid;
  gap: 8px;
}

label {
  color: #4b4b4b;
  font-weight: 800;
}

input,
select {
  width: 100%;
  min-height: 46px;
  padding: 0 13px;
  color: #252525;
  background: #fffdf8;
  border: 2px solid #e5dfd2;
  border-radius: 8px;
  outline: none;
}

input:focus,
select:focus {
  border-color: #ffc72c;
}

.submit-button {
  width: fit-content;
  min-height: 44px;
  padding: 0 18px;
  color: #ffffff;
  background: #d71920;
  border: 0;
  border-radius: 8px;
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

.submit-button:hover {
  background: #b9141a;
  transform: translateY(-1px);
}

.message {
  margin: 0;
  padding: 12px 14px;
  border-radius: 8px;
  font-weight: 800;
}

.message.success {
  color: #155724;
  background: #d4edda;
}

.message.error {
  color: #721c24;
  background: #f8d7da;
}

@media (max-width: 760px) {
  .edit-panel {
    padding: 18px;
  }
}
</style>
