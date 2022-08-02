import { Avatar as MuiAvatar } from '@mui/material';

import { stringToColor } from '../helpers/string-to-color';

const stringAvatar = (name: string) => ({
    sx: { bgcolor: stringToColor(name) },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
});

const Avatar = ({ fullName, variant }: { fullName: string; variant?: 'square' | 'circular' | 'rounded' }) => (
    <MuiAvatar variant={variant} {...stringAvatar(fullName)} />
);

export default Avatar;
