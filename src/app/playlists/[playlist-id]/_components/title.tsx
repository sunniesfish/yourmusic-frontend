"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Edit2, Loader2 } from "lucide-react";
import { usePlaylist } from "@/hooks/use-playlist";
import { useToast } from "@/hooks/use-toast";
interface TitleProps {
  isBelongsToUser: boolean;
  token: string | undefined;
  playlistId: string;
  playlistName: string;
}

export function Title({
  isBelongsToUser,
  token,
  playlistId,
  playlistName,
}: TitleProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setFocus } = useForm<{ name: string }>({
    defaultValues: {
      name: playlistName,
    },
  });
  const { updatePlaylist } = usePlaylist();
  const { toast } = useToast();
  const onSubmit = async (data: { name: string }) => {
    if (!token) return;
    setIsLoading(true);
    const res = await updatePlaylist({
      playlistId: parseInt(playlistId),
      playlistTitle: data.name,
      token,
    });
    console.log(res);
    if (res) {
      toast({
        title: "Playlist title updated",
      });
      setIsEditingTitle(false);
    } else {
      toast({
        title: "Failed to update playlist title",
        description: "Please try again",
      });
    }
    setIsLoading(false);
    setIsEditingTitle(false);
  };
  const handleEditTitle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsEditingTitle(true);
    setTimeout(() => {
      setFocus("name");
    }, 0);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
      {isBelongsToUser && isEditingTitle && token ? (
        <Input
          {...register("name", {
            required: "Title is required",
            minLength: {
              value: 1,
              message: "Title must be at least 1 character long",
            },
          })}
          onBlur={(e) => {
            if (!e.relatedTarget?.closest("form")) {
              setIsEditingTitle(false);
            }
          }}
        />
      ) : (
        <h1 className="text-2xl font-semibold tracking-tight">
          {playlistName}
        </h1>
      )}

      {isBelongsToUser && isEditingTitle && token ? (
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update"}
        </Button>
      ) : (
        <Button onClick={handleEditTitle}>
          <Edit2 className="h-4 w-4" />
        </Button>
      )}
    </form>
  );
}
