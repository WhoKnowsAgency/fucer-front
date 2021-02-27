<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ errors }"
    :rules="rules"
    :name="label"
  >
    <label v-if="label" class="sr-only" :for="id">{{ label }}</label>
    <div class="control">
      <div class="control-input" :class="errors.length ? 'has-error' : false">
        <AInput
          :id="id"
          :ref="id"
          :value="value"
          type="email"
          :size="'small'"
          :name="id"
          :placeholder="label"
          v-bind="$attrs"
          @input="$emit('input', $event.target.value)"
        >
          <AIcon slot="prefix" type="mail" />
        </AInput>
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
import { Input, Icon } from "ant-design-vue";
export default {
  components: {
    AInput: Input,
    AIcon: Icon,
  },
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
  },
  methods: {
    async validate() {
      return await this.$refs.provider.validate();
    },
  },
};
</script>

<style lang="less">
@import "~assets/less/components/control-error";
@import "~assets/less/components/control-help";
@import "~assets/less/components/controls";
</style>
