import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';

import Input from '../../../shared/components/Input';
import { AuthenticationProps } from '../consts/AuthenticationProps';

type Props = {
    name: AuthenticationProps;
    label: string;
    value: string;
    startIcon: IconDefinition;
    error?: string | false;
    onChange: (e: React.ChangeEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
};

const PasswordField = ({ value, label, name, startIcon, error, onChange, onBlur }: Props) => {
    const [isPasswordVisible, togglePasswordVisibility] = useState(false);

    return (
        <Input
            name={name}
            label={label}
            type={isPasswordVisible ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={false}
            startIcon={startIcon}
            error={error}
            endAdornment={
                value ? (
                    <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={() => togglePasswordVisibility(!isPasswordVisible)}
                    >
                        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                    </IconButton>
                ) : null
            }
        ></Input>
    );
};

export { PasswordField };
