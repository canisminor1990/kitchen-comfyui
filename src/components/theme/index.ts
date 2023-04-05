import { StudioStylish, StudioThemeToken } from './themes'

export const STUDIO_UI_PREFIX = 'antd'

export function getPrefixCls(suffixCls: string, customizePrefixCls?: string) {
  if (customizePrefixCls) return customizePrefixCls

  return suffixCls ? `${STUDIO_UI_PREFIX}-${suffixCls}` : STUDIO_UI_PREFIX
}

declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends StudioThemeToken {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomStylish extends StudioStylish {}
}

export const emptyImg =
  'data:image/webp;base64,UklGRnwFAABXRUJQVlA4WAoAAAAAAAAA/wEA/wEAVlA4IAgFAABQSACdASoAAgACAAAAJaW7hd2Eb84fxL/Fu2b+3YoPsf85/K75gdgO0n/cPKfeDJcf6jjA7zHCYHQ/3j/dfc97KfnX/r+4J/Mv6V/zesX+2XsH/p8mnzJ402iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iY02iBvOWQB3qAPUMTgyeNNomNNomNNo/WuFENRaRU20KzdBk8abRMabRMabZptNKNjzbhNu1hd33Bk8abRMabRMaqb/Kw49SfJ6z/CJMabRMabRMabZmhIYfVFsmHjNZuDy16fMnjTaJjVTjPW0tTJZLHerBQmq0eatO2jHzJ402iY05WHL7+aif7qE1/IHlqJjp8yeNNomNNomOgT5lutenzJ402iY02iiNGPr6y16fMnjTaJjTV4XIBX7qr95uFey16fMnjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJjTaJh4AD+/+LjAAAAAAAAAAAC0rN37fkv7KNTSn+uqCrzce+ZFY+V2wLrwyvKnVnbWsbOXsdMkV78wpw6M5Ht0icrihssgqb5WJa130AMfeLeJ9cO1J09zwdzkLrF52YniIAf5by1ZJR0mRk5V3PL+ibKQy+xwP5TV+T4ump0K+LkZ+wBab78G4GSS/dSUn/muJIrSr1FKYQ2z+Oo/1cghL9BNsO6vmEYog/O+yhpCY29bMR0CXQYvzdg1F/tafnPHYkanS7zfqAUdz9T3liqmBomByf/0xab8CFnMjcUb+WakMeqRZmABEgjvkA0mKYwg38SWQh7/Vuo//EecvnIIU6s8PM/JtA563guvz/n96OwlyoBcJalNQg6XtTNvSAsoHYSMKv/MVt4tAew6OEoZPM7F0GglgJvJ9GZ1dQk/25kMpL351DoZAQ6rfvOizEs4ZuRe6hf/3HsGMMDbaPof/2ceBdX1Le/n4LtHkSExFcCQWXa/vLxe8xfHzvCfoWEH90DfhRSroCMjPo6VU/HbZqBX+ofhRw7+ZbW0v+jwjr24CaaKw0kd2zmn/hhn8Rqx/uUN9yZMB/pn3Bc8ThOFm7xZychuV93W7Q4q7IUHOFjTr3n4JuG+vn47m+DBSGXJL2jhcl0WB0cgW7Yw6xTQgWSBdJ67I/u/AKgIJTyPm2HzqrEx2sT5jp3uoehUB2ASMh4KwpBwVcIjeGYJ+/ICdC2AhxQiD5Rg7H2q+ggI00qhr0tQF9qrx2dAY2PwDASTq8cVMBwYpcMGadEMF7lQWxQv8sZ3YnQu0hWYSk6UE74i2ZSOL+0U4uWD5aUD92da9jCSaecnVKDk2U+mSLuEAAHPkRqknB/sBsy8YFWtSs0TSucCwKYBFVkOe0PikbUHR8/KX9OXKmcZgZDi4+9Phq53iAupQAAAAAAAAAAAAAAUFNBSU4AAAA4QklNA+0AAAAAABAASAAAAAEAAgBIAAAAAQACOEJJTQQoAAAAAAAMAAAAAj/wAAAAAAAAOEJJTQRDAAAAAAAOUGJlVwEQAAYAZAAAAAA='

export {
  ThemeProvider,
  createGlobalStyle,
  createStyles,
  css,
  cx,
  injectGlobal,
  keyframes,
  useAntdToken as useToken,
  type AntdToken,
  type GetAntdThemeConfig,
  type ThemeAppearance,
  type ThemeMode,
} from 'antd-style'
export * from './themes'
