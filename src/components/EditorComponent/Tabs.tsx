import { createStyles } from '@/components/theme'
import type { TabsProps as Props } from 'antd'
import { Tabs as _Tabs } from 'antd'
import type { FC } from 'react'
import { ConfigProvider } from '../ConfigProvider'

const useStyles = createStyles(({ token, prefixCls, css, stylish }) => {
  const prefix = `.${prefixCls}-tabs`

  return {
    cls: css`
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
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
        height: 46px;
        padding: 0 12px;
        position: relative;
        flex: none;
        z-index: 10;
        width: 100%;
        ${stylish.backgroundBlur}
        margin: 0;
      }

      ${prefix}-content {
        height: 100%;
      }

      ${prefix}-tabpane-active {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      ${prefix}-content-holder {
        overflow-y: auto;
        padding: 8px 12px;
        flex: 1;
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
