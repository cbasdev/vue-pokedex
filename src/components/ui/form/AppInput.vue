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
input {
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
}
input::placeholder {
  color: #d2d0d0;
  letter-spacing: -0.03rem;
}
.container-input {
  display: flex;
  background: #fff;
  padding: 0.3rem;
  border-radius: 3rem;
}
</style>
