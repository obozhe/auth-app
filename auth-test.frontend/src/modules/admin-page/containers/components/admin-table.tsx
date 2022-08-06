import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import Button from '@mui/material/Button';
import { DataGrid, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import React from 'react';

import IconButton from '../../../../shared/components/IconButton';
import { isAdmin } from '../../../user/helpers/user.helper';
import { UserDto } from '../../../user/models/user';
import AdminColumns from '../consts/columns';

type Props = {
    rows: UserDto[];
    onDeleteUser: (id: string) => void;
    onBanUser: (id: string) => void;
    onUnBanUser: (id: string) => void;
    onSelectionChange: (ids: GridSelectionModel) => void;
};

const getRowClass = (params: GridRowParams) => {
    if (params.row.banned) {
        return 'banned-row';
    }

    if (isAdmin(params.row)) {
        return 'admin-row';
    }

    return '';
};

const AdminTable = ({ rows, onDeleteUser, onBanUser, onUnBanUser, onSelectionChange }: Props) => {
    const ActionsCell = {
        field: 'actions',
        type: 'actions',
        width: 120,
        getActions: (params: GridRowParams) => [
            <IconButton
                title="Delete User"
                key="delete"
                disabled={isAdmin(params.row)}
                color="error"
                onClick={() => onDeleteUser(params.row.id)}
            >
                <DeleteIcon />
            </IconButton>,
            <IconButton
                title={params.row.banned ? 'Unban User' : 'Ban User'}
                key="ban"
                disabled={isAdmin(params.row)}
                className="square-icon-button"
                color="error"
                onClick={() => (params.row.banned ? onUnBanUser(params.row.id) : onBanUser(params.row.id))}
            >
                {params.row.banned ? <RestoreIcon /> : <BlockIcon />}
            </IconButton>,
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
            getRowClassName={getRowClass}
            checkboxSelection
            disableSelectionOnClick
        />
    );
};

export default AdminTable;
