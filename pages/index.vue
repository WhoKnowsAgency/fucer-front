<template>
  <div>
    <div class="hero">
      <h1>Fundación Centro de Estudios Registrales</h1>
      <p>
        Especialización, capacitación, promoción y difusión del Derecho
        Registral Argentino.
      </p>
      <div class="botonera">
        <AButton shape="round" type="primary">
          <NuxtLink to="/campus">Cursos virtuales</NuxtLink>
        </AButton>
        <AButton shape="round">Sobre FUCER</AButton>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "ant-design-vue";
export default {
  auth: false,
  components: {
    AButton: Button,
  },
};
</script>

<style lang="less">
.hero {
  max-width: 600px;
  padding: 0 20px;
  margin: 125px auto;
  h1 {
    font-weight: bold;
    font-size: 46px;
    line-height: 54px;
    color: @daybreak-blue-10;
    margin-bottom: 20px;
    text-align: center;
  }
  p {
    font-size: 24px;
    line-height: 32px;
    color: @daybreak-blue-9;
    text-align: center;
    margin-bottom: 38px;
  }
  .botonera {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .@{btn-prefix-cls} {
      margin: 0 10px 10px 10px;
    }
  }
}
</style>
