import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/api/user/apiMethods';
import { FormValues, validationSchema } from '../../utils/validation/signUpValidation';
import { toast } from 'sonner';
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";

export default function SignupPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || '';
  const [userEmail, _setUserEmail] = useState(email);

  const navigate = useNavigate();

  const selectUser = (state: any) => state.auth.user?.user;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const initialValues: FormValues = {
    userName: '',
    email: userEmail,
    password: '',
    confirmPassword: '',
  };

  useEffect(() => {
    if (email.length !== 0) {
      initialValues.email = userEmail;
    }
  }, [initialValues, userEmail]);

  const submit = (values: FormValues) => {
    postRegister(values)
      .then((response: any) => {
        if (response.status === 201) {
          localStorage.setItem("userEmail", values.email); 
          navigate("/otp");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error: Error) => {
        console.log(error?.message);
        toast.error("Something went wrong. Please try again.");
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
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          <Form className="mx-auto max-w-xs">
            <Field
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-black"
              type="text"
              name="userName"
              id="userName"
              placeholder="User Name"
            />
            <ErrorMessage name="userName" component="div" className="text-red-500 text-xs mt-1" />

            <Field
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 text-black"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />

            <Field
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 text-black"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />

            <Field
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 text-black"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />

            <motion.div
              className="flex justify-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </motion.div>
          </Form>
        </Formik>
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-sm text-gray-300">Already have an account? </span>
          <a href="/login" className="text-blue-300 hover:underline">Sign In</a>
        </motion.div>
      </motion.div>
    </div>
  );
}
