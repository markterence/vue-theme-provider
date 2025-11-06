import type { BasicColorMode, BasicColorSchema, UseColorModeOptions } from '@vueuse/core';
import { createEventHook, useColorMode, usePreferredDark } from '@vueuse/core';
import { watch, computed, provide, type Ref } from 'vue';

export interface UseThemeProviderOptions<T extends string = BasicColorMode> extends Pick<UseColorModeOptions<T>, 'modes' | 'storageKey'> {}

export type UseThemeProviderReturn<T extends string = BasicColorMode>
  = Ref<T | BasicColorSchema> & {
    mode: Ref<T | BasicColorSchema>;
    setColorMode: (newMode: T) => void;
    isDark: Ref<boolean>;
    onThemeChange: (handler: (newMode: T | BasicColorSchema) => void) => void;
  };

export interface ThemeProviderContext<T extends string = BasicColorMode> extends UseThemeProviderReturn<T> {}

export const ThemeProviderSymbol = Symbol('ThemeProvider');

export function useThemeProvider<T extends string = BasicColorMode>(
  options: UseThemeProviderOptions<T> = {},
) {
  const changeModeResult = createEventHook<[T]>();

  const mode = useColorMode<T>({
    modes: options.modes,
    storageKey: options.storageKey,
  });

  const prefersDark = usePreferredDark();
  const isDark = computed(() => mode.value === 'dark' && prefersDark);

  function setColorMode(newMode: T) {
    mode.value = newMode;
  }

  watch(mode.state, (newMode) => {
    changeModeResult.trigger(newMode as T);
  });

  const colorMode = computed<T | BasicColorSchema>(() => mode.value);

  provide(ThemeProviderSymbol, {
    mode: mode.state,
    isDark,
    setColorMode,
    onThemeChange: changeModeResult.on,
  });

  return Object.assign(colorMode, {
    mode: mode.state,
    isDark,
    setColorMode,
    onThemeChange: changeModeResult.on,
  }) as UseThemeProviderReturn<T>;
}
