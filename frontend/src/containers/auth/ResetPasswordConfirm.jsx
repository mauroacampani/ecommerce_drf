import Layout from "../../hocs/Layout"
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
import { reset_password_confirm } from "../../redux/actions/auth";
import { Navigate, useParams } from "react-router";


function ResetPasswordConfirm({
    reset_password_confirm,
    loading
}) {

  const params = useParams()

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
 
    new_password: '',
    re_new_password: ''
  })

  const {

    new_password,
    re_new_password
 
  } = formData;

  //   obtiene los valores de los input
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    const uid = params.uid
    const token = params.token 

    reset_password_confirm(uid, token, new_password, re_new_password)
    if (new_password === re_new_password)
      setRequestSent(true);
  }

    if (requestSent && !loading)
      return <Navigate to='/' />

  return (
    <Layout>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-12 w-auto"
            />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Confirmar Nuevo Password</h2>
          
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={e=>onSubmit(e)} className="space-y-6">


              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                 Nuevo Password
                </label>
                <div className="mt-1">
                  <input
                    id="new_password"
                    name="new_password"
                    value={new_password}
                    type="password"
                    placeholder="Password"
                    onChange={e=>onChange(e)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Repetir Password
                </label>
                <div className="mt-1">
                  <input
                    id="re_new_password"
                    name="re_new_password"
                    value={re_new_password}
                    type="password"
                    placeholder="Repetir Password"
                    onChange={e=>onChange(e)}
                 
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                {loading ? 
                <button
     
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                <ClipLoader color="#fff" loading={true} size={20} />
                </button>:
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Resetear Password
                </button>
            }
                
              </div>
            </form>

            
          </div>
        </div>
      </div>
    </Layout>
  )
}
const mapStateToProps = state => ({
    loading: state.Auth.loading
})

export default connect(mapStateToProps, {
    reset_password_confirm
}) (ResetPasswordConfirm);