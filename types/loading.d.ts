import {Plugin} from 'vue'
import {ComponentInternalInstance} from "@vue/runtime-core";

export interface LoaderComponent extends ComponentInternalInstance {
  hide(): void
}

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
  blur?: string,
  container?: Object | HTMLElement | Function,
}

export interface Slots {
  default?: any
  before?: any
  after?: any
}

export interface PluginApi {
  show(props?: Props, slots?: Slots): LoaderComponent
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    readonly $loading: PluginApi;
  }
}

declare class LoadingPlugin {
  static install: Plugin<Props>
}

export default LoadingPlugin
