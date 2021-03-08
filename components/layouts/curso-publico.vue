<template>
  <div>
    <div class="curso_cabecera">
      <div class="container">
        <div>
          <NuxtLink class="volver" :to="volver.to">
            <AIcon type="arrow-left" /> {{ volver.text }}
          </NuxtLink>

          <h1>{{ titulo }}</h1>
        </div>
        <slot name="cabecera" />
      </div>
    </div>

    <div class="curso_cuerpo">
      <div class="container">
        <slot name="extra" />
      </div>
      <div class="container">
        <div class="curso_cuerpo-inner">
          <slot name="cuerpo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "ant-design-vue";
export default {
  components: {
    AIcon: Icon,
  },
  props: {
    volver: {
      type: [Object],
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.curso_cabecera {
  padding: 95px 0 184px;
  .container {
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    flex-direction: column;
    @media (min-width: 768px) {
      flex-direction: row;
    }
  }
}
.volver {
  font-size: 20px;
  line-height: 28px;
  color: @daybreak-blue-7;
}
h1 {
  font-weight: bold;
  font-size: 30px;
  line-height: 38px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: @daybreak-blue-10;
}

.curso_cuerpo {
  background: #ffffff;
}
.curso_cuerpo-inner {
  width: 790px;
  max-width: 90%;
  margin: 0 auto -50px;
  position: relative;
  top: -150px;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  @media (min-width: 790px) {
    max-width: 100%;
  }
}
</style>
