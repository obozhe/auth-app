import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import React, { ReactNode, useState } from 'react';

type InputProps = {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
    startIcon?: IconDefinition;
    endAdornment?: ReactNode;
    autoComplete?: boolean;
    type?: string;
    error?: string | false;
};

const Input = ({
    name,
    label,
    value,
    type = 'text',
    autoComplete = false,
    startIcon,
    endAdornment,
    error,
    onBlur,
    onChange,
}: InputProps) => {
    const [isFocused, setFocused] = useState(false);
    return (
        <FormControl error={!!error}>
            <InputLabel variant="outlined" htmlFor={label + '-field'}>
                {label}
            </InputLabel>
            <OutlinedInput
                className="text-slate-600"
                name={name}
                id={label + '-field'}
                label={label}
                type={type}
                value={value}
                autoComplete={autoComplete ? 'on' : 'off'}
                startAdornment={
                    startIcon && (
                        <InputAdornment position="start">
                            <FontAwesomeIcon
                                className={error ? 'text-error' : isFocused ? 'text-primary' : ''}
                                icon={startIcon}
                            />
                        </InputAdornment>
                    )
                }
                endAdornment={endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={(e) => {
                    setFocused(false);
                    onBlur && onBlur(e);
                }}
            />
            <FormHelperText className="select-none">{error ? error : '\u00a0'}</FormHelperText>
        </FormControl>
    );
};

export default Input;
