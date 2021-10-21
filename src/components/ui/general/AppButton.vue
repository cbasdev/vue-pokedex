<template>
  <div>
    <template v-if="type === 'normal-btn'">
      <button class="normal-btn">
        <div class="flex">
          {{ text }}
        </div>
      </button>
    </template>
    <template v-if="type === 'main-btn'">
      <button class="main-btn">
        <div v-if="icon" class="mr-3">
          <img :src="require(`@/assets/icons/${icon}`)" :width="iconWidth" />
        </div>
        {{ text }}
      </button>
    </template>
    <template v-if="type === 'secundary-btn'">
      <button class="secundary-btn">
        <div v-if="icon" class="mr-3">
          <img :src="require(`@/assets/icons/${icon}`)" :width="iconWidth" />
        </div>
        {{ text }}
      </button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'main-btn' },
    text: { type: String, default: '' },
    icon: { type: String, required: false, default: false },
    iconWidth: { type: String, required: false },
  },
}
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  border-radius: 60px;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: 0.3s;
  font-weight: bold;
  padding: 8px 20px;
  color: #fff;
}
.normal-btn {
  padding: 11px 20px;
  background: var(--primary-red);
}

.normal-btn:hover {
  background: var(--secundary-red);
}

.main-btn {
  background: var(--primary-red);
  justify-content: center;
}
.main-btn:hover {
  background: var(--secundary-red);
}

.secundary-btn {
  background: var(--tertiary-gray);
  justify-content: center;
}
.secundary-btn:hover {
  background: var(--secundary-gray);
}
</style>
