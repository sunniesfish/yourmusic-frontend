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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative inline-flex items-center gap-4 pb-2"
    >
      {isBelongsToUser && !isEditingTitle && (
        <Button
          onClick={handleEditTitle}
          size="sm"
          variant="ghost"
          className="bg-white text-black hover:bg-white/90"
        >
          <Edit2 className="h-3 w-3" />
        </Button>
      )}

      <div className="flex items-center gap-4">
        {isBelongsToUser && isEditingTitle && token ? (
          <>
            <Button type="submit" disabled={isLoading} size="sm">
              {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
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
              className="text-2xl font-semibold min-w-[200px] max-w-[300px] md:min-w-[300px] md:max-w-[600px] xl:min-w-[400px] xl:max-w-[800px] text-center border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 shadow-none focus:shadow-none [&:not(:placeholder-shown)]:text-2xl"
              style={{ fontSize: "1.5rem" }}
              autoFocus
            />
          </>
        ) : (
          <h1 className="text-2xl font-semibold min-w-[200px] max-w-[300px] md:min-w-[300px] md:max-w-[600px] xl:min-w-[400px] xl:max-w-[800px] text-center">
            {playlistName}
          </h1>
        )}
      </div>
      <div className="absolute bottom-0 left-[-4px] right-[-4px] h-[1px] bg-black" />
    </form>
  );
}
