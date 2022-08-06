import axios from '../../../../core/axiosHTTPInterceptor';
import { store } from '../../../../store/store';
import { SignInFormData, SignUpFormData } from '../../models/FormData';
import { UserDto } from '../../models/User';
import { setUser } from '../../user.store';

export default abstract class UserApi {
    public static signIn(formData: SignInFormData): Promise<void> {
        return axios.post<UserDto, UserDto>(`/user/login`, formData).then((user) => {
            store.dispatch(setUser(user));
        });
    }

    public static signUp(formData: SignUpFormData): Promise<void> {
        return axios.post<UserDto, UserDto>(`/user/create`, formData).then((user) => {
            store.dispatch(setUser(user));
        });
    }

    public static signOut(): Promise<void> {
        return axios.post('/user/logout').then(() => {
            store.dispatch(setUser(null));
        });
    }

    public static verify(userId: string, token: string): Promise<void> {
        return axios.post<UserDto, UserDto>(`/user/verify`, { userId, token }).then((user) => {
            store.dispatch(setUser(user));
        });
    }

    public static fetchUser(): Promise<void> {
        return axios.get<UserDto, UserDto>(`/user`).then((user) => {
            store.dispatch(setUser(user));
        });
    }
}
