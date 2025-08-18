import Layout from "../../hocs/Layout";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import CartItem from "../../components/cart/CartItem";
import { Link } from "react-router-dom";
import { setAlert } from "../../redux/actions/alert";
import { get_wishlist_item_total, remove_wishlist_item, get_wishlist_items } from "../../redux/actions/wishlist";
import WishlistItem from "../../components/cart/WishlistItem";

const Wishlist = ({
    setAlert,
    wishlist_items,
    remove_wishlist_item,
    get_wishlist_item_total,
    wishlist_total_items,
    get_wishlist_items
}) => {

    const [render, setRender] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
        get_wishlist_item_total()
        get_wishlist_items()
    }, [render]);


        

    const showWishlistItems = () => {

        return(
        <div>
           
            {
                wishlist_items &&
                wishlist_items !== null &&
                wishlist_items !== undefined &&
                wishlist_items.length !== 0 &&
                wishlist_items.map((item, index) => {
                    let count = item.count;

                    return(
                        <div key={index}>
                            <WishlistItem
                                item={item}
                                count={count}
                                render={render}
                                remove_wishlist_item={remove_wishlist_item}
                                setRender={setRender}
                                serAlert={setAlert}
                                
                                
                            />
                        </div>
                    )
                })
            }
        </div>
        )
    }

// const removeWishlistItem = (e) => {
//         e.preventDefault();
//         remove_wishlist_item()


//     }


    return (
        <Layout>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Favoritos ({wishlist_total_items}) productos</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                        Items in your shopping cart
                        </h2>

                        <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                       {showWishlistItems()}
                        </ul>
                    </section>

                    </div>
                   
                   
                </div>
            </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    wishlist_items: state.Wishlist.items,
    wishlist_total_items: state.Wishlist.total_items,
   
})
export default connect(mapStateToProps,{
    setAlert, 
    remove_wishlist_item,
    get_wishlist_item_total,
    get_wishlist_items
}) (Wishlist);