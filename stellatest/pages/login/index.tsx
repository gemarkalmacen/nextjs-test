"use client";

import React, { useState } from "react";
import Image from "next/image";
import TextField from "@/components/design1/customs/TextField";
import Button from "@/components/design1/customs/Button";
import CheckBox from "@/components/design1/customs/Checkbox";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import Link from "next/link";
// import Layout from "@/components/design1/layout/layoutRoot";
// import { useDispatch, useSelector } from "react-redux";
// import { loginFailure, loginStart, loginSuccess } from "@/lib/features/auth/loginSlide";
import { Controller, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession, getSession  } from "next-auth/react";
import Spinner from "@/components/design1/customs/Spinner";
// import { updateEmployeeInfo } from "@/lib/features/settings/settingsSlice";
// import "types/next-auth";

type FormValues = {
  username: string;
  password: string;
};



const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [onGoingRequest, setOnGoingRequest] = useState(false)

  // const formData = useSelector((state: RootState) => state.auth);
// const profile = useSelector((state: RootState) => state.auth.profile);

  // const dispatch = useDispatch();

  const { data: session } = useSession();
  console.log("Session Data in Frontend:", session?.user);
  // console.log("SESSION EMPLUYEE INFO", session?.user.employee_info)

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormValues>({
  //   mode: "onChange",
  //   defaultValues: formData,
  // });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

 console.log("FORM DATA" )


  const onSubmit = async (data: FormValues) => {
    setOnGoingRequest(true)
    // dispatch(loginStart());
  
    // const response = await signIn("credentials", {
    //   username: data.username,
    //   password: data.password,
    //   redirect: false,
    // });
    const response = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    
    if (response?.error) {
      alert("Invalid credentials");
      console.log("Error:", response.error);
    } else {
      router.push("/dashboard");
    }
    
  
    // if (response?.error) {
    //   dispatch(loginFailure("Invalid credentials"));
    //   alert("Invalid credentials");
    //   return;
    // }

    const updatedSession = await getSession();
    console.log("UPDATED SESSION", updatedSession)
  
    // if (updatedSession?.user) {
    //   dispatch(
    //     loginSuccess({
    //       user: updatedSession.user,
    //       token: updatedSession.accessToken,
    //       profile: updatedSession.profile,
    //       employee_info: updatedSession.user.employee_info,
    //     })
    //   );

    // }
  
    router.push("/dashboard");
  };
  
  
  
  return (

    <div className="flex items-center justify-center px-4 lg:px-0 my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 w-[800px] h-[500px] border-gray-200 border-2 shadow-lg rounded-[36px]">
          <div className="flex flex-col flex-grow">
            <div className="flex justify-center items-start">
              {/* <Image
                src="/images/png/surigaocity_logo.png"
                height={60}
                width={60}
                alt="logo"
                className="object-contain pt-[36px]"
              /> */}
            </div>
            <div className="flex-grow">
              <p className="py-6 text-center text-gray-800 font-bold text-xl">
                City Government Portal
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-8 w-full max-w-md flex flex-col gap-3"
              >
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: "Username is required",
                    minLength: {
                      value: 5,
                      message: "Username must be at least 5 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Username"
                      placeholder="Enter your username"
                      error={errors.username?.message}
                      styles={{ variant: "bordered" }}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);
                        // dispatch(loginUsername(value));
                      }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    // pattern: {
                    //   value: /^(?=.*[A-Z])(?=.*\d)/,
                    //   message: "Password must contain at least one uppercase letter and one number",
                    // },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      error={errors.password?.message}
                      placeholder="Enter your password"
                      styles={{ variant: "bordered" }}
                      icon={
                        showPassword ? (
                          <FaRegEye className="text-gray-500" />
                        ) : (
                          <FaRegEyeSlash className="text-gray-500" />
                        )
                      }
                      showPassword={showPassword}
                      onToggleShowPassword={() =>
                        setShowPassword(!showPassword)
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);
                        // dispatch(loginPass(value));
                      }}
                    />
                  )}
                />
                <div className="flex justify-between items-center mb-6">
                  <CheckBox
                    id="rememberMe"
                    label="Remember Me"
                    checked={rememberMe}
                    onChange={setRememberMe}
                  />
                  <Link
                    href="/forgot-password"
                    className="text-xs md:text-sm text-blue-600 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  color="dominant"
                  variant="filled"
                  size="fullWidth"
                  title={onGoingRequest ? (
                    <>
                      <Spinner size={20} className="text-white"/>
                    </>
                  ) : (
                    "Submit"
                  )}
                />
              </form>
            </div>
          </div>
          <div className="relative rounded-tr-[36px] rounded-br-[36px] overflow-hidden hidden md:block">
            {/* <Image
              src="/images/jpg/img1.jpg"
              alt="image1"
              layout="fill"
              objectFit="cover"
            /> */}
          </div>
        </div>
      </div>



    // <div className="flex items-center justify-center min-h-screen bg-blue-50">
    //   <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
    //     <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>

    //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    //       {/* Email Field */}
    //       <div>
    //         <label htmlFor="email" className="block text-sm font-medium text-blue-600">
    //           Email
    //         </label>
    //         <input
    //           id="email"
    //           type="email"
    //           {...register('email', {
    //             required: 'Email is required',
    //             pattern: {
    //               value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    //               message: 'Enter a valid email address',
    //             },
    //           })}
    //           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //           placeholder="Enter your email"
    //         />
    //         {errors.email && (
    //           <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
    //         )}
    //       </div>

    //       {/* Password Field */}
    //       <div>
    //         <label htmlFor="password" className="block text-sm font-medium text-blue-600">
    //           Password
    //         </label>
    //         <input
    //           id="password"
    //           type="password"
    //           {...register('password', { required: 'Password is required' })}
    //           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //           placeholder="Enter your password"
    //         />
    //         {errors.password && (
    //           <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
    //         )}
    //       </div>

    //       {/* Submit Button */}
    //       <div className="flex items-center justify-between">
    //         <button
    //           type="submit"
    //           disabled={isSubmitting}
    //           className={`w-full py-2 px-4 ${
    //             isSubmitting ? 'bg-blue-300' : 'bg-blue-600'
    //           } text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
    //         >
    //           {isSubmitting ? 'Logging in...' : 'Log In'}
    //         </button>
    //       </div>
    //     </form>

    //     <div className="flex justify-center">
    //       <p className="text-sm text-blue-600">
    //         Don’t have an account?{' '}
    //         <a href="/register" className="font-semibold text-blue-800 hover:underline">
    //           Sign up
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
