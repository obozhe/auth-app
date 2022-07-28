import axiosApi from '../../../core/axios-http-interceptor';
import { store } from '../../../store/store';
import { UserModel } from '../../../store/user/models/user-model';
import { setUser } from '../../../store/user/user.store';
import { LoginFormData, RegistrationFormData } from '../models/form-data';

const signIn = (formData: LoginFormData) =>
    axiosApi.post<UserModel>(`/authorization/sign-in`, formData).then((res) => {
        store.dispatch(setUser(res.data));
    });

const signUp = (formData: RegistrationFormData) =>
    axiosApi.post<UserModel>(`/authorization/sign-up`, formData).then((res) => {
        store.dispatch(setUser(res.data));
    });

const signOut = () => axiosApi.post('/authorization/sign-out').then(() => store.dispatch(setUser(null)));

const getUser = () =>
    axiosApi.get<UserModel>(`/authorization/user`).then((res) => {
        if (res.data) {
            store.dispatch(setUser(res.data));
        }
    });

const AuthorizationApi = { signIn, signOut, signUp, getUser };

export default AuthorizationApi;
