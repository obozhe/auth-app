import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import React, { ReactNode } from 'react';

type Props = {
    className?: string;
    disabled?: boolean;
    color?: 'inherit' | 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning';
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: ReactNode;
    variant?: 'text' | 'outlined' | 'contained';
    title?: string;
    titlePlacement?:
        | 'top'
        | 'bottom-end'
        | 'bottom-start'
        | 'bottom'
        | 'left-end'
        | 'left-start'
        | 'left'
        | 'right-end'
        | 'right-start'
        | 'right'
        | 'top-end'
        | 'top-start';
};

const IconButton = ({
    disabled,
    className,
    color,
    onClick,
    children,
    titlePlacement = 'bottom',
    title = '',
    variant,
}: Props) => (
    <Tooltip placement={titlePlacement} title={title} disableInteractive>
        <span>
            <Button
                disabled={disabled}
                className={`square-icon-button${className ? ' ' + className : ''}`}
                color={color}
                variant={variant}
                onClick={(e) => {
                    onClick && onClick(e);
                }}
            >
                {children}
            </Button>
        </span>
    </Tooltip>
);

export default IconButton;
