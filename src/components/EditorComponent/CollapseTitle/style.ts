import { createStyles, css, cx } from '@/components/theme'

// @ts-ignore
export const useStyles = createStyles(({ token, stylish }, { prefixCls, className, showPanel }) => {
  return {
    container: cx(
      prefixCls,
      className,
      showPanel
        ? css`
            margin-bottom: 8px;
            padding: 6px 8px 12px 8px;
            background: ${token.colorFillQuaternary};
            border-radius: 4px;
          `
        : ''
    ),

    header: cx(
      showPanel ? `${prefixCls}-expand` : `${prefixCls}-collapsed`,
      showPanel
        ? ''
        : css`
            user-select: none;
            padding: 6px 8px;
            border-radius: 4px;
            ${stylish.containerBgL2}
          `
    ),

    title: cx(
      css`
        height: 24px;
      `,
      showPanel
        ? css`
            user-select: none;
            margin-left: -4px;
            padding: 4px;
            border-radius: 4px;

            ${stylish.containerBgHover}
          `
        : ''
    ),
  }
})
