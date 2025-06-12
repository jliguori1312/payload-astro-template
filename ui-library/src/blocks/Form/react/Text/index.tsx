import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '#components/react/ui/input.tsx'
import { Label } from '#components/react/ui/label.tsx'
import React from 'react'

import { Error } from '../Error/index.tsx'
import { Width } from '../Width/index.tsx'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input defaultValue={defaultValue} id={name} type="text" {...register(name, { required })} />
      {errors[name] && <Error />}
    </Width>
  )
}
