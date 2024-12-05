"use client";

import { useAuth } from "@/hooks/auth-hooks";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface SignInFormData {
  id: string;
  password: string;
}

export default function SignIn() {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    mode: "onChange",
  });

  const onSubmit = async (data: SignInFormData) => {
    console.log("Login attempt:", data);
    const result = await signIn(data.id, data.password);
    if (!result) {
      alert("Invalid ID or password");
    }
  };

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-900">
        Sign In
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="id"
            className="block text-sm font-medium text-blue-900 mb-1"
          >
            ID
          </label>
          <input
            {...register("id", {
              required: "ID is required",
            })}
            type="text"
            id="id"
            className="frutiger-aero-input w-full px-3 py-2 rounded-md text-blue-900 placeholder-blue-400"
            placeholder="Enter your ID"
          />
          {errors.id && (
            <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-blue-900 mb-1"
          >
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            id="password"
            className="frutiger-aero-input w-full px-3 py-2 rounded-md text-blue-900 placeholder-blue-400"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="frutiger-aero-button w-full py-2 px-4 rounded-md text-white font-semibold"
        >
          Sign In
        </button>
      </form>

      <div className="mt-4 text-center space-y-2">
        <p className="text-blue-900 text-sm md:text-base">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        {/* <p className="text-blue-900 text-sm md:text-base">
          <Link
            href="/auth/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </p> */}
      </div>
    </>
  );
}
