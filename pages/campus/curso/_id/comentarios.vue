<template>
  <div class="curso">
    <div class="container">
      <ABreadcrumb>
        <ABreadcrumbItem>
          <NuxtLink to="/campus">Campus</NuxtLink>
        </ABreadcrumbItem>
        <ABreadcrumbItem>
          <NuxtLink :to="`/campus/curso/${curso.id}`"> Curso </NuxtLink>
        </ABreadcrumbItem>
        <ABreadcrumbItem>Comentarios</ABreadcrumbItem>
      </ABreadcrumb>
      <div>
        <h1>Comentarios</h1>
        <p class="intro">
          En este espacio podés intercambiar mensajes, debatir tópicos y
          despejar dudas con el resto de los alumnos.
        </p>
        <div
          v-if="comentarios"
          class="comentarios"
          @submit.capture.prevent="handleSumbit"
          @click="handleClick"
          @keyup.enter="handleClick"
          v-html="comentarios"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Breadcrumb } from "ant-design-vue";
export default {
  components: {
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
  },
  async fetch() {
    if (!this.$route.params.id) return;
    try {
      await this.$store.dispatch("cursos/getById", this.$route.params.id);
      this.curso = this.$store.state.cursos.byId[this.$route.params.id];
      if (this.curso.clases.length) {
        this.comentarios = await this.$api.cursos.comentariosClase(
          this.curso.id,
          this.curso.clases[0].id
        );
      }
    } catch (e) {
      console.error(e);
      if (process.client) {
        this.$router.push({ name: "404" });
      }
    }
  },
  data() {
    return {
      comentarios: "",
      curso: {
        id: 0,
        url: {
          params: {
            id: 0,
          },
        },
      },
    };
  },
  methods: {
    async handleClick(e) {
      if (e.target.href) {
        console.log("handleClick");
        e.preventDefault();
        const url = e.target.href.replace("https://www.fucer.com.ar/", "/");
        this.comentarios = await this.$axios.$get(url);
      }
    },
    async handleSumbit(e) {
      console.log("handleSumbit");
      const url = e.target.action.replace("https://www.fucer.com.ar/", "/");
      let data = {};
      for (let i = 0; i < e.target.elements.length; i++) {
        const el = e.target.elements[i];
        data[el.name] = el.value;
      }
      console.log(data);
      this.comentarios =
        e.target.action === "get"
          ? await this.$axios.$get(url, {
              params: data,
            })
          : await this.$axios.$post(url, data);
    },
  },
  head() {
    return {
      title: "Comentarios - " + this.curso.nombre,
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
  word-spacing: -0.3em;
  font-size: 30px;
  line-height: 38px;
  margin-top: 16px;
  margin-bottom: 20px;
  color: @daybreak-blue-10;
}

.intro {
  max-width: 380px;
  margin-bottom: 60px;
}

/deep/ .comentarios {
  max-width: 996px;
  border-radius: 2px;
  background: #ffffff;
  padding: 24px;
  margin: 20px auto;

  .comentar {
    display: flex;
  }
  .comentario {
    margin: 20px 0;
    .avatar {
      float: left;
    }
  }
  .avatar {
    padding-right: 12px;
    img {
      width: 32px;
      height: auto;
      border-radius: 50%;
    }
  }
  textarea {
    width: 100%;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    border-radius: 2px;
    min-height: 70px;
    margin-bottom: 15px;
  }
  button {
    padding: 2px 30px;
    border: 1px dashed @daybreak-blue-8;
    border-radius: 15px;
    background: none;
    color: @daybreak-blue-8;
  }
  .media {
    margin: 15px 0 10px 40px;
  }
  .p {
    margin: 0 0 10px 45px;
    clear: both;
  }
  .comentario {
    .text {
      color: #595959;
      .name,
      .time {
        color: #8c8c8c;
        font-size: 12px;
        line-height: 20px;
        display: inline-block;
      }
      .name {
        padding-right: 1em;
      }
      .time {
        opacity: 0.75;
      }
      .controls {
        margin-left: 45px;
        color: #8c8c8c;
        font-size: 12px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .pagination {
    margin: 15px;
    ul {
      display: flex;
      justify-content: center;
      padding: 0;
    }
    li {
      border-radius: 4px;
      list-style: none;
      border: 1px solid #1890ff;
      padding: 0.2em 0.5em;
    }
  }
}

@media (max-width: 460px) {
  .ant-col /deep/ {
    width: 100%;
  }
}
</style>
