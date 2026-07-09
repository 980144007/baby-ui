import { reactive } from 'vue';

const deviceState = reactive({
  isLandscape: false,
  isFullScreen: false,
});

export function useDeviceInfo() {
  return {
    ...deviceState,
    change(obj: Partial<typeof deviceState> = {}) {
      Object.assign(deviceState, obj);
    },
    changeFullScreen(isFullScreen = !deviceState.isFullScreen) {
      deviceState.isFullScreen = isFullScreen;
    },
    rotateScreen(isLandscape = !deviceState.isLandscape) {
      deviceState.isLandscape = isLandscape;
    },
  };
}

export function useMain() {
  return {
    get fileHead() {
      return import.meta.env.VITE_API_FILE_URL || '';
    },
    get isPc() {
      return !/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    },
  };
}
