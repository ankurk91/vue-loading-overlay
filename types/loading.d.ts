import {ExtendedVue} from 'vue/types/vue'
import {PluginFunction} from 'vue'

export interface LoaderComponent extends ExtendedVue<any, any, any, any, any> {
  hide(): void
}

export type LoaderType = 'spinner' | 'dots' | 'bars'

export interface PluginOptions {
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
  blur?: string,
  container?: Object | HTMLElement | Function,
}

export interface Slots {
  default?: any
  before?: any
  after?: any
}

export interface PluginApi {
  show(options?: PluginOptions, slots?: Slots): LoaderComponent
}

declare class LoadingPlugin {
  static install: PluginFunction<PluginOptions>
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $loading: PluginApi
  }

  interface VueConstructor {
    readonly $loading: PluginApi
  }
}

export default LoadingPlugin
