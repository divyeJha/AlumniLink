import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, Sparkles } from "lucide-react";
import { Post } from "../../../shared/types";
import { mockUsers } from "../../mockData/users";

interface PostCardProps {
  post: Post;
  onLike?: () => void;
}

const mockUser = {
  id: 1,
  name: "Guest User",
  profilePicture:
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=500&q=80",
};

export default function PostCard({ post, onLike }: PostCardProps) {
  const user = mockUser;
  const [isLiking, setIsLiking] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const author = mockUsers.find((u) => u.id === post.authorId);
  const isLiked = likes.includes(String(user.id));

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      // Simulate API delay for UX realism
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (isLiked) {
        setLikes((prev) => prev.filter((id) => id !== String(user.id)));
      } else {
        setLikes((prev) => [...prev, String(user.id)]);
      }

      onLike?.();
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  if (!author) return null;

  return (
    <div className="premium-card rounded-3xl p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-purple-500/5 rounded-full -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={author.profilePicture}
                alt={author.name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                {author.name}
              </h4>
              <p className="text-sm text-slate-500 font-medium mb-1">{author.headline}</p>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-lg">
                  {formatTimestamp(post.timestamp)}
                </div>
                {Math.random() > 0.7 && (
                  <div className="flex items-center space-x-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                    <Sparkles className="w-3 h-3" />
                    <span className="font-medium">Top Post</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors duration-300 opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Post Content */}
        <div className="mb-6">
          <p className="text-slate-800 leading-relaxed text-base font-medium">{post.content}</p>
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-8">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center space-x-2 transition-all duration-300 p-2 rounded-xl hover:scale-110 ${
                isLiked
                  ? "text-red-600 bg-red-50"
                  : "text-slate-500 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-transform duration-300 ${
                  isLiked ? "fill-current scale-110" : "hover:scale-110"
                }`}
              />
              <span className="text-sm font-bold">{likes.length}</span>
            </button>

            <button className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-all duration-300 p-2 rounded-xl hover:bg-blue-50 hover:scale-110">
              <MessageCircle className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
              <span className="text-sm font-bold">{post.comments.length}</span>
            </button>

            <button className="flex items-center space-x-2 text-slate-500 hover:text-emerald-600 transition-all duration-300 p-2 rounded-xl hover:bg-emerald-50 hover:scale-110">
              <Share2 className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
              <span className="text-sm font-bold">Share</span>
            </button>
          </div>

          {/* Engagement indicator */}
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {likes.slice(0, 3).map((userId, index) => {
                const likeUser = mockUsers.find((u) => String(u.id) === userId);
                return likeUser ? (
                  <img
                    key={userId}
                    src={likeUser.profilePicture}
                    alt={likeUser.name}
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    style={{ zIndex: 3 - index }}
                  />
                ) : null;
              })}
            </div>
            {likes.length > 3 && (
              <span className="text-xs text-slate-500 font-medium">
                +{likes.length - 3} others
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
