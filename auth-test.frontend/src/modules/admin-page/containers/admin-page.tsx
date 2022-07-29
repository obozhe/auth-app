import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';

import { CatSpinner } from '../../../shared/components/cat-spinner/cat-spinner';
import { UserModel } from '../../user/models/user-model';
import UserApi from '../../user/services/user-api';
import userApi from '../../user/services/user-api';

const AdminPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([] as UserModel[]);
    const [selectedIds, setSelectedIds] = useState([] as string[]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setIsLoading(true);
        UserApi.getUsersList()
            .then((users: UserModel[]) => setUsers(users))
            .finally(() => setIsLoading(false));
    };

    const deleteSelectedUsers = () => {
        userApi.deleteUsers(selectedIds).then(() => fetchUsers());
    };

    const DeleteCell = ({ value }: GridRenderCellParams) => (
        <IconButton
            onClick={(e) => {
                e.stopPropagation();
                userApi.deleteUsers([value]).then(() => fetchUsers());
            }}
            size="small"
        >
            <FontAwesomeIcon icon={faTrashCan} />
        </IconButton>
    );

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', flex: 1, minWidth: 250 },
        { field: 'firstName', headerName: 'First name', flex: 1, minWidth: 150 },
        { field: 'lastName', headerName: 'Last name', flex: 1, minWidth: 150 },
        { field: 'role', headerName: 'Role', flex: 1, minWidth: 150 },
        { field: 'id', sortable: false, headerName: '', width: 30, renderCell: DeleteCell },
    ];

    const onSelectionChange = (selectedIds: GridSelectionModel) => setSelectedIds(selectedIds as string[]);

    return isLoading ? (
        <CatSpinner />
    ) : (
        <div className="w-full p-4 grid grid-rows-[auto_1fr]">
            <Button className="w-fit" onClick={deleteSelectedUsers} variant="contained">
                Remove selected users
            </Button>
            <div className="w-full">
                <Paper className="w-full h-[36rem]">
                    <DataGrid
                        className="w-full"
                        rows={users}
                        columns={columns}
                        onSelectionModelChange={onSelectionChange}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableColumnMenu
                        disableSelectionOnClick
                    />
                </Paper>
            </div>
        </div>
    );
};

export default AdminPage;
