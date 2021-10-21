<template>
  <modal :width="width" :height="height" :name="name" ref="modal">
    <div class="btn-modal" @click="closeModal">
      X
    </div>
    <div class="container-modal">
      <slot></slot>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    width: { type: String, required: false, default: '600' },
    height: { type: String, required: false, default: 'auto' },
    name: { type: String, required: true },
  },
  data() {
    return {}
  },
  methods: {
    closeModal() {
      this.$modal.hide(this.name)
    },

    show() {
      this.$modal.show(this.name)
    },
    hide() {
      this.$modal.hide(this.name)
    },
  },
}
</script>

<style>
.vm--modal {
  overflow: initial !important;
  border-radius: 0.8rem !important;
}

.btn-modal {
  position: absolute;
  right: 20px;
  top: -14px;
}
</style>
