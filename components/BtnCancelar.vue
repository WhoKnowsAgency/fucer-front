<template>
  <NuxtLink :to="to" class="cancelar">
    <slot>Cancelar</slot>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.cancelar {
  display: block;
  text-align: center;
  font-weight: bold;
  word-spacing: -0.3em;
  margin-top: 20px;
}
</style>
