import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import { DataGrid, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import React from 'react';

import { isAdmin } from '../../../user/helpers/user.helper';
import { UserDto } from '../../../user/models/user';
import AdminColumns from '../consts/columns';

type Props = {
    rows: UserDto[];
    onDeleteUser: (id: string) => void;
    onBanUser: (id: string) => void;
    onSelectionChange: (ids: GridSelectionModel) => void;
};

const AdminTable = ({ rows, onDeleteUser, onBanUser, onSelectionChange }: Props) => {
    const ActionsCell = {
        field: 'actions',
        type: 'actions',
        width: 120,
        getActions: (params: GridRowParams) => [
            <Button
                key={params.id}
                disabled={isAdmin(params.row)}
                className="square-icon-button"
                color="error"
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteUser(params.row.id);
                }}
                size="small"
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </Button>,
            <Button
                key={params.id}
                disabled={isAdmin(params.row)}
                className="square-icon-button"
                color="error"
                onClick={(e) => {
                    e.stopPropagation();
                    onBanUser(params.row.id);
                }}
                size="small"
            >
                <FontAwesomeIcon icon={faBan} />
            </Button>,
        ],
    };

    return (
        <DataGrid
            className="w-full"
            rows={rows}
            columns={[...AdminColumns, ActionsCell]}
            onSelectionModelChange={onSelectionChange}
            pageSize={25}
            rowsPerPageOptions={[25]}
            isRowSelectable={(params: GridRowParams) => !isAdmin(params.row)}
            checkboxSelection
            disableSelectionOnClick
        />
    );
};

export default AdminTable;
