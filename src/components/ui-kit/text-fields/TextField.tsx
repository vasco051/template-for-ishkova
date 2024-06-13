'use client'

import {FC} from 'react';
import clsx from 'clsx';

import {TextFieldProps} from './types';

import styles from './TextFields.module.scss';

export const TextField: FC<TextFieldProps> = ({
                                                id,
                                                label,
                                                validation,
                                                disabled,
                                                reference,
                                                className = '',
                                                wrapperClassName = '',
                                                placeholder = ' ',
                                                ...props
                                              }) => {
  const wrapperStyle = clsx(styles.wrapper, {
    [wrapperClassName]: !!wrapperClassName,
    [styles.disabled]: !!disabled
  });

  const textFieldStyle = clsx(styles.input, {
    [className]: !!className,
    [styles.validation]: !!validation
  });

  return (
    <div className={wrapperStyle}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={id}
        ref={reference}
        disabled={disabled}
        placeholder={placeholder}
        className={textFieldStyle}
        {...props}
      />
    </div>
  );
};
