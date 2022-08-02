import axiosApi from '../../../core/axios-http-interceptor';
import { store } from '../../../store/store';
import { SignInFormData, SignUpFormData } from '../models/form-data';
import { UserModel } from '../models/user-model';
import { setUser } from '../user.store';

const signIn = (formData: SignInFormData) =>
    axiosApi.post<UserModel, UserModel>(`/user/login`, formData).then((user) => store.dispatch(setUser(user)));

const signUp = (formData: SignUpFormData) =>
    axiosApi.post<UserModel, UserModel>(`/user/create`, formData).then((user) => store.dispatch(setUser(user)));

const signOut = () => axiosApi.post('/user/logout').then(() => store.dispatch(setUser(null)));

const verify = (userId: string, token: string) =>
    axiosApi
        .post<UserModel, UserModel>(`/user/verify`, { userId, token })
        .then((user) => store.dispatch(setUser(user)));

const fetchUser = () => axiosApi.get<UserModel, UserModel>(`/user`).then((user) => store.dispatch(setUser(user)));

const getUsersList = () => axiosApi.get<UserModel[], UserModel[]>(`/user/list`);

const deleteUsers = (ids: string[]) => axiosApi.put<UserModel[], UserModel[]>(`/user/list/remove`, { ids });

const UserApi = { signIn, signOut, signUp, fetchUser, deleteUsers, getUsersList, verify };

export default UserApi;
