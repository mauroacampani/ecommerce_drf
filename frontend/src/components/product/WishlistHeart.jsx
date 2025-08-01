import { HeartIcon } from '@heroicons/react/24/outline';

const WishlistHeart = ({
    addToWishlist,
    wishlist,
    product
}) => {
    

    const renderWishlistHeart = () => {
        let selected = false;
        if (
        wishlist &&
        wishlist !== null &&
        wishlist !== undefined &&
        product &&
        product !== null &&
        product !== undefined
    ) {
        wishlist.map(item => {
            if (item.product.id.toString() === product.id.toString()) {
                selected = true;
            }
        })
    }

    if (selected){
    
        return (
             <button
            onClick={addToWishlist}
            className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 bg-gray-200 hover:text-gray-500"
        >
            <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Add to favorites</span>
        </button>
        )
    } else {
        return (
             <button
            onClick={addToWishlist}
            className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
        >
            <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Add to favorites</span>
        </button>
        )
    }
    }

    return (
       <>
        {renderWishlistHeart()}
       </>
    )
}

export default WishlistHeart;