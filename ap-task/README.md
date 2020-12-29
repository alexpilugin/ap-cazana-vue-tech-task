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

### Publish on GitHub Pages

1. Uncomment or delete ```/dist``` or ```dist/``` folder from **.gitignore** files
2. Create a new local branch and name it **gh-pages** (```git branch gh-pages```)
3. Go to github and copy the name of the repository
4. Create a new **vue.config.js** file in a root directory of the project
5. In ‘vue.config.js’ file paste the following code:
```
/* vue.config.js */
module.exports = {
  publicPath: '/my-repo-name/'
}
```
6. Run ```$ npm run build```, and wait for it to finish.
7. Add new files to git: ```git add .``` (with dot symbol)
8. Commit new files: ```git commit -m "Initial dist subtree commit"``
9. Upload the dist folder in the remote "gh-pages" branch: ```git subtree push --prefix dist origin gh-pages```
10. Navigate to your github repository in your browser and click **"Settings"** icon
11. Scroll and find the section GitHub Pages. Select the **"gh-pages"** branch and click **Save**