import React, { memo } from 'react';
import { FieldProps, getIn } from 'formik';
import { TextField, TextFieldProps } from '@mui/material';

/**
 * Material TextField Component with Formik Support including Errors.
 * Intended to be specified via the `component` prop in a Formik <Field> or <FastField> component.
 * Material-UI specific props are passed through.
 */
export const FormTextField: React.FC<FieldProps & TextFieldProps> = function (props) {
  // const isTouched = getIn(props.form.touched, props.field.name)
  // const errorMessage = getIn(props.form.errors, props.field.name)

  // const { InputProps , error, helperText, field, form, ...rest } = props;
  const { InputProps, field, ...rest } = props;
  // console.log(InputProps)

  return (
    <TextField
      // variant="outlined"
      // error={error ?? Boolean(isTouched && errorMessage)}
      // helperText={helperText ?? ((isTouched && errorMessage) ? errorMessage : undefined)}
      InputProps={InputProps}
      {...rest}
      {...field}
    />
  )
}