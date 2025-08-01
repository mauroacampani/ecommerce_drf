import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
} from './types';

export const get_user_profile = () => async dispatch => {
    
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile/user`, config);

            if (res.status === 200) {
                
                dispatch({
                    type: GET_USER_PROFILE_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_USER_PROFILE_FAIL
                });
            }
        } catch (error) {
            dispatch({
                    type: GET_USER_PROFILE_FAIL
                });
        }


    }
}

export const update_user_profile = (
    address_line_1,
    address_line_2,
    city,
    state_province_region,
    zipcode,
    phone,
    country_region
) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const body  = JSON.stringify({
            address_line_1,
            address_line_2,
            city,
            state_province_region,
            zipcode,
            phone,
            country_region
        })
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/profile/update`,body, config);

            if (res === 200) {
                dispatch({
                    type: UPDATE_USER_PROFILE_SUCCESS,
                    payload: res.data
                });
                dispatch(setAlert('Perfil actualizado correctamente', 'green'))
            } else {
                dispatch({
                    type: UPDATE_USER_PROFILE_FAIL
                });
                dispatch(setAlert('Fallo al actualizar el perfil', 'red'))
            }
        } catch (error) {
            dispatch({
                    type: UPDATE_USER_PROFILE_FAIL
                });
                dispatch(setAlert(' ', 'red'))
        }


    }
}