import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';

const ShippingForm = ({
    full_name,
    address_line_1,
    address_line_2,
    city,
    state_province_region,
    postal_zip_code,
    telephone_number,
    countries,
    onChange,
    user,
    buy,
    renderShipping,
    total_amount,
    total_compare_amount,
    estimated_tax,
    shipping_cost,
    shipping_id,
    shipping,
    renderPaymentInfo
}) => {
    return(
        
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                    {renderShipping()}
              </div>
          
              
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how shipping is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{shipping && shipping_id !== 0 ? <>${shipping_cost}</>:<><h6 className="text-red-600">Elige una opcion de envío</h6></>}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how tax is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">${estimated_tax}</dd>
              </div>

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex text-sm text-gray-600">
                  <span>Sub Total</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how tax is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">${total_compare_amount}</dd>
              </div>

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Total</dt>
                <dd className="text-base font-medium text-gray-900">${total_amount}</dd>
              </div>
            </dl>

            <form onSubmit={e => buy(e)}>
            <div className=" px-4 py-5 mt-4 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Formulario de envío:</h3>
            </div>
            
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Nombre completo*
                </label>
                <div className="mt-1 sm:mt-2 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                        type="text"
                        name="full_name"
                        placeholder={`${user.first_name} ${user.last_name}`}
                        onChange={e => onChange(e)}
                        value={full_name}
                        required
                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                        />
                    </div>
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="address_line_1" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Dirección 1*
                </label>
                <div className="mt-1 sm:mt-2 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                        type="text"
                        name="address_line_1"
                        // placeholder={`${profile.address_line_1}`}
                        onChange={e => onChange(e)}
                        value={address_line_1}
                        required
                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-800"
                        />
                    </div>
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="address_line_2" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Dirección 2:
                </label>
                <div className="mt-1 sm:mt-2 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                        type="text"
                        name="address_line_2"
                        // placeholder={`${profile.address_line_2}`}
                        onChange={e => onChange(e)}
                        value={address_line_2}
                     
                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                        />
                    </div>
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Ciudad*
                </label>
                <div className="mt-1 sm:mt-2 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                        type="text"
                        name="city"
                        // placeholder={`${profile.city}`}
                        onChange={e => onChange(e)}
                        value={city}
                        required
                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                        />
                    </div>
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="state_province_region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Provincia/Región*
                </label>
                <div className="mt-1 sm:mt-2 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                        type="text"
                        name="state_province_region"
                        // placeholder={`${profile.state_province_region}`}
                        onChange={e => onChange(e)}
                        value={state_province_region}
                        required
                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                        />
                    </div>
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="postal_zip_code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Código Postal*
                </label>
                <div className="mt-1 sm:mt-2 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                        type="text"
                        name="postal_zip_code"
                        // placeholder={`${profile.zipcode}`}
                        onChange={e => onChange(e)}
                        value={postal_zip_code}
                        required
                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                        />
                    </div>
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="country_region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    País/Región*
                </label>
                <div className="mt-1 sm:mt-1 sm:col-span-2">
                <select
                  id='country_region'
                  name='country_region'
                  onChange={e => onChange(e)}
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  {
                                countries && 
                                countries !== null &&
                                countries !== undefined &&
                                countries.map((country, index) => (
                                    <option key={index} value={country.name}>
                                        {country.name}
                                    </option>
                                ))
                            }
                </select>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="telephone_number" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Telefono*
                </label>
                <div className="mt-1 sm:mt-2 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                        type="tel"
                        name="telephone_number"
                        // placeholder={`${profile.phone}`}
                        onChange={e => onChange(e)}
                        value={telephone_number}
                        required
                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                        />
                    </div>
                </div>
            </div>

                    {renderPaymentInfo && renderPaymentInfo()}
          
           
            
            </form>

          </section>
    )
}

export default ShippingForm;