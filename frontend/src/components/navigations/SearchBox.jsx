import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const SearchBox = ({ categories, search, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="text-sm leading-6 font-semibold text-gray-900">
      <div>
        <div className="mt-1 flex rounded-md shadow-sm border border-gray-300">
          
          <div className="mt-1 mx-1 px-2 py-1">
            <select
              onChange={onChange}
              name="category_id"
              className="rounded-full"
            >
              <option value={0}>Todos</option>
              {
                categories?.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <input
              type="search"
              name="search"
              onChange={onChange}
              value={search}
              required
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-2 sm:text-sm border-gray-300"
              placeholder="¿Qué buscas hoy?"
            />
          </div>

          <button
            type="submit"
            className="-ml-px relative inline-flex items-center space-x-2 px-2 py-1 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>

        </div>
      </div>
    </form>
  )
}

export default SearchBox;