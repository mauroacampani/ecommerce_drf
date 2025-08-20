import Layaut from '../../hocs/Layout';
import { connect } from 'react-redux';
import { list_orders, get_order_detail } from '../../redux/actions/orders';
import { get_items, get_total, get_item_total } from '../../redux/actions/cart';
import { useEffect, useState, Fragment } from 'react';
import { Link, Navigate } from "react-router-dom";
import DashboardLink from '../../components/dashboard/DashboardLink';
import moment from 'moment';
import { useParams } from "react-router";


import { Dialog, Menu, Transition } from '@headlessui/react'

import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
Bars3Icon ,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon, PaperClipIcon } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const products = [
  {
    id: 1,
    name: 'Distant Mountains Artwork Tee',
    price: '$36.00',
    description: 'You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?',
    address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
    email: 'f•••@example.com',
    phone: '1•••••••••40',
    href: '#',
    status: 'Processing',
    step: 1,
    date: 'March 24, 2021',
    datetime: '2021-03-24',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg',
    imageAlt: 'Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.',
  },
  // More products...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardPaymentDetail = ({
    get_order_detail,
    order,
    isAuthenticated,
    user
}) => {


    const [sidebarOpen, setSidebarOpen] = useState(false);

    const params = useParams();
    
    const transaction_id = params.transaction_id
   

    useEffect(() => {
        get_order_detail(transaction_id)
    }, [transaction_id]);


    if (!isAuthenticated)
        return <Navigate to="/"></Navigate>

    return(
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                    >
                    <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                            >
                            <span className="sr-only">Close sidebar</span>
                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </button>
                        </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 flex items-center px-4">
                            <Link to="/">

                            
                        <img
                            className="h-8 w-auto cursor-pointer"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Workflow"
                        />
                        </Link>
                        </div>
                        <div className="mt-5 flex-1 h-0 overflow-y-auto">
                        <nav className="px-2 space-y-1">
                             <DashboardLink/>
                        </nav>
                        </div>
                    </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                    {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                         <Link to="/">
                    <img
                        className="h-8 w-auto cursor"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Workflow"
                    />
                    </Link>
                    </div>
                    <div className="mt-5 flex-grow flex flex-col">
                    <nav className="flex-1 px-2 pb-4 space-y-1">
                        <DashboardLink/>
                    </nav>
                    </div>
                </div>
                </div>
            <div className="md:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button
                    type="button"
                    className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                    onClick={() => setSidebarOpen(true)}
                    >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon  className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex-1 px-4 flex justify-between">
                    <div className="flex-1 flex">
                        <form className="w-full flex md:ml-0" action="#" method="GET">
                        <label htmlFor="search-field" className="sr-only">
                            Search
                        </label>
                        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <input
                            id="search-field"
                            className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                            placeholder="Search"
                            type="search"
                            name="search"
                            />
                        </div>
                        </form>
                    </div>
                    <div className="ml-4 flex items-center md:ml-6">
                        <button
                        type="button"
                        className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                        <div>
                            <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                {({ active }) => (
                                    <a
                                    href={item.href}
                                    className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                    >
                                    {item.name}
                                    </a>
                                )}
                                </Menu.Item>
                            ))}
                            </Menu.Items>
                        </Transition>
                        </Menu>
                    </div>
                    </div>
                </div>

            <main className="flex-1">
                <div className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
                        <div className="max-w-3xl mx-auto">
                             <div className="bg-white">
                                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-6 lg:px-8">
                                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Order Details</h1>

                                    <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
                                    <dl className="flex">
                                        <dt className="text-gray-500">ID Transacción&nbsp;</dt>
                                        <dd className="font-medium text-gray-900">{order.transaction_id}</dd>
                                        <dt>
                                        <span className="sr-only">Date</span>
                                        <span className="text-gray-400 mx-2" aria-hidden="true">
                                            &middot;
                                        </span>
                                        </dt>
                                        <dd className="font-medium text-gray-900">
                                        <time dateTime="2021-03-22">{moment(order.date_issued).fromNow()}</time>
                                        </dd>
                                    </dl>
                                    
                                    </div>

                                    <div className="mt-8">
                                    <h2 className="sr-only">Products purchased</h2>

                                    <div className="space-y-24">
                                         <div
                                            
                                            className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                                        >
                                        {order.order_items.map((product) => (
                                            <>
                                       
                                            <div key={product.transaction_id} className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                                            <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden">
                                                <img src={`http://localhost:8000${product.photo}`}  alt={product.imageAlt} className="object-center object-cover" />
                                            </div>
                                            </div>
                                            <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                <a href={product.href}>{product.name}</a>
                                            </h3>
                                            <p className="font-medium text-gray-900 mt-1">${product.price}</p>
                                            <p className="text-gray-500 mt-3">{product.description}</p>
                                            </div>
                                            </>
                                               ))}
                                            <div className="sm:col-span-12 md:col-span-7">
                                            <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                                                <div>
                                                <dt className="font-medium text-gray-900">Delivery address</dt>
                                                <dd className="mt-3 text-gray-500">
                                                    <span className="block">{order.address_line_1}</span>
                                                    <span className="block">{order.address_line_2}</span>
                                                 
                                                </dd>
                                                </div>
                                                {/* <div>
                                                <dt className="font-medium text-gray-900">Shipping updates</dt>
                                                <dd className="mt-3 text-gray-500 space-y-3">
                                                    <p>{product.email}</p>
                                                    <p>{product.phone}</p>
                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Edit
                                                    </button>
                                                </dd>
                                                </div> */}
                                            </dl>
                                           
                                            <p className="font-medium text-gray-900 mt-6 md:mt-10">
                                                {order.status} - <time dateTime="2021-03-22">{moment(order.date_issued).fromNow()}</time>
                                            </p>
                                             
                                            <div className="mt-6">
                                                <div className="bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-2 bg-indigo-600 rounded-full"
                                                    style={{ width: `calc((${order.step} * 2 + 1) / 8 * 100%)` }}
                                                />
                                                </div>
                                                <div className="hidden sm:grid grid-cols-4 font-medium text-gray-600 mt-6">
                                                <div className="text-indigo-600">Order placed</div>
                                                <div className={classNames(order.step > 0 ? 'text-indigo-600' : '', 'text-center')}>
                                                    Processing
                                                </div>
                                                <div className={classNames(order.step > 1 ? 'text-indigo-600' : '', 'text-center')}>
                                                    Shipped
                                                </div>
                                                <div className={classNames(order.step > 2 ? 'text-indigo-600' : '', 'text-right')}>
                                                    Delivered
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                         </div>
                                           
                                    
                                    </div>
                                    </div>

                                    {/* Billing */}
            
                                </div>
                                </div>
                            

                        </div>
                    </div>
                </div>
            </main>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    order: state.Orders.order,
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
})
export default connect(mapStateToProps, {
    list_orders,
    get_order_detail,
    get_items,
    get_total,
    get_item_total 
}) (DashboardPaymentDetail);