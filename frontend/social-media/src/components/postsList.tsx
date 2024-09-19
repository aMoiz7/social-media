"use client";
import api from "@/utils/api";
import PostCard from "./postCard";
import { useState, useEffect } from "react";
import AddPostModal from "./addpostmodel";

// Define a type for your post data
interface Post {
  id: number;
  content: string;
  user_id: number;
  username: string;
  likes_count: number;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const allPosts = await api("/post/all", "GET");
      setPosts(allPosts.posts); // Adjust based on your API response structure
    } catch (error: any) {
      setError(error.message);
      console.error("Error fetching posts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostAdded = () => {
    // Refresh the posts after a new one is added
    fetchPosts();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <AddPostModal onPostAdded={handlePostAdded} />
      <h1 className="text-2xl font-bold mb-4 mt-5">All Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default HomePage;
