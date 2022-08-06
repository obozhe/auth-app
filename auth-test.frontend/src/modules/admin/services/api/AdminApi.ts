import axios from '../../../../core/axiosHTTPInterceptor';
import TableOptionsDto from '../../../../core/models/TableOptionsDto';
import { UserDto } from '../../../user/models/User';

export default abstract class AdminApi {
    public static getUsers(options: TableOptionsDto): Promise<UserDto[]> {
        return axios.post<UserDto[], UserDto[]>(`/admin/users`, options);
    }

    public static deleteUsers(ids: string[]): Promise<void> {
        return axios.patch<void, void>(`/admin/users/delete`, ids);
    }

    public static banUsers(ids: string[]): Promise<void> {
        return axios.patch<void, void>(`/admin/users/ban`, ids);
    }

    public static unBanUsers(ids: string[]): Promise<void> {
        return axios.patch<void, void>(`/admin/users/unban`, ids);
    }
}
