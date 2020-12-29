module.exports = {
  publicPath: '/ap-cazana-vue-tech-task/',
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: ["/"],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
};
