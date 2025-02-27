"use client";

import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface SignInFormData {
  id: string;
  password: string;
  formError?: string;
}

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    mode: "onChange",
  });
  const { toast } = useToast();

  const onSubmit = async (data: SignInFormData) => {
    const result = await signIn(data.id, data.password);
    if (!result) {
      setError("formError", {
        type: "manual",
        message: "Invalid ID or password",
      });
    } else {
      toast({
        title: "Login successful",
      });
      router.push("/playlists/newplaylist");
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to sign in
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">ID</Label>
            <Input
              {...register("id", {
                required: "ID is required",
              })}
              id="id"
              placeholder="Enter your ID"
              aria-describedby={errors.id ? "id-error" : undefined}
            />
            {errors.id && (
              <p className="text-sm text-destructive" id="id-error">
                {errors.id.message}
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

          <Button type="submit" className="w-full">
            Sign In
          </Button>

          {errors.formError && (
            <p className="text-sm text-destructive text-center">
              {errors.formError.message}
            </p>
          )}
        </form>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
