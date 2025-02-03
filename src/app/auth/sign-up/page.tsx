"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/hooks/auth-hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface SignUpFormData {
  id: string;
  username: string;
  password: string;
  confirmPassword: string;
}
export default function SignUp() {
  const router = useRouter();
  const [idAvailable, setIdAvailable] = useState<boolean | null>(null);
  const { signUp, checkIdAvailability } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    mode: "onChange",
  });

  const handleIdCheck = async () => {
    const id = watch("id");
    const isAvailable = await checkIdAvailability(id);
    console.log(isAvailable);
    if (isAvailable) {
      setIdAvailable(true);
    } else {
      setIdAvailable(false);
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    if (idAvailable !== true) {
      alert("Please check ID availability first!");
      return;
    }
    const result = await signUp(data.id, data.username, data.password);
    if (!result) {
      alert("Failed to sign up");
    }
    if (result) {
      router.push("/auth/sign-in");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="id">ID</Label>
          <div className="flex gap-2">
            <Input
              {...register("id", { required: "ID is required" })}
              type="text"
              id="id"
              placeholder="Enter your ID"
              aria-describedby={errors.id ? "id-error" : undefined}
            />
            <Button type="button" variant="outline" onClick={handleIdCheck}>
              Check
            </Button>
          </div>
          {errors.id && (
            <p className="text-sm text-destructive" id="id-error">
              {errors.id.message}
            </p>
          )}
          {idAvailable !== null && (
            <p
              className={`text-sm ${
                idAvailable ? "text-green-600" : "text-destructive"
              }`}
            >
              {idAvailable ? "ID is available" : "ID is not available"}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: { value: 2, message: "Must be at least 2 characters" },
            })}
            type="text"
            id="username"
            placeholder="Enter your username"
            aria-describedby={errors.username ? "username-error" : undefined}
          />
          {errors.username && (
            <p className="text-sm text-destructive" id="username-error">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            id="password"
            placeholder="Enter your password"
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <p className="text-sm text-destructive" id="password-error">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            {...register("confirmPassword", {
              required: "Password confirmation is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            aria-describedby={
              errors.confirmPassword ? "confirm-password-error" : undefined
            }
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive" id="confirm-password-error">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
