import { ToastContainer } from 'react-toastify';
import Navbar from '../components/navigations/Navbar';
import { Footer } from '../components/navigations/Footer';
import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { get_items, get_total, get_item_total } from '../redux/actions/cart';
import { get_wishlist_item_total } from '../redux/actions/wishlist';
import { get_user_profile } from '../redux/actions/profile';

const Layout=(props)=>{

    useEffect(() => {
        props.refresh()
        props.check_authenticated()
        props.load_user()
        props.get_items(), 
        props.get_total(), 
        props.get_item_total(),
        props.get_user_profile(),
        props.get_wishlist_item_total()

    }, []);

    return(
        <>
            <Navbar/>
            <ToastContainer autoClose={5000} />
            {props.children}
            <Footer/>
        </>
    )
}

export default connect(null, {
    check_authenticated,
    load_user,
    refresh,
    get_items, 
    get_total, 
    get_item_total,
    get_user_profile,
    get_wishlist_item_total
}) (Layout)