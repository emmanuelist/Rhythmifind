"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"; // Import useForm and SubmitHandler from react-hook-form
import { useState } from "react"; // Import useState hook from react
import { toast } from "react-hot-toast"; // Import toast function from react-hot-toast
import uniqid from "uniqid"; // Import uniqid function from uniqid module
import { useSupabaseClient } from "@supabase/auth-helpers-react"; // Import useSupabaseClient hook from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"; // Import useRouter hook from next/navigation

import useUploadModal from "@/hooks/useUploadModal"; // Import useUploadModal hook from "@/hooks/useUploadModal"
import { useUser } from "@/hooks/useUser"; // Import useUser hook from "@/hooks/useUser"

import Modal from "./Modal"; // Import Modal component
import Input from "./Input"; // Import Input component
import Button from "./Button"; // Import Button component


const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false); // State for loading state
  const uploadModal = useUploadModal(); // useUploadModal hook from "@/hooks/useUploadModal"
  const { user } = useUser(); // useUser hook from "@/hooks/useUser"
  const supabaseClient = useSupabaseClient(); // useSupabaseClient hook from "@supabase/auth-helpers-react"
  const router = useRouter(); // useRouter hook from next/navigation

  // Form handling with react-hook-form
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  // Function to handle modal state change
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  // Function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true); // Set loading state to true
      const imageFile = values.image?.[0]; // Get the selected image file
      const songFile = values.song?.[0]; // Get the selected song file

      // Check if required fields are filled
      if (!imageFile || !songFile || !user) {
        toast.error("Please fill all the fields");
        return;
      }

      const uniqueID = uniqid(); // Generate a unique ID for the song

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload.");
      }

      // Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      // Insert song data into database
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      // Refresh the page
      router.refresh();
      setIsLoading(false); // Set loading state to false
      toast.success("Song created!"); // Display success toast
      reset(); // Reset form fields
      uploadModal.onClose(); // Close the upload modal
    } catch (error) {
      toast.error("An error occurred while uploading the song"); // Display error toast
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload a song to your library"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      {/* Upload form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        {/* Input for song file */}
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", { required: true })}
          />
        </div>
        {/* Input for image file */}
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
