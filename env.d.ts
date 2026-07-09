declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
  export default component;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare global {
  const $cloneDeep: typeof import('lodash')['cloneDeep'];
  const $toast: typeof import('vant')['showToast'];
  const $uploadFile: ((options: any) => Promise<any>) | undefined;
  const $loading: {
    open: () => void;
    close: (num?: number) => void;
    clear?: () => void;
  };

  interface Window {
    Vue?: any;
    $toast?: typeof import('vant')['showToast'];
    $uploadFile?: (options: any) => Promise<any>;
    $getFileType?: (suffix?: string) => string;
    $loading?: {
      open: () => void;
      close: (num?: number) => void;
      clear?: () => void;
    };
  }
}

export {};
