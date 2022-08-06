import axiosApi from '../../../core/axios-http-interceptor';
import { UserDto } from '../../user/models/user';

const getUsers = () => axiosApi.get<UserDto[], UserDto[]>(`/admin/users`);

const deleteUsers = (ids: string[]) => axiosApi.patch<UserDto[], UserDto[]>(`/admin/users/delete`, ids);
const banUsers = (ids: string[]) => axiosApi.patch<UserDto[], UserDto[]>(`/admin/users/ban`, ids);
const unBanUsers = (ids: string[]) => axiosApi.patch<UserDto[], UserDto[]>(`/admin/users/unban`, ids);

const AdminApi = { getUsers, deleteUsers, banUsers, unBanUsers };
export default AdminApi;
