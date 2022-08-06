import axiosApi from '../../../core/axios-http-interceptor';
import { store } from '../../../store/store';
import { SignInFormData, SignUpFormData } from '../models/form-data';
import { UserDto } from '../models/user';
import { setUser } from '../user.store';

const signIn = (formData: SignInFormData) =>
    axiosApi.post<UserDto, UserDto>(`/user/login`, formData).then((user) => store.dispatch(setUser(user)));

const signUp = (formData: SignUpFormData) =>
    axiosApi.post<UserDto, UserDto>(`/user/create`, formData).then((user) => store.dispatch(setUser(user)));

const signOut = () => axiosApi.post('/user/logout').then(() => store.dispatch(setUser(null)));

const verify = (userId: string, token: string) =>
    axiosApi.post<UserDto, UserDto>(`/user/verify`, { userId, token }).then((user) => store.dispatch(setUser(user)));

const fetchUser = () => axiosApi.get<UserDto, UserDto>(`/user`).then((user) => store.dispatch(setUser(user)));

const UserApi = { signIn, signOut, signUp, fetchUser, verify };

export default UserApi;
