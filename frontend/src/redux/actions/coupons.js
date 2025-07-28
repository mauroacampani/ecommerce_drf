import axios from 'axios';
import { setAlert } from './alert';
import { GET_COUPON_SUCCESS, GET_COUPON_FAIL } from './types';

export const check_coupon = coupon_name => async dispatch => {
    const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
    };

    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/coupons/check-coupon?coupon_name=${coupon_name}`, config);

        if (res === 200){
            dispatch({
                type: GET_COUPON_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert('Cupón aplicado', 'green'));
        }else{
            dispatch({
                type: GET_COUPON_FAIL
            });
            if (res.data.error) {
                dispatch(setAlert(res.data.error, 'red'))
            } else {
                dispatch(setAlert('Este cupón no existe', 'red'));
            }
        }
    } catch (error) {
        dispatch({
                type: GET_COUPON_FAIL
        });

        dispatch(setAlert('Este cupón no existe', 'red'));
    
    }

    window.scrollTo(0, 0)
}