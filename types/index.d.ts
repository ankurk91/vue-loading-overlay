import type {App, DefineComponent} from 'vue'

export type LoaderType = 'spinner' | 'dots' | 'bars'

export interface Props {
  active?: boolean,
  canCancel?: boolean,
  onCancel?: () => any,
  isFullPage?: boolean,
  transition?: string,
  color?: string,
  height?: number,
  width?: number,
  loader?: LoaderType | string,
  backgroundColor?: string,
  opacity?: number,
  zIndex?: number,
  enforceFocus?: boolean,
  lockScroll?: boolean,
  pauseOnHover?: boolean,
  container?: Object | HTMLElement | Function,
}

export interface Slots {
  default?: any
  before?: any
  after?: any
}

export interface ActiveLoader {
  hide(): void
}

export interface PluginApi {
  show(props?: Props, slots?: Slots): ActiveLoader
}

declare module 'vue' {
  interface ComponentCustomProperties {
    readonly $loading: PluginApi;
  }
}

declare const LoadingPlugin: (app: App, props?: Props, slots?: Slots) => void
declare const Component: DefineComponent<Props, {}, {}, {}, {}, {}, {}, { 'hide': () => void, 'update:active': (value: boolean) => void }>

declare function useLoading(globalProps?: Props, globalSlots?: Slots): PluginApi

export {LoadingPlugin, Component, useLoading};

export default Component
