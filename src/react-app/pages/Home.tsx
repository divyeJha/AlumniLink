import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, TrendingUp, Sparkles, Star, ArrowRight } from "lucide-react";
import CreatePost from "../components/features/CreatePost";
import PostCard from "../components/features/PostCard";
import { mockUsers, getCurrentUser } from "../mockData/users"; // ✅ now uses your actual user
import { mockPosts } from "../mockData/posts";

// ✅ Use your real user instead of the Guest one
const user = getCurrentUser();

const mockEvents = [
  { id: 1, title: "Alumni Networking Night", date: "2025-12-10", time: "6:00 PM" },
  { id: 2, title: "Tech Career Panel", date: "2025-12-18", time: "4:00 PM" },
  { id: 3, title: "Startup Showcase 2025", date: "2026-01-05", time: "5:30 PM" },
];

export default function Home() {
  const [posts, setPosts] = useState(mockPosts);
  const [upcomingEvents] = useState(mockEvents);
  const [suggestedUsers] = useState(mockUsers.slice(1, 4)); // skips your own user
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading delay
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Handle new post creation
  const handlePostCreated = () => {
    const newPost = {
      id: String(posts.length + 1),
      authorId: user.id,
      content: `This is a new inspiring post by ${user.name}!`,
      timestamp: new Date().toISOString(),
      likes: [],
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-3">
          {/* Welcome Header */}
          <div className="premium-card rounded-3xl p-8 mb-8 relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 shadow-md">
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-16 h-16 rounded-3xl object-cover ring-4 ring-white shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                    Welcome back, {user.name.split(" ")[0]}! ✨
                  </h1>
                  <p className="text-slate-600 text-lg">
                    Ready to connect and grow your network today?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <div className="text-2xl font-bold text-blue-700">
                    {user.connections.length}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">Connections</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                  <div className="text-2xl font-bold text-purple-700">{posts.length}</div>
                  <div className="text-sm text-purple-600 font-medium">Posts</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl">
                  <div className="text-2xl font-bold text-emerald-700">89%</div>
                  <div className="text-sm text-emerald-600 font-medium">Profile</div>
                </div>
              </div>
            </div>
          </div>

          {/* Post Feed */}
          <CreatePost onPostCreated={handlePostCreated} />
          <div className="space-y-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onLike={() => console.log("Liked")} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="premium-card rounded-3xl p-6 glow-on-hover">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Upcoming Events</h3>
              <div className="p-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="group relative p-4 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-blue-100 rounded-2xl border-l-4 border-blue-500 hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/30 cursor-pointer"
                >
                  <h4 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-blue-800 transition-colors duration-300 line-clamp-1">
                    {event.title}
                  </h4>
                  <p className="text-xs text-slate-500 group-hover:text-slate-600 font-medium transition-colors duration-300">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-4 h-4 text-blue-700" />
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/events"
              className="mt-6 inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 text-orange-700 hover:text-orange-800 text-sm font-semibold rounded-2xl transition-all duration-300 hover:scale-105 border border-orange-200/50 group"
            >
              View All Events
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Suggested Connections */}
          <div className="premium-card rounded-3xl p-6 glow-on-hover">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">People You May Know</h3>
              <div className="p-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="space-y-4">
              {suggestedUsers.map((suggestedUser) => (
                <div
                  key={suggestedUser.id}
                  className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 transition-all duration-300 group"
                >
                  <img
                    src={suggestedUser.profilePicture}
                    alt={suggestedUser.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-md group-hover:ring-blue-200 transition-all duration-300"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/profile/${suggestedUser.id}`}
                      className="text-sm font-bold text-slate-900 hover:text-blue-600 block truncate transition-colors duration-300"
                    >
                      {suggestedUser.name}
                    </Link>
                    <p className="text-xs text-slate-500 truncate font-medium">
                      {suggestedUser.headline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Network Growth */}
          <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white glow-on-hover">
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-white/20 rounded-xl mr-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold">Network Growth</h3>
              </div>

              <p className="text-blue-100 text-sm mb-4 font-medium">
                Your network has grown by <span className="font-bold text-white">15%</span> this
                month! Keep connecting! 🚀
              </p>

              <div className="mb-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Growth Progress</span>
                  <span className="text-sm font-bold">85%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full w-4/5 shadow-sm"></div>
                </div>
              </div>

              <Link
                to="/directory"
                className="inline-flex items-center justify-center w-full px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold rounded-2xl transition-all duration-300 hover:scale-105 border border-white/20 group"
              >
                Expand Network
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
