import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export const SignupFormInput = ({
    autoFocus,
    label,
    id,
    name,
    type
}: any) => {

    const { control, formState: { errors } } = useFormContext();

    return (
        <Controller
            defaultValue={""}
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    autoFocus={autoFocus}
                    fullWidth
                    id={id}
                    type={type}
                    label={label}
                    error={Object.hasOwnProperty.call(errors, name) ? true : false}
                    helperText={
                        Object.keys(errors)[0] ?
                            errors[name]?.message?.toString() : ""
                    }
                />
            )}
        />
    )
}
