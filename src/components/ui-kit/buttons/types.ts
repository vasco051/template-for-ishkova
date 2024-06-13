import {ButtonHTMLAttributes, HTMLAttributeAnchorTarget, LegacyRef, PropsWithRef, ReactNode} from 'react';
import {LinkProps} from 'react-router-dom';

export enum ButtonTheme {
  OUTLINED = 'outlined',
  FILLED = 'filled',
  BLUR = 'blur',
  WHITE = 'white',
  GREY = 'grey',
  GREY_OUTLINE = 'greyOutline',
  DANGER = 'danger',
  DANGER_OUTLINE = 'dangerOutline',
}

export enum ButtonVariant {
  SQUARE = 'square',
  ROUNDED = 'rounded'
}

export interface IButtonStylesProps {
  theme?: ButtonTheme;
  variant?: ButtonVariant;
  icon?: ReactNode;
  isShort?: boolean;
  withAnimation?: boolean;
}

export type TButtonProps = PropsWithRef<ButtonHTMLAttributes<HTMLButtonElement> & IButtonStylesProps> & {
  reference?: LegacyRef<HTMLButtonElement>;
}

export type TLinkButtonProps = LinkProps & IButtonStylesProps & {
  isExternal?: boolean;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  children: ReactNode;
};
