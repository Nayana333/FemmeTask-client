import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { useEffect } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { logged } from '../../utils/context/reducers/authSlice';
import { initialValues, validationSchema } from '../../utils/validation/loginValidation';
import { postLogin } from '../../services/api/user/apiMethods';

export default function LoginPage() {
  const user = useSelector((state: any) => state.auth.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (values: any) => {
    postLogin(values)
      .then((response: any) => {
        const data = response.data;
        console.log(data);       
        if (response.status === 200) {
          toast.success(data.message);
          dispatch(logged({ user: data, token: data.token })); 
          localStorage.setItem('userToken', data.token);
          navigate('/home');
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#282d49] text-white flex justify-center items-center">
      <motion.div
        className="bg-gray-800 p-8 rounded-xl w-full max-w-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit} 
        >
          {({ handleChange, handleBlur, values }) => (
            <Form>
              <div className="mx-auto max-w-xs">
                <div className="mb-4">
                  <Field
                    as="input"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-black"
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="mb-6">
                  <Field
                    as="input"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-black"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <motion.div
                  className="flex justify-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Sign In
                  </Button>
                </motion.div>
              </div>
            </Form>
          )}
        </Formik>
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-sm text-gray-300">Don't have an account? </span>
          <a href="/signup" className="text-blue-300 hover:underline">Sign Up</a>
        </motion.div>
      </motion.div>
    </div>
  );
}
