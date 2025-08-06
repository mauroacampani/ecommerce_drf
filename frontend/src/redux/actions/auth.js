import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    LOGOUT,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
} from './types'

import { setAlert } from './alert.js';

import axios from 'axios';

import { get_items, get_total, get_item_total, synch_cart } from './cart.js';

import { get_wishlist_item_total, clear_wishlist, get_wishlist_items } from './wishlist.js';

//CHEQUEA QUE EL USUARIO ESTE AUTENTICADO
export const check_authenticated = () => async dispatch => {
     if(localStorage.getItem('access')){
        const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        }
        const body = JSON.stringify({
        token: localStorage.getItem('access')
    });

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/jwt/verify/`, body, config);

        if (res.status === 200){
            dispatch({
                type: AUTHENTICATED_SUCCESS
            });
        }else{
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } catch (error) {
        console.log(error)
        dispatch({
                type: AUTHENTICATED_FAIL
            });
    }
    }else{
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

}

// accion registrar usuario
export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        re_password
    });

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/`, body, config)

        if (res.status === 201) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert('Te enviamos un correo, por favor activa tu cuenta. Revisa el correo de spam', 'green'));
        }else{
             dispatch({
                type: SIGNUP_FAIL
            })

            dispatch({
                type: REMOVE_AUTH_LOADING
            });
        }
        
    } catch (error) {
         dispatch({
                type: SIGNUP_FAIL
               
            });
            console.error("Error en el registro:", error.response?.data || error.message);
            dispatch(setAlert('Error al crear la cuenta', 'red'));
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
             dispatch(setAlert('Error conectando con el servidor, intenta mas tarde', 'red'))
    }
};

export const load_user = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/users/me/`, config);
        if (res.status === 200){
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: USER_LOADED_FAIL
            })
        }
    } catch (error) {
         dispatch({
                type: USER_LOADED_FAIL
            });
            console.log(error)
    }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
}


export const login = (email, password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        email,
        password
    });

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/jwt/create/`, body, config)

        if (res.status === 200){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(load_user());
            dispatch({
                type: REMOVE_AUTH_LOADING
            });

            dispatch(setAlert('Inicio de sesión con exito', 'green'));

            dispatch(synch_cart());
            dispatch(get_wishlist_items());
            dispatch(get_wishlist_item_total());

        }else {
            dispatch({
                type: LOGIN_FAIL
            })

            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error al iniciar sesión', 'red'));
        }
    } catch (error) {
         dispatch({
                type: LOGIN_FAIL
               
            });
            console.error("Error en el registro:", error.response?.data || error.message);
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
             dispatch(setAlert('Error conectando con el servidor, intenta mas tarde', 'red'))
    }
}

// accion activar cuenta de usuario
export const activate = (uid, token) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        uid,
        token
    });

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/activation/`, body, config)

        if (res.status === 204) {
            dispatch({
                type: ACTIVATION_SUCCESS,
                
            });
             dispatch(setAlert('Cuenta activada correctamente', 'green'));
        }else{
             dispatch({
                type: ACTIVATION_FAIL
            });
            dispatch(setAlert('Error activando cuenta', 'red'));
        }
        dispatch({
                type: REMOVE_AUTH_LOADING
            });
    } catch (error) {
         dispatch({
                type: ACTIVATION_FAIL
               
            })
            console.error("Error en el registro:", error);
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error al conectar con el servidor, intenta mas tarde', 'green'));
    }

};

export const refresh = () => async dispatch => {
    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
    });

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/jwt/refresh/`, body, config);

        if (res.status === 200){
            dispatch({
                type: REFRESH_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } catch (error) {
        console.log(error)
        dispatch({
                type: REFRESH_FAIL
            });
    }
    }else{
        dispatch({
            type: REFRESH_FAIL
        });
    }
}

export const reset_password = (email) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
            headers: {
    
                'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        email
    });

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/reset_password/`, body, config);

        if (res.status === 204){
            dispatch({
                type: RESET_PASSWORD_SUCCESS
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert("Correo electrónico de restablecimiento de contraseña enviado", "green"));
        }else{
            dispatch({
                type: RESET_PASSWORD_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert("Error en el envío del email de reseteo de password", "red"));
        }
    } catch (error) {
        console.log(error)
         dispatch({
                type: RESET_PASSWORD_FAIL
            });
        dispatch({
                type: REMOVE_AUTH_LOADING
            });
        dispatch(setAlert("Error en el envío del email de reseteo de password", "red"));
    }
}


export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
            headers: {
    
                'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password
    });

    if (new_password !== re_new_password){
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        });
        dispatch({
                type: REMOVE_AUTH_LOADING
            });
        dispatch(setAlert("Los password no coiniceden", "red"));
    }else{
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/reset_password_confirm/`, body, config);

            if (res.status === 204){
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_SUCCESS
                });
                dispatch({
                    type: REMOVE_AUTH_LOADING
                });
                dispatch(setAlert("El password a sido reseteado correctamente", "green"));
            }else{
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_FAIL
                });
                dispatch({
                    type: REMOVE_AUTH_LOADING
                });
                dispatch(setAlert("Error al resetear el password", "red"));
            }
        } catch (error) {
            console.log(error)
            dispatch({
                    type: RESET_PASSWORD_CONFIRM_FAIL
                });
            dispatch({
                    type: REMOVE_AUTH_LOADING
                });
            dispatch(setAlert("Error al resetear el password", "red"));
        }
    }

    
}


export const logout = () => dispatch => {

    // localStorage.removeItem('cart')
    
    dispatch({
        type: LOGOUT
    });
    dispatch(setAlert("Se cerró sesión correctamente", 'green'));

    dispatch(get_items());
    dispatch(get_item_total());
    dispatch(get_total());
    dispatch(clear_wishlist());
}