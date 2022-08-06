import TabLink from '../../../shared/models/TabLink';
import { AdminPaths } from './AdminPaths';

const adminTabs: TabLink[] = [
    {
        label: 'Users',
        path: AdminPaths.Users,
    },
    {
        label: 'Ban List',
        path: AdminPaths.BanList,
    },
];

export default adminTabs;
