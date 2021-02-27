<template>
  <ValidationProvider
    v-slot="{ errors }"
    :rules="rules"
    :name="label"
    :vid="id"
  >
    <div class="control">
      <label class="sr-only" :for="id">{{ label }}</label>
      <div
        class="control-input has-visibility-toggle"
        :class="errors.length ? 'has-error' : false"
      >
        <AInput
          :id="id"
          :value="value"
          :type="mostrarClave ? 'text' : 'password'"
          :name="id"
          size="large"
          :placeholder="label"
          v-bind="$attrs"
          @input="$emit('input', $event.target.value)"
        >
          <AIcon slot="prefix" type="lock" />
          <ATooltip slot="suffix" :title="mostrarClaveLabel">
            <AIcon
              :type="mostrarClave ? 'eye-invisible' : 'eye'"
              @click="mostrarClave = !mostrarClave"
              @keypress.enter.prevent="mostrarClave = !mostrarClave"
            />
          </ATooltip>
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
import { Input, Icon, Tooltip } from "ant-design-vue";
export default {
  components: {
    AInput: Input,
    ATooltip: Tooltip,
    AIcon: Icon,
  },
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
  data() {
    return {
      mostrarClave: false,
    };
  },
  computed: {
    mostrarClaveLabel() {
      return this.mostrarClave ? "Mostrar" : "Ocultar";
    },
  },
};
</script>

<style lang="less">
@import "~assets/less/components/control-error";
@import "~assets/less/components/control-help";
@import "~assets/less/components/controls";
</style>
