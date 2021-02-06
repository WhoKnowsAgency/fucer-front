<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="label">
    <div class="control">
      <div class="control-input" :class="errors.length ? 'has-error' : false">
        <label class="sr-only" :for="id">{{ label }}</label>
        <a-input
          :id="id"
          :value="value"
          type="text"
          size="large"
          :name="id"
          :placeholder="label"
          v-bind="$attrs"
          @input="handleInput($event.target.value)"
        >
          <a-icon v-if="icon" slot="prefix" :type="icon" />
        </a-input>
      </div>

      <template v-if="errors.length">
        <span class="control-error">
          <slot name="error">{{ errors[0] }}</slot>
        </span>
      </template>

      <div v-if="$slots.help" class="control-help">
        <slot name="help"></slot>
      </div>
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
    icon: {
      type: [String, Boolean],
      default: false,
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

<style lang="less">
@import "~assets/less/components/control-error";
@import "~assets/less/components/control-help";
@import "~assets/less/components/controls";
</style>
