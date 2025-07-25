import axios from 'axios';
import {
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDERS_DETAIL_SUCCESS,
    GET_ORDERS_DETAIL_FAIL
} from './types';

export const list_orders = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/get-orders`, config);

            if (res.status === 200) {
                dispatch({
                    type:GET_ORDERS_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_ORDERS_FAIL
                })
            }
        } catch (error) {
            dispatch({
                type: GET_ORDERS_FAIL
            })
        }
    }
}

export const get_order_detail = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/get-orders/${transactionID}`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_ORDERS_DETAIL_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_ORDERS_DETAIL_FAIL
                })
            }
        } catch (error) {
            dispatch({
                type: GET_ORDERS_DETAIL_FAIL
            })
        }
    }
}