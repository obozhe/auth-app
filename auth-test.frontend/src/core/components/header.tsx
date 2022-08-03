import { faArrowRightFromBracket, faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserRoles } from '../../modules/user/consts/user-roles';
import UserApi from '../../modules/user/services/user-api';
import Avatar from '../../shared/components/avatar';
import { RootState } from '../../store/store';

const Header = () => {
    const user = useSelector(({ user }: RootState) => user);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);

    if (!user) {
        return <></>;
    }

    const isAdmin = user.role === UserRoles.Admin;

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    return (
        <div className="w-full p-4">
            <div className="flex justify-between bg-soft-white rounded shadow-lg p-1">
                <div className="flex justify-between items-center ">
                    <Link to="/" className="font-bold px-4 select-none">
                        <span className="font-bold font-gothic text-2xl text-gray-blue logo">OBOZHE</span>
                    </Link>
                </div>
                <div className="flex justify-between items-center">
                    {isAdmin && (
                        <Tooltip title="Admin page">
                            <Link to="/admin">
                                <Button className="square-icon-button w-10 h-10 mr-1 text-gray-blue">
                                    <FontAwesomeIcon size="lg" icon={faCrown} />
                                </Button>
                            </Link>
                        </Tooltip>
                    )}
                    <div className="rounded-r" ref={anchorRef}>
                        <Button className="square-icon-button w-10 h-10 text-gray-blue" onClick={handleToggle}>
                            <Avatar variant="rounded" fullName={user.firstName + ' ' + user.lastName} />
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
                                            <MenuList autoFocusItem>
                                                <MenuItem
                                                    className="text-gray-blue"
                                                    key="logout"
                                                    onClick={() => {
                                                        UserApi.signOut();
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <FontAwesomeIcon className="mr-3" icon={faArrowRightFromBracket} />
                                                    Sign out
                                                </MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Header;
