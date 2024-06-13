import { FC } from 'react';
import clsx from 'clsx';

import { ButtonTheme, ButtonVariant, TButtonProps } from './types';

import styles from './Button.module.scss';

export const Button: FC<TButtonProps> = ({
  theme = ButtonTheme.FILLED,
  variant = ButtonVariant.SQUARE,
  isShort = false,
  withAnimation = false,
  className = '',
  reference,
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
    [styles.grey]: theme === ButtonTheme.GREY,
    [styles.greyOutline]: theme === ButtonTheme.GREY_OUTLINE,
    [styles.danger]: theme === ButtonTheme.DANGER,
    [styles.dangerOutline]: theme === ButtonTheme.DANGER_OUTLINE,
    // variants
    [styles.square]: variant === ButtonVariant.SQUARE,
    [styles.rounded]: variant === ButtonVariant.ROUNDED,
    // another
    [styles.shortSquare]: variant === ButtonVariant.SQUARE && isShort,
    [styles.shortRounded]: (variant === ButtonVariant.ROUNDED && isShort) || withAnimation,
    [styles.withAnimation]: withAnimation,
  });

  return (
    <button ref={reference} className={buttonStyle} {...props}>
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      {children && <span className={styles.text}>{children}</span>}
    </button>
  );
};