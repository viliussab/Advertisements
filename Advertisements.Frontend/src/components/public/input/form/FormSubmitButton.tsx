import React from 'react';
import Mui from './../../../../config/imports/Mui';

type FormSubmitButtonProps = {
  children: React.ReactNode;
  isSubmitting: boolean;
};

function FormSubmitButton({ children, isSubmitting }: FormSubmitButtonProps) {
  if (isSubmitting) {
    return (
      <Mui.Button type="submit">
        <Mui.CircularProgress size={24} />
      </Mui.Button>
    );
  }

  return (
    <>
      <Mui.Button type="submit" variant="contained">
        {children}
      </Mui.Button>
    </>
  );
}

export default FormSubmitButton;
