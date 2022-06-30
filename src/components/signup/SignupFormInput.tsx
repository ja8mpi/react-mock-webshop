import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export const SignupFormInput = ({
    autoFocus,
    label,
    id,
    name
}: any) => {

    const { control, formState: { errors } } = useFormContext();

    console.log(errors[name]?.message)

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
