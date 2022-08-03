import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paper, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';

import { CatSpinner } from '../../../shared/components/cat-spinner/cat-spinner';
import { UserDto } from '../../user/models/user';
import UserApi from '../../user/services/user-api';
import userApi from '../../user/services/user-api';
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
        UserApi.getUsersList()
            .then((users: UserDto[]) => setUsers(users))
            .finally(() => setIsLoading(false));
    };

    const deleteSelectedUsers = () => {
        userApi.deleteUsers(selectedIds).then(() => fetchUsers());
    };

    return (
        <div className="w-full h-full p-4 grid grid-rows-[auto_1fr] gap-2">
            <Paper className="bg-soft-white shadow-xl p-2 flex justify-end">
                <Tooltip placement="top" title="Delete Selected Users">
                    <span>
                        <Button
                            color="error"
                            className="square-icon-button mr-2"
                            disabled={isLoading || !selectedIds.length}
                            onClick={deleteSelectedUsers}
                            variant="contained"
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                    </span>
                </Tooltip>

                <Tooltip placement="top" title="Ban Selected Users">
                    <span>
                        <Button
                            color="error"
                            className="square-icon-button"
                            disabled={isLoading || !selectedIds.length}
                            onClick={deleteSelectedUsers}
                            variant="contained"
                        >
                            <FontAwesomeIcon icon={faBan} />
                        </Button>
                    </span>
                </Tooltip>
            </Paper>

            <Paper className="bg-soft-white shadow-xl h-full">
                {isLoading ? (
                    <CatSpinner />
                ) : (
                    <AdminTable
                        rows={users}
                        onDeleteUser={(id) => userApi.deleteUsers([id]).then(() => fetchUsers())}
                        onBanUser={(id) => userApi.banUsers([id]).then(() => fetchUsers())}
                        onSelectionChange={(selectedIds) => setSelectedIds(selectedIds as string[])}
                    />
                )}
            </Paper>
        </div>
    );
};

export default AdminPage;
