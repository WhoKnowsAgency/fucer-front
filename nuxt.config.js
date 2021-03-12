export default {
  ssr: false,

  target: "static",

  components: true,

  modern: false,

  generate: {
    fallback: "404.html",
    devtools: true,
  },

  /*
   ** Headers of the page
   */
  head: {
    title: "",
    titleTemplate: "%s | Fucer",
    htmlAttrs: {
      lang: "es",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "",
      },
      { name: "msapplication-TileColor", content: "#2b5797" },
    ],
    link: [
      /* eslint-disable-next-line sonarjs/no-duplicate-string */
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
    ],
  },

  css: ["assets/less/main.less"],

  loading: { color: "#4ECDC4", height: "4px" },

  // Docs: https://www.npmjs.com/package/@nuxtjs/style-resources
  styleResources: {
    less: ["~/assets/less/vars.less", "~/assets/less/fucer-theme.less"],
  },

  // Docs: https://www.npmjs.com/package/@nuxtjs/toast
  toast: {
    position: "bottom-center",
    type: "success",
    duration: 5000,
    fullWidth: true,
    fitToScreen: true,
  },

  // https://github.com/Developmint/nuxt-webfontloader
  webfontloader: {
    custom: {
      families: ["Lora:n4,n7", "Lato:n4,n7,n9"],
      urls: [
        "https://fonts.googleapis.com/css?family=Lora:400,700&display=swap",
        "https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap",
      ],
    },
  },

  modules: [
    "@nuxtjs/auth",
    "@nuxtjs/axios",
    "nuxt-webfontloader",
    "@nuxtjs/style-resources",
    "@nuxtjs/toast",
    [
      "nuxt-facebook-pixel-module",
      {
        track: "PageView",
        pixelId: "186147059968707",
        autoPageView: true,
        disabled: false,
      },
    ],
  ],

  axios: {
    debug: true,
    proxy: true,
  },

  proxy: {
    "/api/": {
      target: "https://www.fucer.com.ar/",
    },
  },

  auth: {
    rewriteRedirects: true,
    redirect: {
      login: "/auth/login",
      logout: "/",
      callback: false,
      home: "/campus",
    },
    cookie: {
      options: {
        domain: process.env.DEPLOY_PRIME_URL
          ? process.env.DEPLOY_PRIME_URL.replace("https://", "")
          : "localhost",
        secure: process.env.NODE_ENV === "production",
        samesite: "Strict",
      },
    },
  },

  plugins: [
    "~/plugins/axios",
    "~/plugins/api",
    "~/plugins/focus",
    "~/plugins/vee-validate",
    { src: "~/plugins/announcer", mode: "client" },
    { src: "~/plugins/masonry", mode: "client" },
    "~/plugins/filtros",
    { src: "~/plugins/sentry", mode: "client" },
    { src: "~/plugins/utils", mode: "client" },
    // { src: "~/plugins/axe", mode: "client" },
  ],

  router: {
    middleware: ["auth"],
    extendRoutes(routes) {
      routes.splice(
        0,
        routes.length,
        ...routes.map((route) => {
          if (route.name === "auth-activar-cuenta") {
            return {
              ...route,
              path: "/auth/activar-cuenta/:token",
            };
          }
          if (route.name === "auth-cambiar-clave") {
            return {
              ...route,
              path: "/auth/cambiar-clave/:token",
            };
          }
          return route;
        })
      );
    },
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Docs: https://marquez.co/docs/nuxt-optimized-images/
    [
      "@aceforth/nuxt-optimized-images",
      {
        optimizeImages: true,
      },
    ],
  ],

  /*
   ** Build configuration
   */
  build: {
    devtools: true,

    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          math: "always",
        },
      },
    },

    // https://logaretm.github.io/vee-validate/guide/rules.html#importing-rules-in-nuxt-js
    transpile: ["vee-validate/dist/rules", "@nuxtjs/auth"],

    /*
     ** Run ESLint on save
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
