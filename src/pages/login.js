import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().email("ایمیل نامعتبر").required("ضروری"),
      password: yup.string().min(6, "حداقل 6 کاراکتر").required("ضروری"),
    }),
    onSubmit: (values) => {
      const success = login(values.email, values.password);
      if (success) {
        navigate("/dashboard");
      } else {
        alert("اطلاعات ورود اشتباه است");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 to-blue-500
     dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 dark:text-white">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-blue-400 p-8 rounded shadow-md w-80 dark:bg-gray-900 dark:border border-white-600"
      >
        <h2 className="text-xl font-bold mb-10 ml-24">ورود</h2>
        <input
          type="email"
          name="email"
          placeholder="ایمیل"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full border p-2 mb-2 dark:bg-gray-900 dark:border border-gray-600"
        />
        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="w-full border p-2 mb-4 dark:bg-gray-900 dark:border border-gray-600"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded dark:bg-blue-900"
        >
          ورود
        </button>
       
      </form>
    </div>
  );
}

export default Login;
