<template>
  <div class="curso">
    <div class="container">
      <ABreadcrumb>
        <ABreadcrumbItem>
          <NuxtLink to="/campus">Campus</NuxtLink>
        </ABreadcrumbItem>
        <ABreadcrumbItem>
          <NuxtLink :to="curso.url">Curso</NuxtLink>
        </ABreadcrumbItem>
        <ABreadcrumbItem>Grabaciones</ABreadcrumbItem>
      </ABreadcrumb>
      <div>
        <h1>Grabaciones</h1>
        <p class="intro">
          Cada clase de este curso se graba y luego se habilita en esta página.
          Podrás ver las grabaciones de forma asincrónica, durante el plazo de
          cursada.
        </p>
        <ARow :gutter="[24, 24]">
          <ACol v-for="clase in curso.clases" :key="clase.id" span="12">
            <ACard class="card" hoverable>
              <h3>{{ clase.nombre }}</h3>
              <AButton class="btn" type="dashed" shape="circle">
                <NuxtLink
                  :to="{
                    name: 'curso-id-clase-clase_id',
                    params: { id: curso.id, clase_id: clase.id },
                  }"
                >
                  <AIcon type="arrow-right" />
                </NuxtLink>
              </AButton>
            </ACard>
          </ACol>
        </ARow>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    if (!this.$route.params.id) return;
    try {
      await this.$store.dispatch("cursos/getById", this.$route.params.id);
      this.curso = this.$store.state.cursos.byId[this.$route.params.id];
    } catch (e) {
      console.error(e);
      if (process.client) {
        this.$router.push({ name: "404" });
      }
    }
  },
  data() {
    return {
      curso: {
        id: 0,
      },
    };
  },
  head() {
    return {
      title: "Grabaciones - " + this.curso.nombre,
    };
  },
};
</script>

<style lang="less" scoped>
.curso .container {
  margin-top: 55px;
  margin-bottom: 200px;
}

h1 {
  font-weight: bold;
  font-size: 30px;
  line-height: 38px;
  margin-top: 16px;
  margin-bottom: 60px;
  color: @daybreak-blue-10;
}

.intro {
  max-width: 380px;
  margin-bottom: 60px;
}

.card {
  max-width: 384px;
  background: white;
  h3 {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: @daybreak-blue-10;
  }
  .btn {
    margin-top: 17px;
  }
}

@media (max-width: 460px) {
  .ant-col /deep/ {
    width: 100%;
  }
}
</style>
