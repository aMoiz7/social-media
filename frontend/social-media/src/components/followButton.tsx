import { useState } from "react";
import api from "../utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { followSchema } from "./../schemas/followSchmea";

interface FollowButtonProps {
  userId: number;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false); // Tracks if the user is already following
  const [isProcessing, setIsProcessing] = useState(false); // Tracks if the follow action is in progress

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(followSchema),
    defaultValues: { followedId: userId },
  });

  // Handles the follow action
  const onFollow = async (data: any) => {
    setIsProcessing(true); // Disable the button while processing
    try {
      await api(`/post/follow/${data.followedId}`, "POST");
      setIsFollowing(true); // Set the button text to "Following" after successful follow
    } catch (error: any) {
      alert("Already followed or user not found");
    } finally {
      setIsProcessing(false); // Re-enable the button after processing is done
    }
  };

  return (
    <>
      {/* If the user is not following, show the follow button */}
      {!isFollowing ? (
        <form onSubmit={handleSubmit(onFollow)} className="inline-block">
          {/* Hidden input for userId */}
          <input type="hidden" value={userId} {...register("followedId")} />

          {/* Follow button */}
          <button
            type="submit"
            className={`px-3 py-1 rounded ${
              isProcessing ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } text-white`}
            disabled={isProcessing} // Disable the button while processing
          >
            {isProcessing ? "Following..." : "Follow"}{" "}
            {/* Change text dynamically */}
          </button>
        </form>
      ) : (
        // Show "Following" when the user is already following
        <button className="px-3 py-1 rounded bg-green-500 text-white" disabled>
          Following
        </button>
      )}
    </>
  );
};

export default FollowButton;
