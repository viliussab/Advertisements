import React from 'react';
import Mui from './../../../../config/imports/Mui';

type FormSubmitButtonProps = {
  children: React.ReactNode;
  isSubmitting: boolean;
  buttonProps?: Mui.ButtonProps;
};

function FormSubmitButton({
  children,
  isSubmitting,
  buttonProps,
}: FormSubmitButtonProps) {
  if (isSubmitting) {
    return (
      <Mui.Button type="submit" {...buttonProps}>
        <Mui.CircularProgress size={24} />
      </Mui.Button>
    );
  }

  return (
    <>
      <Mui.Button type="submit" {...buttonProps} variant="contained">
        {children}
      </Mui.Button>
    </>
  );
}

export default FormSubmitButton;
