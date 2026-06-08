<script setup>
defineProps({
  mode: {
    type: String,
    required: true,
  },
})

defineEmits(['change-mode', 'reset'])
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">HW5 Vue Web</p>
      <h1>大麥克價格查詢系統</h1>
      <p class="subtitle">
        將 HW4 的資料查詢概念改寫成 Vue 版本，使用元件拆分畫面、用狀態管理查詢與新增資料。
      </p>
    </div>

    <div class="actions" aria-label="主要功能切換">
      <button :class="{ active: mode === 'search' }" type="button" @click="$emit('change-mode', 'search')">
        查詢
      </button>
      <button :class="{ active: mode === 'manage' }" type="button" @click="$emit('change-mode', 'manage')">
        管理
      </button>
      <button class="ghost" type="button" @click="$emit('reset')">重設資料</button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  min-height: 260px;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding: 30px;
  color: #ffffff;
  background:
    linear-gradient(115deg, rgba(32, 35, 45, 0.9), rgba(166, 36, 32, 0.84)),
    url('https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1400&q=80');
  background-position: center;
  background-size: cover;
  border-radius: 8px;
}

.hero-copy {
  max-width: 720px;
}

.eyebrow {
  margin: 0 0 12px;
  color: #ffd66b;
  font-size: 0.84rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 10px;
  font-size: clamp(2.35rem, 6vw, 4.4rem);
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0;
}

.subtitle {
  max-width: 620px;
  margin: 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.02rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

button {
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

button:hover {
  background: #b9141a;
  transform: translateY(-1px);
}

.active {
  color: #242424;
  background: #ffc72c;
}

.ghost {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.18);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.36);
}

@media (max-width: 760px) {
  .hero {
    align-items: flex-start;
    flex-direction: column;
    padding: 22px;
  }

  .actions {
    justify-content: flex-start;
  }
}
</style>
