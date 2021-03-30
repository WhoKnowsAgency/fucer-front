<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="label">
    <div class="control">
      <div class="control-input" :class="errors.length ? 'has-error' : false">
        <label class="sr-only" :for="id">{{ label }}</label>
        <input
          :id="id"
          ref="file"
          :name="id"
          :value="value"
          type="file"
          class="control-file"
          :class="{ 'has-focus': fileFocused }"
          v-bind="$attrs"
          @input="$emit('input', $event.target.value)"
          @change="onChangeFile"
          @focus="fileFocused = true"
          @blur="fileFocused = false"
        />
        <label for="imagen"> <AIcon type="upload" /> {{ fileTxt }}</label>
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
import { Icon } from "ant-design-vue";
export default {
  components: {
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
      type: [String, Object],
      default: "",
    },
  },
  data() {
    return {
      fileFocused: false,
      fileTxt: "Subir foto",
    };
  },
  methods: {
    onChangeFile(e) {
      this.fileTxt = e.target.value.split("\\").pop();
    },
  },
};
</script>

<style lang="less">
@import "~assets/less/components/control-error";
@import "~assets/less/components/control-help";
@import "~assets/less/components/controls";
</style>
<style lang="less" scoped>
/**
 * Basado en https://tympanus.net/Tutorials/CustomFileInputs/
 */
.control {
  .control-file {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
    + label {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      display: inline-block;
      overflow: hidden;
      background-color: transparent;
      color: @daybreak-blue-7;
      border-radius: 2px;
      border: 1px solid @daybreak-blue-7;
      text-align: center;
      font-weight: 400;
      font-size: 14px;
      line-height: 2.2;
      padding: 0 1em;
      margin: 0.8em 0 0.5em;
      appearance: none;
      transition: all 300ms;
      &:hover {
        background-color: @geek-blue-2;
        cursor: pointer;
      }
    }
    &:focus + label,
    &.has-focus + label,
    &.has-focus + label {
      outline: 1px dotted @daybreak-blue-7 !important;
      outline: -webkit-focus-ring-color auto 5px;
    }
  }
}
</style>
