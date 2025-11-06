# @hirameki/vue-theme-provider

A Vue 3 plugin for updating the class attribute on the HTML element based on the current theme (light/dark/custom). This also saves the user's theme preference in localStorage.

This uses VueUse API under the hood, however this was created to leverage the `provide/inject` api of Vue.


## Component Example Usage:

```vue
<template>
    <ThemeProvider 
        :modes="{
            'dark': 'app-dark',
            'coffee': 'coffee-theme',
            'tui': 'tui-theme',
        }"
        :storage-key="'myapp.theme'"
    > 
        <YourAppComponents />
    </ThemeProvider>
</template>
```

## Composables Example Usage:

```ts
import { useThemeProvider } from '@hirameki/vue-theme-provider'

const { mode, isDark, setColorMode } = useThemeProvider({
    modes: {
        'dark': 'app-dark',
        'coffee': 'coffee-theme',
        'tui': 'tui-theme',
    },
    storageKey: 'myapp.theme',
});

mode.value = 'dark',

```

## Development

- Install dependencies:

```bash
npm install
```

- Run the playground:

```bash
npm run playground
```

- Run the unit tests:

```bash
npm run test
```

- Build the library:

```bash
npm run build
```
