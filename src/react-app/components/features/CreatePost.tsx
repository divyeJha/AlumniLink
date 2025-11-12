import { useState } from "react";
import Button from "../common/Button";
import { Image, Smile, Calendar, MapPin, Sparkles } from "lucide-react";
import { getCurrentUser } from "../../mockData/users"; // ✅ Import your actual user

interface CreatePostProps {
  onPostCreated?: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const user = getCurrentUser(); // ✅ Use your real profile (Divye)
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Simulate post creation delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log(`New post created by ${user.name}:`, content);
      setContent("");
      setIsFocused(false);
      onPostCreated?.();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`premium-card rounded-3xl p-6 mb-8 transition-all duration-300 relative overflow-hidden ${
        isFocused ? "ring-2 ring-blue-500/50 shadow-xl shadow-blue-500/10" : ""
      }`}
    >
      {/* Decorative gradient blob in background */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16 transition-opacity duration-500 ${
          isFocused ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <div className="relative z-10">
        <div className="flex items-start space-x-4">
          {/* ✅ Your actual profile picture */}
          <div className="relative">
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-12 h-12 rounded-2xl object-cover flex-shrink-0 ring-2 ring-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>

          {/* Post input area */}
          <form onSubmit={handleSubmit} className="flex-1">
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => !content && setIsFocused(false)}
                placeholder={`What's on your mind, ${user.name.split(" ")[0]}?`}
                className="w-full p-4 border-2 border-slate-200 bg-white/80 backdrop-blur-sm rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-slate-400 font-medium"
                rows={isFocused ? 4 : 2}
                maxLength={500}
              />

              {/* Character count */}
              <div
                className={`absolute bottom-3 right-3 text-xs font-medium transition-colors duration-300 ${
                  content.length > 450 ? "text-red-500" : "text-slate-400"
                }`}
              >
                {content.length}/500
              </div>
            </div>

            {/* Toolbar and submit button */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isFocused || content ? "max-h-20 mt-4" : "max-h-0"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group"
                  >
                    <Image className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Photo</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 group"
                  >
                    <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Event</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 group"
                  >
                    <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Location</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300 group"
                  >
                    <Smile className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Mood</span>
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  {content.trim() && (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 rounded-xl text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      <span>Ready to inspire!</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="gradient"
                    disabled={!content.trim() || isSubmitting}
                    isLoading={isSubmitting}
                    size="sm"
                    className="shadow-lg shadow-blue-500/25"
                  >
                    {isSubmitting ? "Publishing..." : "Share Post"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
