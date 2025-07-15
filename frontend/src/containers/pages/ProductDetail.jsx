import Layout from "../../hocs/Layout";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { get_product, get_related_products } from "../../redux/actions/products";
import { useEffect, useState } from "react";
import { RadioGroup } from '@headlessui/react';
import { HeartIcon } from '@heroicons/react/20/solid'
import ImageGallery from "../../components/product/ImagenGallery";
import { get_items, add_item, get_total, get_item_total } from '../../redux/actions/cart'
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({
    get_product,
    get_related_products,
    product,
    get_items, 
    add_item, 
    get_total, 
    get_item_total
}) =>{

    // const [selectedColor, setSelectedColor] = useState(product.colors[0])

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const addToCart = async () => {
      if (product && product !== null && product !== undefined && product.quantity > 0) {
        setLoading(true);
        await add_item(product);
        await get_items();
        await get_total();
        await get_item_total();
        setLoading(false);
        navigate('/cart')
      }
    }

    const params = useParams();
    const productId = params.productId;

    useEffect(() => {
      window.scrollTo(0, 0)
        get_product(productId)
        get_related_products(productId)
    }, []);

    return(
        <Layout>
            <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <ImageGallery photo={product && product.photo}></ImageGallery>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product && product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${product && product.price}</p>
            </div>

            {/* Reviews */}
           <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="text-base text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{ __html: product && product.description }}
              />
            </div>

           

            <div className="mt-6">
              {/* Colors */}
               <div>
                <h3 className="text-sm text-gray-600">Color</h3>

                <RadioGroup className="mt-2">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                   
                      <RadioGroup.Option
                        key=""
                        value=""
                        className='-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                          
                        
                      >
                        <RadioGroup.Label as="p" className="sr-only">
                        
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className='h-8 w-8 border border-black border-opacity-10 rounded-full'
                          
                        />
                      </RadioGroup.Option>
           
                  </div>
                </RadioGroup>
              </div>
                <p className="mt-4">
                  {
                    product &&
                    product !== null &&
                    product !== undefined &&
                    product.quantity > 0 ? (
                      <span className="text-green-500">
                        En stock
                      </span>
                    ) : (
                      <span className="text-red-500">
                        Sin stock
                      </span>
                    )
                  }
                </p>
              <div className="mt-4 flex sm:flex-col1">
                {loading ? 
                <button
                  
                  className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                >
                  <ClipLoader color="#fff" loading={true} size={20} />
                </button> :
                <button
                  onClick={addToCart}
                  className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                >
                  Agregar al carrito
                </button>
                }


                <button
                  type="button"
                  className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    product: state.Products.product,

})
export default connect(mapStateToProps, {
    get_product,
    get_related_products,
    get_items, 
    add_item, 
    get_total, 
    get_item_total
}) (ProductDetail);