import type { InputProps as Props } from 'antd';
import { Input as _Input } from 'antd';
import type { FC } from 'react';
import { ConfigProvider } from './ConfigProvider';
import { createStyles } from '@/components/theme';

export type InputProps = Props;

const useStyles = createStyles(
  ({ stylish, css }) => css`
    ${stylish.controlContainer}
  `,
);

export const Input: FC<InputProps> = ({ className, ...props }) => {
  const { styles, cx } = useStyles();

  return (
    <ConfigProvider>
      <_Input {...props} className={cx(styles, className)} />
    </ConfigProvider>
  );
};
