import { ToastContainer } from 'react-toastify';
import Navbar from '../components/navigations/Navbar';
import { Footer } from '../components/navigations/Footer';
import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const Layout=(props)=>{

    useEffect(() => {
        props.refresh()
        props.check_authenticated()
        props.load_user()

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
    refresh
}) (Layout)