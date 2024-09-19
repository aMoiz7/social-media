"use client"
import { useState } from "react";
import api from "../utils/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FollowButton from "./followButton";

interface PostCardProps {
  post: {
    id: number;
    content: string;
    user_id: number;
    username: string;
    likes_count: number;
  };
}

const likeSchema = z.object({
  postId: z.number().positive(),
});

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [likes, setLikes] = useState(post.likes_count);
  const [isLiking, setIsLiking] = useState(false);

  console.log(post , "pos")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(likeSchema),
    defaultValues: { postId: post.id },
  });

  const onLike = async (data: any) => {
    setIsLiking(true);
    try {
      await api(`/post/like/${data.postId}`, "POST");
      setLikes((prev) => prev + 1);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-normal text-sm text-gray-500">user : {post.username}</h3>
        <FollowButton userId={post.user_id} />
      </div>
      <p className="mb-2">{post.content}</p>
      <div className="flex items-center">
        <form
          onSubmit={handleSubmit(onLike)}
          className="flex items-center space-x-2"
        >
          <input type="hidden" value={post.id} {...register("postId")} />
          <button
            type="submit"
            className={`px-3 py-1 rounded ${
              isLiking ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
            disabled={isLiking}
          >
            {isLiking ? "Liking..." : "Like"}
          </button>
          <span className="ml-2">
            {likes} {likes === 1 ? "Like" : "Likes"}
          </span>
          {errors.postId && (
            //@ts-ignore
            <p className="text-red-500 text-sm ml-2">{errors.postId.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostCard;
