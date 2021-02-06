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
        <a-input
          :id="id"
          :value="value"
          :type="mostrarClave ? 'text' : 'password'"
          :name="id"
          v-bind="$attrs"
          @input="$emit('input', $event.target.value)"
        >
          <a-icon slot="prefix" type="lock" />
          <a-tooltip slot="suffix" :title="mostrarClaveLabel">
            <a-icon
              :type="mostrarClave ? 'eye-invisible' : 'eye'"
              @click="mostrarClave = !mostrarClave"
              @keypress.enter.prevent="mostrarClave = !mostrarClave"
            />
          </a-tooltip>
        </a-input>
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

<style lang="less" scoped>
@import "~assets/less/components/control-error";
@import "~assets/less/components/control-help";
// @import '~assets/less/components/controls';
.control-error + .control-help {
  margin-top: 10px;
}
</style>
