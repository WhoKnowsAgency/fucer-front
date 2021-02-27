<template>
  <div class="error">
    <client-only><vue-announcer /></client-only>
    <SkipLinks />
    <div class="container">
      <NuxtLink to="/" class="rounded__btn--full white">
        <AIcon type="arrow-left" class="icon" /> Volver al inicio
      </NuxtLink>
      <h1 ref="pageFocusTarget">
        Ups, error
        <span role="img" aria-label="Cara con una expresión confusa">😕</span>
      </h1>
      <p>La página que estás buscando no existe o no está disponible.</p>
    </div>
  </div>
</template>

<script>
import { Icon } from "ant-design-vue";
export default {
  components: {
    AIcon: Icon,
  },
  data() {
    return {
      title: "Error - Página no encontrada",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!process.client) return;
      vm.$announcer.assertive(
        `${vm.title} ${vm.$announcer.options.complementRoute}`
      );
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget.$el);
    });
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  margin: 80px auto;
}
h1 {
  font-weight: bold;
  font-size: 46px;
  line-height: 1.6;
  color: @daybreak-blue-10;
  margin: 15px 0 25px;
}
p {
  font-size: 24px;
  line-height: 32px;
  color: @daybreak-blue-10;
  max-width: 480px;
}
a {
  font-size: 20px;
  line-height: 28px;
  color: @daybreak-blue-8;
  .icon {
    font-size: 14px;
  }
}
</style>
