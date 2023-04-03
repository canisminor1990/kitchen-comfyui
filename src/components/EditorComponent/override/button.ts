import { createGlobalStyle, STUDIO_UI_PREFIX } from '@/components/theme'

export const OverrideButton = createGlobalStyle`
  .${STUDIO_UI_PREFIX}-btn-solid {
    ${(p) => p.theme.stylish.defaultButton}
  }
`
