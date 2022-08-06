import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import { DataGrid, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import React from 'react';

import IconButton from '../../../shared/components/IconButton';
import { isAdmin } from '../../user/helpers/user.helper';
import { UserDto } from '../../user/models/User';
import adminColumns from '../consts/columns';

type Props = {
    rows: UserDto[];
    isBanListView: boolean;
    isLoading: boolean;
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

const AdminTable = ({
    rows,
    isLoading,
    isBanListView,
    onDeleteUser,
    onBanUser,
    onUnBanUser,
    onSelectionChange,
}: Props) => {
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
                <DeleteIcon className="w-5 h-5" />
            </IconButton>,
            <IconButton
                title={isBanListView ? 'Unban User' : 'Ban User'}
                key="ban"
                className="square-icon-button"
                color="error"
                disabled={isAdmin(params.row)}
                onClick={() => (isBanListView ? onUnBanUser(params.row.id) : onBanUser(params.row.id))}
            >
                {isBanListView ? <RestoreIcon className="w-5 h-5" /> : <BlockIcon className="w-5 h-5" />}
            </IconButton>,
        ],
    };

    return (
        <DataGrid
            loading={isLoading}
            className="w-full"
            rows={rows}
            columns={[...adminColumns, ActionsCell]}
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
