<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="label">
    <div class="control">
      <div class="control-input" :class="errors.length ? 'has-error' : false">
        <label :for="id">{{ label }}</label>
        <input
          :id="id"
          :value="value"
          type="text"
          :name="id"
          v-bind="$attrs"
          @input="handleInput($event.target.value)"
        />
      </div>

      <template v-if="errors.length">
        <span class="control-error">
          <slot name="error">{{ errors[0] }}</slot>
        </span>
      </template>

      <p v-if="$slots.help" class="control-help">
        <slot name="help"></slot>
      </p>
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    rules: {
      type: String,
      default: "",
    },
    mask: {
      type: [Function, Boolean],
      default: false,
    },
  },
  methods: {
    handleInput(value) {
      if (this.mask) {
        value = this.mask(value);
      }
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/less/components/control-error";
@import "~assets/less/components/control-help";
// @import '~assets/less/components/controls';
.control-help {
  color: black;
  font-size: 14px;
  .control-error + & {
    display: none;
  }
}
</style>
