import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import UserPaths from '../../../modules/user/consts/UserPaths';
import { fullName } from '../../../modules/user/helpers/user.helper';
import UserApi from '../../../modules/user/services/api/UserApi';
import { RootState } from '../../../store/store';
import Avatar from '../Avatar';

const UserActions = () => {
    const user = useSelector(({ user }: RootState) => user);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const anchorRef = React.useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    const UserActions = () => (
        <MenuItem
            className="text-gray-blue"
            key="logout"
            onClick={() => {
                UserApi.signOut().then(() => {
                    navigate(UserPaths.SignIn);
                    setOpen(false);
                });
            }}
        >
            <LogoutIcon className="mr-3" />
            Sign out
        </MenuItem>
    );

    const GuestActions = () => (
        <MenuItem
            className="text-gray-blue"
            key="login"
            onClick={() => {
                navigate(UserPaths.SignIn);
                setOpen(false);
            }}
        >
            <LoginIcon className="mr-3" />
            Sign In
        </MenuItem>
    );

    return (
        <div className="rounded-r" ref={anchorRef}>
            <Button className="square-icon-button w-10 h-10 text-gray-blue" onClick={handleToggle}>
                {user ? (
                    <Avatar variant="rounded" fullName={fullName(user)} />
                ) : (
                    <AccountBoxIcon className="w-10 h-10" />
                )}
            </Button>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                transition
                disablePortal
                placement="bottom-end"
                className="z-50"
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [4, 12],
                        },
                    },
                ]}
            >
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: 'center top' }}>
                        <Paper className="shadow-lg">
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem>{user ? <UserActions /> : <GuestActions />}</MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default UserActions;
