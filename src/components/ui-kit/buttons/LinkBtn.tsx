import { FC } from 'react';

import clsx from 'clsx';

import { ButtonTheme, ButtonVariant, TLinkButtonProps } from './types';

import styles from './Button.module.scss';
import {Link} from 'react-router-dom';

export const LinkBtn: FC<TLinkButtonProps> = ({
  theme = ButtonTheme.FILLED,
  variant = ButtonVariant.SQUARE,
  isShort = false,
  withAnimation = false,
  isExternal = false,
  className = '',
  icon,
  children,
  ...props
}) => {
  const buttonStyle: string = clsx(styles.button, {
    [className]: className,
    // colors
    [styles.filled]: theme === ButtonTheme.FILLED,
    [styles.outlined]: theme === ButtonTheme.OUTLINED,
    [styles.blur]: theme === ButtonTheme.BLUR,
    [styles.white]: theme === ButtonTheme.WHITE,
    // variants
    [styles.square]: variant === ButtonVariant.SQUARE,
    [styles.rounded]: variant === ButtonVariant.ROUNDED,
    // another
    [styles.shortSquare]: variant === ButtonVariant.SQUARE && isShort,
    [styles.shortRounded]: (variant === ButtonVariant.ROUNDED && isShort) || withAnimation,
    [styles.withAnimation]: withAnimation,
  });



  return (
    isExternal
      ? (
        // @ts-ignore
        <a className={buttonStyle} {...props}>
          {icon && <span className={styles.iconWrapper}>{icon}</span>}
          {children && <span className={styles.text}>{children}</span>}
        </a>
      )
      : (
        <Link className={buttonStyle} {...props}>
          {icon && <span className={styles.iconWrapper}>{icon}</span>}
          {children && <span className={styles.text}>{children}</span>}
        </Link>
      )
  );
};