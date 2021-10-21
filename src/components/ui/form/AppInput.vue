<template>
  <div class="box-form-group">
    <template v-if="type === 'text'">
      <div class="container-input">
        <div class="container-icon" v-if="icon">
          <div>
            <img :src="require(`@/assets/icons/${icon}`)" :width="iconWidth" />
          </div>
        </div>
        <input
          :disabled="disabled"
          type="text"
          :placeholder="placeholder"
          v-model="inputValue"
        />
      </div>
    </template>

    <template v-else>
      <input
        :type="type"
        v-model="inputValue"
        class="input"
        :class="extraClass"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    icon: { type: String, required: false, default: false },
    iconWidth: { type: String, required: false },
    type: { type: String, required: false, default: 'text' },
    placeholder: { type: String, required: false },
    maxLength: { type: Number, required: false, default: 245 },
    value: { required: false },
    disabled: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      inputValue: '',
      formatValue: '',
      showValues: false,
      checked: false,
    }
  },

  mounted() {
    this.inputValue = this.value
  },
  methods: {
    change() {
      this.$emit('input', this.inputValue)
    },
  },

  watch: {
    inputValue() {
      if (`${this.inputValue}`.length > this.maxLength) {
        this.inputValue = this.inputValue.slice(0, this.maxLength)
      }

      this.change()
    },
  },
}
</script>

<style lang="scss" scoped>
.container-input {
  box-shadow: 0px 2px 10px rgba(89, 86, 86, 0.04);
  border-radius: 5px;
  display: flex;
  background: #fff;
  width: 100%;
  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    font-family: 'Montserrat';
    font-weight: normal;
    font-size: 16px;
    line-height: 140%;
    z-index: 1;
    background: transparent;
    color: var(--primary-gray);
  }
  input::placeholder {
    color: var(--tertiary-gray);
  }

  .container-icon {
    position: absolute;
    cursor: pointer;
    min-height: 54px;
    min-width: 54px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
