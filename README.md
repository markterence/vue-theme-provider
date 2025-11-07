
<p align="center">
  <a href="https://npmjs.com/package/@hirameki/vue-theme-provider">
    <img src="https://badgen.net/npm/v/@hirameki/vue-theme-provider?color=orange" alt="npm package">
  </a>
</p>
<br/>

# vue-theme-provider

A Vue 3 utility for updating the class attribute on the HTML element based on the current theme (light/dark/custom). This also saves the user's theme preference in localStorage.

This uses VueUse API under the hood, however this was created to leverage the `provide/inject` api of Vue and act as top-level provider.

Demo/Playground: https://markterence.github.io/vue-theme-provider/

## Installation

```bash
# pnpm
pnpm add @hirameki/vue-theme-provider

# npm
npm install @hirameki/vue-theme-provider
```

## Component Example Usage

```vue
<template>
  <ThemeProvider
    :modes="{
      dark: 'app-dark',
      coffee: 'coffee-theme',
      tui: 'tui-theme',
    }"
    storage-key="myapp.theme"
  >
    <YourAppComponents />
  </ThemeProvider>
</template>
```

On the child components, you can use the `useThemeProviderInject` composable to access the theme provider.

```vue
<script setup lang="ts">
const theme = useThemeProviderInject()
theme.onThemeChange((newMode) => {
  console.log(`Theme changed to: ${JSON.stringify(newMode)}`)
})

theme.value = 'dark' // sets to dark mode, adds 'app-dark' class to html element

const isDark = computed(() => theme.isDark.value) // true
const state = computed(() => theme.state.value) // 'dark'
const system = computed(() => theme.system.value) // 'dark'
const store = computed(() => theme.store.value) // 'dark'
const currentModeValue = computed(() => theme.currentModeValue.value) // 'app-dark'
</script>
```

> [!WARNING]
> Do not use the `useThemeProvider()` repeatedly on child components to access the state, instead use `useThemeProviderInject()` to access the state on other components.
> The `useThemeProvider()` and the `<ThemeProvider>` component must be used on the top-level or on your applications entrypoint. 
> If it was used repeatedly this will create another state and will create the default values on the local storage and will not use the main configuration.


## Composables Example Usage

```ts
import { useThemeProvider } from '@hirameki/vue-theme-provider'

const theme = useThemeProvider({
  modes: {
    dark: 'app-dark',
    coffee: 'coffee-theme',
    tui: 'tui-theme',
  },
  storageKey: 'myapp.theme',
})

theme.onThemeChange((newMode) => {
  console.log(`Theme changed to: ${JSON.stringify(newMode)}`)
})

theme.value = 'dark' // sets to dark mode, adds 'app-dark' class to html element

const isDark = computed(() => theme.isDark.value) // true
const state = computed(() => theme.state.value) // 'dark'
const system = computed(() => theme.system.value) // 'dark'
const store = computed(() => theme.store.value) // 'dark'
const currentModeValue = computed(() => theme.currentModeValue.value) // 'app-dark'
```

## :heart: Support :heart:

[![GitHub][github-badge]][github-sponsors] - Become a Sponsor on GitHub. One time support, or a recurring donation

[![Paypal][paypal-badge]][paypal] - One-time donation via PayPal

<!-- markdownlint-disable no-inline-html -->
<p align="center">
  <img src="https://hoshizora.markterence.me/github-stargazers/markterence/vue-theme-provider?show_usernames=1&v=1" align="center" alt="stargazers"/>
</p>

---

## Development

- Install dependencies:

```bash
pnpm install
```

- Run the playground:

```bash
pnpm run playground
```

- Run the unit tests:

```bash
pnpm run test
```

- Build the library:

```bash
pnpm run build
```

## License

[MIT License](LICENSE)© Mark Terence Tiglao - 2025

---

[github-badge]: https://img.shields.io/badge/-Github%20Sponsor-fafbfc?logo=GitHub%20Sponsors
[github-sponsors]: https://github.com/sponsors/markterence
[paypal-badge]: https://img.shields.io/badge/-Paypal-002991?logo=Paypal
[paypal]: https://paypal.me/MarkTerenceTiglao
