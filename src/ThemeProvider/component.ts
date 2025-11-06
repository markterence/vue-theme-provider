import type { BasicColorSchema } from '@vueuse/core';
import type { Reactive, SlotsType } from 'vue';
import type { UseThemeProviderOptions, UseThemeProviderReturn } from './composable';

import {
  defineComponent,
  reactive,
} from 'vue';
import { useThemeProvider } from './composable';

export interface ThemeProviderSlots {
  default: (data: Reactive<
    {
      mode: UseThemeProviderReturn<BasicColorSchema>;
      isDark: UseThemeProviderReturn['isDark'];
      setColorMode: UseThemeProviderReturn['setColorMode'];
    }
  >) => any;
}

export interface ThemeProviderProps extends UseThemeProviderOptions {};

export const ThemeProvider = /* #__PURE__ */ defineComponent<
  ThemeProviderProps,
  Record<string, never>,
  string,
  SlotsType<ThemeProviderSlots>
>(
  (props, { slots }) => {
    const theme = useThemeProvider(props);

    const data = reactive({
      mode: theme,
      isDark: theme.isDark,
      setColorMode: theme.setColorMode,
    });

    return () => {
      if (slots.default) {
        return slots.default(data);
      }
    };
  },
  {
    name: 'ThemeProvider',
    props: [
      'modes',
      'storageKey',
    ],
  },
);
