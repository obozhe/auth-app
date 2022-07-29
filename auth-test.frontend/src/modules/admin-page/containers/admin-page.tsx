import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';

import { CatSpinner } from '../../../shared/components/cat-spinner/cat-spinner';
import { UserModel } from '../../user/models/user-model';
import UserApi from '../../user/services/user-api';
import userApi from '../../user/services/user-api';

const AdminPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([] as UserModel[]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setIsLoading(true);
        UserApi.getUsersList()
            .then((users: UserModel[]) => setUsers(users))
            .finally(() => setIsLoading(false));
    };

    const deleteUser = (id: string) => {
        userApi.deleteUsers([id]).then(() => fetchUsers());
    };

    return isLoading ? (
        <CatSpinner />
    ) : (
        <div className="p-4 w-full h-full">
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        size="small"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AdminPage;
