import type { InjectionKey, Ref } from 'vue';

export type PreviewPayload = {
  title: string;
  code: string;
};

export type PlaygroundContext = {
  activeCode: Ref<string>;
  setPreview: (payload: PreviewPayload) => void;
};

export const playgroundKey: InjectionKey<PlaygroundContext> = Symbol('playground');
