export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s",
    title: "My-chess",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://maps.googleapis.com/maps/api/js?key=&libraries=places&language=en",
      },
      // {
      //   src: "https://pixelfield.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/-fzx0du/b/3/9edb822e6c4db3635f27806476c088cb/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=cs-CZ&collectorId=16800e1d",
      // },
      // {
      //   src: "?collectorId=16800e1d",
      // },
    ],
  },

  ssr: false,

  transition: "home",

  loading: { color: "#C7417B" },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "vue-slick-carousel/dist/vue-slick-carousel-theme.css",
    "vue-slick-carousel/dist/vue-slick-carousel.css",
  ],

  axios: {
    baseURL: process.env.SERVER_URL || "https://api-dev.my-chess.com",
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/axios", mode: "client" },
    { src: "~/plugins/chessBoard", mode: "client" },
    { src: "~/plugins/vueEllipseProgress", mode: "client", ssr: false },
    { src: "@plugins/vue-draggable-resizable", ssr: false },
    { src: "@plugins/progressBar", mode: "client" },
    { src: "@plugins/vue-slick-carousel", mode: "client" },
    { src: "~plugins/vue-google-oauth2", ssr: false },
    // { src: "~/plugins/vuex-persist", ssr: false },
    { src: "~/plugins/toast.js", mode: "client" },
    { src: "~/plugins/pluralization.js", mode: "client" },
    { src: "~/plugins/fittext.js", mode: "client" },
    { src: "~/plugins/route.js", mode: "client" },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    ...(process.env.DEV === "1" ? [] : ["@nuxtjs/eslint-module"]),
    "@nuxtjs/style-resources",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
  ],

  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      home: false,
    },
    strategies: {
      local: {
        token: {
          property: "access",
          required: true,
          type: "Bearer",
        },
        user: {
          property: "",
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: "/api/users/auth/",
            method: "post",
            propertyName: "access",
          },
          user: {
            url: "/api/users/detail/",
            method: "get",
            propertyName: false,
          },
          logout: false,
        },
      },
    },
  },

  i18n: {
    locales: [
      {
        code: "cs",
        file: "cs.js",
      },
      {
        code: "en",
        file: "en.js",
      },
    ],
    lazy: true,
    langDir: "lang/",
    defaultLocale: "cs",
    strategy: "no_prefix",
    noPrefixDefaultLocale: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      onlyOnRoot: true, // recommended
    },
  },

  toast: {
    position: "top-center",
    duration: 4000,
    keepOnHover: true,
    fullWidth: true,
    action: {
      text: "Close",
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      },
    },
  },

  router: {
    middleware: ["auth"],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    "@nuxtjs/vuetify",
    "@nuxtjs/axios",
    "@nuxtjs/svg",
    "@nuxtjs/auth-next",
    "@nuxtjs/toast",
    "nuxt-i18n",
    "nuxt-moment",
  ],

  styleResources: {
    scss: ["~/assets/scss/definitions.scss"],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    parallel: true,
    cache: true,
    // transpile: ["arrow-line"],
  },
};
