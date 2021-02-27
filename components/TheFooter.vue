<template>
  <ALayoutFooter class="pie">
    <div class="container">
      <div class="pie_contenido-principal">
        <div class="pie_descripcion">
          <picture>
            <source
              :srcSet="require('assets/img/fucer.x2.png?webp')"
              type="image/webp"
            />
            <source
              :srcSet="require('assets/img/fucer.png')"
              type="image/png"
            />
            <img
              width="65"
              height="65"
              class="logo"
              src="~assets/img/fucer.png"
              srcset="~assets/img/fucer.x2.png 2x"
              alt="Logo de Fucer"
            />
          </picture>
          <h1>Fundación Centro de Estudios Registrales</h1>
          <p>
            Especialización, capacitación, promoción y
            <br />difusión del Derecho Registral Argentino.
          </p>
        </div>

        <div class="pie_navegacion">
          <nav class="menu">
            <ul>
              <li>
                <a href="">Inicio</a>
              </li>
              <li>
                <a href="">Cursos activos</a>
              </li>
              <li>
                <a href="">Cursos finalizados</a>
              </li>
              <li>
                <a href="">Campus virtual</a>
              </li>
              <li>
                <a href="">Institucional</a>
              </li>
              <li>
                <a href="">Publicaciones</a>
              </li>
              <li>
                <a href="">Contacto</a>
              </li>
              <li>
                <a href="">FucerNet</a>
              </li>
            </ul>
          </nav>

          <nav class="redes">
            <ul>
              <li>
                <!-- TODO: cambiar FB -->
                <a
                  class="redes-icono es-facebook"
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="sr-only">Facebook</span>
                </a>
              </li>
              <!-- TODO: cambiar YT -->
              <li>
                <a
                  class="redes-icono es-youtube"
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="sr-only">YouTube</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <ADivider class="divider" />

      <div class="pie_contenido-secundario">
        <address
          class="direccion"
          itemscope
          itemtype="http://schema.org/LocalBusiness"
        >
          <div class="address-item">
            <a itemprop="telephone" href="tel:01139886729">(011) 3988 6729</a>
          </div>
          <div
            class="direccion-item"
            itemscope
            itemprop="address"
            itemtype="http://schema.org/PostalAddress"
          >
            <span itemprop="streetAddress"> Moreno 431</span>,
            <span itemprop="addressLocality">CABA</span>
          </div>
          <div class="direccion-item">
            <a itemprop="email" href="mailto:administracion@fucer.com.ar">
              administracion@fucer.com.ar
            </a>
          </div>
        </address>

        <small class="legales"
          >© 2021 Fundación Centro de Estudios Registrales</small
        >
      </div>
    </div>
  </ALayoutFooter>
</template>

<script>
import { Layout, Divider } from "ant-design-vue";
export default {
  components: {
    ADivider: Divider,
    ALayoutFooter: Layout.Footer,
  },
};
</script>

<style lang="less" scoped>
.ant-layout-footer {
  color: white;
  padding-top: 80px;
  padding-bottom: 80px;
}
a {
  color: inherit;
  text-decoration: none;
}

.pie_contenido-principal {
  display: flex;
  flex-direction: column;
  @media (min-width: @screen-md-min) {
    flex-direction: row;
    justify-content: space-between;
  }
}

.pie_descripcion {
  margin-bottom: 30px;
  .logo {
    margin-bottom: 26px;
  }
  h1 {
    font-size: 16px;
    line-height: 24px;
    color: inherit;
    font-weight: 700;
    margin-bottom: 12px;
  }
  p {
    line-height: 22px;
  }
  @media (min-width: @screen-xs-min) {
    br {
      display: block;
    }
  }
  @media (min-width: @screen-md-min) {
    margin-bottom: 0;
  }
}

.pie_navegacion {
  display: flex;
  flex-direction: column;
  .menu {
    line-height: 22px;
    margin-bottom: 20px;
    ul {
      padding: 0;
      columns: 195px 2;
      column-gap: 10px;
    }
    li {
      max-width: 160px;
      list-style: none;
      margin-bottom: 10px;
    }
  }
  .redes {
    ul {
      display: flex;
      padding: 0;
    }
    li {
      list-style: none;
      &:not(:last-child) {
        margin-right: 25px;
      }
    }
    &-icono {
      display: inline-block;
      width: 19px;
      height: 19px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      &:not(:last-child) {
        margin-right: 0;
      }
      &.es-facebook {
        background-image: url("~assets/img/facebook.svg");
      }
      &.es-youtube {
        width: 24px;
        background-image: url("~assets/img/youtube.svg");
      }
    }
  }
  @media (min-width: @screen-lg-min) {
    flex-direction: row;
    justify-content: flex-start;
    .menu {
      width: 400px;
      margin-bottom: 0;
    }
    .redes {
      width: 200px;
    }
  }
}

.divider {
  background: @daybreak-blue-9;
  margin-top: 45px;
  margin-bottom: 35px;
}

.pie_contenido-secundario {
  font-size: 12px;
  color: @gray;
  display: flex;
  flex-direction: column;
  .direccion {
    display: flex;
    flex-direction: column;
    line-height: 20px;
  }
  small {
    font-size: inherit;
  }
  @media (min-width: @screen-md-min) {
    flex-direction: row-reverse;
    justify-content: space-between;
    .direccion {
      flex-direction: row;
      &-item:not(:last-child) {
        margin-right: 2em;
      }
    }
  }
}
</style>
