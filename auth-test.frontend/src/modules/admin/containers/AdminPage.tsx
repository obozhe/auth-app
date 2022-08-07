import BlockIcon from '@mui/icons-material/Block';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import IconButton from '../../../shared/components/IconButton';
import NavTabs from '../../../shared/components/NavTabs';
import TableOptionsDto from '../../../shared/models/TableOptionsDto';
import { UserDto } from '../../user/models/User';
import AdminTable from '../components/AdminTable';
import { AdminPaths } from '../consts/AdminPaths';
import adminTabs from '../consts/adminTabs';
import AdminApi from '../services/api/AdminApi';

const AdminPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([] as UserDto[]);
    const [selectedIds, setSelectedIds] = useState([] as string[]);
    const [tableOptions, setTableOptions] = useState<TableOptionsDto | null>(null);
    const { pathname } = useLocation();

    useEffect(() => {
        fetchUsers();
    }, [tableOptions]);

    useEffect(() => {
        setTableOptions({
            ...(tableOptions ?? {}),
            filters: { ...(tableOptions?.filters ?? {}), banned: pathname === AdminPaths.BanList },
        });
    }, [pathname]);

    const fetchUsers = () => {
        if (tableOptions) {
            setIsLoading(true);
            AdminApi.getUsers(tableOptions)
                .then((users: UserDto[]) => setUsers(users))
                .finally(() => setIsLoading(false));
        }
    };

    const deleteSelectedUsers = () => {
        setIsLoading(true);
        AdminApi.deleteUsers(selectedIds).then(() => fetchUsers());
    };

    const banSelectedUsers = () => {
        setIsLoading(true);
        AdminApi.banUsers(selectedIds).then(() => fetchUsers());
    };

    return (
        <div className="w-full h-full p-4 grid grid-rows-[auto_1fr] gap-2">
            <Paper className="bg-soft-white shadow-xl flex justify-between items-center px-2">
                <NavTabs links={adminTabs} />
                <div className="py-2">
                    <IconButton
                        className="mr-2"
                        title="Delete Selected Users"
                        titlePlacement="top"
                        color="error"
                        disabled={isLoading || !selectedIds.length}
                        onClick={deleteSelectedUsers}
                        variant="contained"
                    >
                        <DeleteForeverIcon className="w-6 h-6" />
                    </IconButton>

                    <IconButton
                        title="Ban Selected Users"
                        titlePlacement="top"
                        color="error"
                        disabled={isLoading || !selectedIds.length}
                        onClick={banSelectedUsers}
                        variant="contained"
                    >
                        <BlockIcon className="w-5 h-5" />
                    </IconButton>
                </div>
            </Paper>

            <Paper className="bg-soft-white shadow-xl h-full">
                <AdminTable
                    rows={users}
                    isLoading={isLoading}
                    isBanListView={pathname === AdminPaths.BanList}
                    onDeleteUser={(id) => AdminApi.deleteUsers([id]).then(() => fetchUsers())}
                    onBanUser={(id) => AdminApi.banUsers([id]).then(() => fetchUsers())}
                    onUnBanUser={(id) => AdminApi.unBanUsers([id]).then(() => fetchUsers())}
                    onSelectionChange={(selectedIds) => setSelectedIds(selectedIds as string[])}
                />
            </Paper>
        </div>
    );
};

export default AdminPage;
