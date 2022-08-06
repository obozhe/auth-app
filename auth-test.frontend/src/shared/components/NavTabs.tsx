import { Tab, Tabs } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import TabLink from '../models/TabLink';

type Props = {
    links: TabLink[];
};

const NavTabs = ({ links }: Props) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <Tabs value={pathname} onChange={(e: React.SyntheticEvent, path: string) => navigate(path)}>
            {links.map(({ label, path }: TabLink, i: number) => (
                <Tab key={i} label={label} value={path} />
            ))}
        </Tabs>
    );
};

export default NavTabs;
