import type { App, Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export function withInstall<T extends { name?: string }>(component: T) {
  const install = (app: App) => {
    if (component.name) {
      app.component(component.name, component as any);
    }
  };

  return Object.assign(component, { install }) as SFCWithInstall<T>;
}
