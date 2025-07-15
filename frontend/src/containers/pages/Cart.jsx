import Layout from "../../hocs/Layout";
import { connect } from "react-redux";
import { get_items, get_total, get_item_total, remove_item, update_item } from '../../redux/actions/cart';
import { useEffect, useState } from "react";
import CartItem from "../../components/cart/CartItem";
import { Link } from "react-router-dom";
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { setAlert } from "../../redux/actions/alert";


const Cart = ({
    get_items, 
    get_total, 
    get_item_total,
    isAuthenticated,
    items,
    amount,
    compare_amount,
    total_items, 
    remove_item,
    update_item,
    setAlert
}) => {

    const [render, setRender] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
        get_items()
        get_total()
        get_item_total()
    }, [render]);

    const showItems = () => {
        return(
        <div>
           
            {
                items &&
                items !== null &&
                items !== undefined &&
                items.length !== 0 &&
                items.map((item, index) => {
                    let count = item.count;

                    return(
                        <div key={index}>
                            <CartItem
                            item={item}
                                count={count}
                                update_item={update_item}
                                render={render}
                                remove_item={remove_item}
                                setRender={setRender}
                                serAlert={setAlert}
                                >
                                
                            </CartItem>
                        </div>
                    )
                })
            }
        </div>
        )
    }

const checkoutButton = () => {
    
        if (total_items < 1) {
            return (
               <>
            <Link
                to='/shop'>
                    <button
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
                 Busca productos para comprar
                </button>
               
            </Link>
            </>
            )
        } else if (!isAuthenticated) {
            return (
                <>
            <Link
                to='/login'>
                <button
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
                Login
                </button>
            </Link>
            </>
            )
        } else {

            return (
                <>
            <Link
                to='/checkout'>
                <button
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
                Checkout
                </button>
            </Link>
            </>
            )
        }
    }

    return (
        <Layout>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Carrito ({total_items}) productos</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                        Items in your shopping cart
                        </h2>

                        <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                        {showItems()}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                        Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <dt className="text-sm text-gray-600">Subtotal</dt>
                            <dd className="text-sm font-medium text-gray-900">${compare_amount.toFixed(2)}</dd>
                        </div>

                    

                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="flex items-center text-sm text-gray-600">
                            <span>Shipping estimate</span>
                            <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Learn more about how shipping is calculated</span>
                                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="flex text-sm text-gray-600">
                            <span>Tax estimate</span>
                            <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Learn more about how tax is calculated</span>
                                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">$8.32</dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="text-base font-medium text-gray-900">Total</dt>
                            <dd className="text-base font-medium text-gray-900">${amount.toFixed(2)}</dd>
                        </div>
                        </dl>

                        <div className="mt-6">
                        {checkoutButton()}
                        </div>
                    </section>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    items: state.Cart.items,
    amount: state.Cart.amount,
    compare_amount: state.Cart.compare_amount,
    total_items: state.Cart.total_items
})
export default connect(mapStateToProps,{
    get_items, 
    get_total, 
    get_item_total,
    remove_item,
    update_item,
    setAlert
}) (Cart);