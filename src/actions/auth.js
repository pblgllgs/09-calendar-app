import Swal from 'sweetalert2';
import { fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(
                login({
                    uid: body.uid,
                    name: body.name,
                })
            );
            Swal.fire(
                'Autenticación exitosa!!',
                `Bienvenido ${body.name}`,
                'success'
            );
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    };
};

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const resp = await fetchSinToken(
            'auth/new',
            { email, password, name },
            'POST'
        );
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('name', body.name);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(
                login({
                    uid: body.uid,
                    name: body.name,
                })
            );
            Swal.fire(
                'Success',
                'Registro exitoso',
                'success'
            );
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    };
};

const login = (user) => ({
    type: types.authLogin,
    payload: user,
});