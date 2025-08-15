import { HeartIcon } from '@heroicons/react/24/solid';

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
            className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-blue-400"
        >
            <HeartIcon className="h-6 w-6 flex-shrink-0  cursor-pointer" aria-hidden="true" />
            <span className="sr-only">Add to favorites</span>
        </button>
        )
    } else {
        return (
             <button
            onClick={addToWishlist}
            className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 "
        >
            <HeartIcon className="h-6 w-6 flex-shrink-0 cursor-pointer" aria-hidden="true" />
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