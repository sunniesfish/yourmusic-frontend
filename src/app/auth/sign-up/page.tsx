"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface SignUpFormData {
  id: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [idAvailable, setIdAvailable] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    mode: "onChange",
  });

  const handleIdCheck = () => {
    const isAvailable = Math.random() > 0.5;
    setIdAvailable(isAvailable);
  };

  const onSubmit = (data: SignUpFormData) => {
    if (idAvailable !== true) {
      alert("ID 중복 확인을 먼저 해주세요!");
      return;
    }
    console.log("회원가입 시도:", data);
  };

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-900">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="id"
            className="block text-sm font-medium text-blue-900 mb-1"
          >
            ID
          </label>
          <div className="frutiger-aero-input-group flex flex-col md:flex-row">
            <input
              {...register("id", { required: "ID는 필수입니다" })}
              type="text"
              id="id"
              className="frutiger-aero-input w-full px-3 py-2 rounded-md md:rounded-r-none text-blue-900 placeholder-blue-400"
              placeholder="Enter your ID"
            />
            <button
              type="button"
              onClick={handleIdCheck}
              className="frutiger-aero-button-secondary px-3 py-2 rounded-md md:rounded-l-none mt-2 md:mt-0"
            >
              Check
            </button>
          </div>
          {errors.id && (
            <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
          )}
          {idAvailable !== null && (
            <p
              className={`text-sm mt-1 ${
                idAvailable ? "text-green-600" : "text-red-600"
              }`}
            >
              {idAvailable ? "ID is available" : "ID is not available"}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-blue-900 mb-1"
          >
            Username
          </label>
          <input
            {...register("username", {
              required: "사용자 이름은 필수입니다",
              minLength: { value: 2, message: "2글자 이상 입력해주세요" },
            })}
            type="text"
            id="username"
            className="frutiger-aero-input w-full px-3 py-2 rounded-md text-blue-900 placeholder-blue-400"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
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
              required: "비밀번호는 필수입니다",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다",
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-blue-900 mb-1"
          >
            Confirm Password
          </label>
          <input
            {...register("confirmPassword", {
              required: "비밀번호 확인은 필수입니다",
              validate: (value) =>
                value === watch("password") || "비밀번호가 일치하지 않습니다",
            })}
            type="password"
            id="confirmPassword"
            className="frutiger-aero-input w-full px-3 py-2 rounded-md text-blue-900 placeholder-blue-400"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="frutiger-aero-button w-full py-2 px-4 rounded-md text-white font-semibold"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-blue-900 text-sm md:text-base">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
}
