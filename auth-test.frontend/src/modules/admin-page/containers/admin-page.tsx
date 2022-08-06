import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlockIcon from '@mui/icons-material/Block';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Paper, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';

import { CatSpinner } from '../../../shared/components/CatSpinner/CatSpinner';
import IconButton from '../../../shared/components/IconButton';
import { UserDto } from '../../user/models/user';
import AdminApi from '../services/admin-api';
import AdminTable from './components/admin-table';

const AdminPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([] as UserDto[]);
    const [selectedIds, setSelectedIds] = useState([] as string[]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setIsLoading(true);
        AdminApi.getUsers()
            .then((users: UserDto[]) => setUsers(users))
            .finally(() => setIsLoading(false));
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
            <Paper className="bg-soft-white shadow-xl p-2 flex justify-end">
                <IconButton
                    title="Delete Selected Users"
                    className="mr-2"
                    titlePlacement="top"
                    color="error"
                    disabled={isLoading || !selectedIds.length}
                    onClick={deleteSelectedUsers}
                    variant="contained"
                >
                    <DeleteForeverIcon />
                </IconButton>

                <IconButton
                    title="Ban Selected Users"
                    titlePlacement="top"
                    color="error"
                    disabled={isLoading || !selectedIds.length}
                    onClick={banSelectedUsers}
                    variant="contained"
                >
                    <BlockIcon />
                </IconButton>
            </Paper>

            <Paper className="bg-soft-white shadow-xl h-full">
                {isLoading ? (
                    <CatSpinner />
                ) : (
                    <AdminTable
                        rows={users}
                        onDeleteUser={(id) => AdminApi.deleteUsers([id]).then(() => fetchUsers())}
                        onBanUser={(id) => AdminApi.banUsers([id]).then(() => fetchUsers())}
                        onUnBanUser={(id) => AdminApi.unBanUsers([id]).then(() => fetchUsers())}
                        onSelectionChange={(selectedIds) => setSelectedIds(selectedIds as string[])}
                    />
                )}
            </Paper>
        </div>
    );
};

export default AdminPage;
