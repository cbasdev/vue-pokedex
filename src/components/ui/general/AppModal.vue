<template>
  <modal
    :width="isMobile ? '90%' : '600'"
    height="auto"
    :name="name"
    ref="modal"
  >
    <div class="btn-modal" @click="closeModal">
      <img src="@/assets/icons/close-icon.png" width="26" />
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
    name: { type: String, required: true },
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
  computed: {
    isMobile() {
      return window.screen.width < 650
    },
  },
}
</script>

<style>
.vm--modal {
  overflow: initial !important;
  border-radius: 5px !important;
}

.btn-modal {
  cursor: pointer;
  position: absolute;
  right: 10px;
  margin-top: 15px;
}
</style>
