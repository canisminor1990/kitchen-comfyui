import { createStyles } from '@/components/theme'
import type { TabsProps as Props } from 'antd'
import { Tabs as _Tabs } from 'antd'
import type { FC } from 'react'
import { ConfigProvider } from '../ConfigProvider'

const useStyles = createStyles(({ token, prefixCls, css, stylish }) => {
  const prefix = `.${prefixCls}-tabs`

  return {
    cls: css`
      position: relative;

      display: flex;
      flex: 1;
      flex-direction: column;

      max-height: 100%;

      ${prefix}-tab + ${prefix}-tab {
        margin: 8px 4px !important;
        padding: 0 12px !important;
      }

      ${prefix}-tab {
        color: ${token.colorTextSecondary};
        transition: background-color 150ms ease-out;

        &:first-child {
          margin: 8px 4px 8px 0;
          padding: 4px 12px !important;
        }

        &:hover {
          color: ${token.colorText} !important;
          background: ${token.colorFillTertiary};
          border-radius: 4px;
        }
      }

      ${prefix}-nav {
        position: relative;
        z-index: 10;

        flex: none;

        width: 100%;
        height: 46px;
        margin: 0;
        padding: 0 12px;

        ${stylish.backgroundBlur};
      }

      ${prefix}-content {
        height: 100%;
      }

      ${prefix}-tabpane-active {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      ${prefix}-content-holder {
        overflow-y: auto;
        flex: 1;
        padding: 8px 12px;
      }
    `,
  }
})

export type TabsProps = Props

export const Tabs: FC<TabsProps> = (props) => {
  const { styles, cx } = useStyles()

  return (
    <ConfigProvider>
      <_Tabs {...props} className={cx(props.className, styles.cls)} />
    </ConfigProvider>
  )
}
