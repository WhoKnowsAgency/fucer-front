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
    title: "La normativa registral, en una base de datos única en el país",
    titleTemplate: "%s | Fucer",
    htmlAttrs: {
      lang: "es",
    },
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Fucer es una herramienta digital en la que encontrará el texto completo de las principales Disposiciones complementarias y Circulares aclaratorias del Digesto, con un breve resumen del contenido de las mismas, y diversos artículos de doctrina y jurisprudencia.",
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
  ],

  axios: {
    baseURL: `${process.env.DEPLOY_PRIME_URL || "https://fucer.com.ar"}/api/`,
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/auth/login", method: "post", propertyName: "token" },
          logout: { url: "/auth/logout", method: "post" },
          user: { url: "/auth/user", method: "get", propertyName: "user" },
          refreshToken: {
            url: "/auth/refresh-token",
            method: "get",
            propertyName: "token",
          },
        },
        refresh_token_key: "refresh_token",
      },
    },
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/login",
      home: "/inicio",
    },
    cookie: {
      options: {
        domain: process.env.DEPLOY_PRIME_URL
          ? process.env.DEPLOY_PRIME_URL.replace("https://", "")
          : "net.fucer.com.ar",
        secure: process.env.NODE_ENV === "production",
        samesite: process.env.NODE_ENV !== "production" ? "None" : "Strict",
      },
    },
  },

  plugins: [
    "~/plugins/axios",
    "~/plugins/focus",
    { src: "~/plugins/announcer", mode: "client" },
    "~/plugins/filtros",
    { src: "~/plugins/sentry", mode: "client" },
    { src: "~/plugins/utils", mode: "client" },
    { src: "~/plugins/axe", mode: "client" },
    "~/plugins/ant-design-vue",
  ],

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
