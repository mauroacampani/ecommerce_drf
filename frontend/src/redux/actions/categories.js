import axios from 'axios';
import{
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL
}from './types';

export const get_categories = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/category/categories`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_CATEGORIES_FAIL
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
                type: GET_CATEGORIES_FAIL
            })
    }
}