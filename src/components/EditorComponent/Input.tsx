import { createStyles } from '@/components/theme'
import type { InputProps as Props } from 'antd'
import { Input as _Input } from 'antd'
import type { TextAreaProps } from 'antd/es/input/TextArea'
import type { FC } from 'react'
import { ConfigProvider } from '../ConfigProvider'

export type InputProps = Props

const useStyles = createStyles(
  ({ stylish, css }) => css`
    ${stylish.controlContainer}
  `
)

export const Input: FC<InputProps> = ({ className, ...props }) => {
  const { styles, cx } = useStyles()

  return (
    <ConfigProvider>
      <_Input {...props} className={cx(styles, className)} />
    </ConfigProvider>
  )
}

const _TextArea = _Input.TextArea

export const TextArea: FC<TextAreaProps> = ({ className, ...props }) => {
  const { styles, cx } = useStyles()

  return (
    <ConfigProvider>
      <_TextArea {...props} className={cx(styles, className)} />
    </ConfigProvider>
  )
}
