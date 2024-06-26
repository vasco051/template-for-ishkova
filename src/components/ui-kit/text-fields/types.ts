import { InputHTMLAttributes, LegacyRef } from 'react';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperClassName?: string;
  validation?: boolean;
  reference?: LegacyRef<HTMLInputElement>;
}

export interface TextAreaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  wrapperClassName?: string;
  validation?: boolean;
  resizable?: boolean;
  reference?: LegacyRef<HTMLInputElement>;
}
