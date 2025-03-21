"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUpdateUserMutation } from "@/graphql/hooks";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth-store";
import { User } from "@/graphql/types";

export default function Name() {
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [updateUserMutation, { loading }] = useUpdateUserMutation();
  const setUser = useAuthStore((state) => state.setUser);
  const token = useAuthStore((state) => state.token);
  const username = useAuthStore((state) => state.user?.name);
  const id = useAuthStore((state) => state.user?.id);
  const { register, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: username,
    },
  });
  const { toast } = useToast();
  const onSubmit = async (data: { name: string }) => {
    if (isEditingNickname) {
      const result = await updateUserMutation({
        variables: { updateUserInput: { id: id ?? "", name: data.name } },
        context: { headers: { Authorization: `Bearer ${token}` } },
        update: (cache) => {
          cache.evict({ fieldName: "user" });
          cache.gc();
        },
      });
      if (!result) {
        toast({
          title: "Failed to update nickname",
          description: "Please try again",
        });
      } else {
        setUser((state: User) => ({
          ...state,
          name: data.name,
        }));
        toast({
          title: "Nickname updated successfully",
        });
      }
    }
    setIsEditingNickname(!isEditingNickname);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center gap-2"
    >
      {isEditingNickname ? (
        <Input
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 1,
              message: "Name must be at least 1 character long",
            },
          })}
          className="max-w-[200px]"
        />
      ) : (
        <h2 className="text-2xl font-semibold">{username}</h2>
      )}
      <Button
        variant="ghost"
        size="sm"
        aria-label={isEditingNickname ? "Save nickname" : "Edit nickname"}
        disabled={loading}
      >
        {isEditingNickname ? "Save" : "Edit"}{" "}
        {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
    </form>
  );
}
