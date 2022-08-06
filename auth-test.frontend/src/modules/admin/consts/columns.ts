import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';

import { DateFormats } from '../../../core/consts/DateFormats';
import { formatDate } from '../../../core/helpers/dateTime.helper';

const adminColumns: GridColDef[] = [
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 250 },
    { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 150 },
    { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 150 },
    { field: 'role', headerName: 'Role', flex: 1, minWidth: 150 },
    {
        field: 'lastLogin',
        headerName: 'Last Login',
        flex: 1,
        minWidth: 160,
        valueFormatter: (params: GridValueFormatterParams<string>) => formatDate(params.value, DateFormats.Grid),
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        flex: 1,
        minWidth: 160,
        valueFormatter: (params: GridValueFormatterParams<string>) => formatDate(params.value, DateFormats.Grid),
    },
];

export default adminColumns;
