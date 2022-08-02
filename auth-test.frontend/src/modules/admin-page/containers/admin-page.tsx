import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paper, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';

import { CatSpinner } from '../../../shared/components/cat-spinner/cat-spinner';
import { UserRoles } from '../../user/consts/user-roles';
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

    const isAdmin = (user: UserModel) => user.role !== UserRoles.Admin;

    const DeleteCell = ({ row }: GridRenderCellParams) =>
        isAdmin(row) && (
            <Button
                className="square-icon-button"
                color="error"
                onClick={(e) => {
                    e.stopPropagation();
                    userApi.deleteUsers([row.id]).then(() => fetchUsers());
                }}
                size="small"
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </Button>
        );

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', flex: 1, minWidth: 250 },
        { field: 'firstName', headerName: 'First name', flex: 1, minWidth: 150 },
        { field: 'lastName', headerName: 'Last name', flex: 1, minWidth: 150 },
        { field: 'role', headerName: 'Role', flex: 1, minWidth: 150 },
        { field: '', sortable: false, headerName: '', width: 56, renderCell: DeleteCell },
    ];

    const onSelectionChange = (selectedIds: GridSelectionModel) => setSelectedIds(selectedIds as string[]);

    return (
        <div className="w-full h-full p-4 grid grid-rows-[auto_1fr] gap-2">
            <Paper className="bg-soft-white shadow-xl p-2 flex justify-end">
                <Tooltip placement="top" title="Delete selected users">
                    <span>
                        <Button
                            color="error"
                            className="square-icon-button"
                            disabled={isLoading || !selectedIds.length}
                            onClick={deleteSelectedUsers}
                            variant="contained"
                        >
                            <FontAwesomeIcon icon={faDeleteLeft} />
                        </Button>
                    </span>
                </Tooltip>
            </Paper>

            <Paper className="bg-soft-white shadow-xl h-full">
                {isLoading ? (
                    <CatSpinner />
                ) : (
                    <DataGrid
                        className="w-full"
                        rows={users}
                        columns={columns}
                        onSelectionModelChange={onSelectionChange}
                        pageSize={25}
                        rowsPerPageOptions={[25]}
                        isRowSelectable={(params: GridRowParams) => isAdmin(params.row)}
                        checkboxSelection
                        disableColumnMenu
                        disableSelectionOnClick
                    />
                )}
            </Paper>
        </div>
    );
};

export default AdminPage;
