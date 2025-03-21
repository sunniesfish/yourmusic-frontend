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
    criteriaMode: "all",
    shouldFocusError: true,
  });
  const { toast } = useToast();

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signIn(data.id, data.password);

      if (!result) {
        setError("password", {
          type: "manual",
          message: "Invalid ID or password",
        });
        return;
      }

      toast({
        title: "Login successful",
      });
      router.push("/playlists/newplaylist");
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: "An error occurred during sign in : " + error,
      });
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
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

          <Button
            type="submit"
            className="w-full"
            disabled={Object.keys(errors).length > 0}
          >
            Sign In
          </Button>

          {errors.root?.serverError && (
            <p className="text-sm text-destructive text-center">
              {errors.root.serverError.message}
            </p>
          )}
          {errors.password?.type === "manual" && (
            <p className="text-sm text-destructive text-center">
              {errors.password.message}
            </p>
          )}
        </form>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
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
