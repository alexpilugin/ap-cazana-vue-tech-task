# ap-task

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## How to create Simple Static Website With Vue.js CLI and prerender-spa-plugin

### Convert Vue.js to static html

[vue-cli-plugin-prerender-spa](https://github.com/SolarLiner/vue-cli-plugin-prerender-spa) is a vue plugin which allow pre-rendering of the Vue application. It is based on [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin).

Just install the plugin and answer a few question.
```
vue add prerender-spa
```
The pre-rendered html will be generated when you run the build.
```
npm run build
```
