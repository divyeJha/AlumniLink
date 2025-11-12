import { useState } from "react";
import { MapPin, Users, Building, Star, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { User } from "../../../shared/types";
import Button from "../common/Button";

interface UserCardProps {
  user: User;
}

// Temporary mock current user (simulates logged-in user)
const mockCurrentUser = {
  id: 1,
  name: "Guest User",
  profilePicture:
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=500&q=80",
  connections: [2, 3, 4],
};

export default function UserCard({ user }: UserCardProps) {
  const currentUser = mockCurrentUser;
  const [isConnected, setIsConnected] = useState(
    user.connections.includes(String(currentUser.id))
  );
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (isConnecting) return;

    setIsConnecting(true);
    // Simulate a network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsConnected(!isConnected);
    setIsConnecting(false);
  };

  const isCurrentUser = String(currentUser.id) === user.id;
  const isTopPerformer = Math.random() > 0.7; // Mock logic for top performers

  return (
    <div className="premium-card rounded-3xl p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group relative overflow-hidden glow-on-hover">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-purple-500/5 rounded-full -translate-y-12 translate-x-12 floating opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Top performer badge */}
      {isTopPerformer && (
        <div className="absolute top-4 right-4 flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-xl text-xs font-bold">
          <Star className="w-3 h-3 fill-current" />
          <span>Top Alumni</span>
        </div>
      )}

      <div className="relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Profile Picture */}
          <Link to={`/profile/${user.id}`} className="block mb-4 group/avatar">
            <div className="relative">
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-20 h-20 rounded-3xl object-cover ring-4 ring-white shadow-xl hover:shadow-2xl transition-all duration-300 group-hover/avatar:scale-105"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg">
                <div className="w-full h-full rounded-full bg-green-400 animate-pulse"></div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                <span className="text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded-lg">
                  View Profile
                </span>
              </div>
            </div>
          </Link>

          {/* User Info */}
          <Link
            to={`/profile/${user.id}`}
            className="font-bold text-slate-900 hover:text-blue-600 transition-colors duration-300 mb-2 text-lg group/name"
          >
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 group-hover/name:from-blue-600 group-hover/name:to-purple-600 bg-clip-text text-transparent transition-all duration-300">
              {user.name}
            </span>
          </Link>

          <p className="text-sm text-slate-600 mb-3 line-clamp-2 font-medium leading-relaxed">
            {user.headline}
          </p>

          {/* Info grid */}
          <div className="w-full space-y-3 mb-6">
            <div className="flex items-center justify-center text-sm text-slate-500 bg-slate-50 rounded-2xl p-3 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
              <Building className="w-4 h-4 mr-2" />
              <span className="font-medium truncate">{user.currentCompany}</span>
            </div>

            <div className="flex items-center justify-center text-sm text-slate-500 bg-slate-50 rounded-2xl p-3 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="font-medium truncate">{user.location}</span>
            </div>

            <div className="flex items-center justify-center text-sm text-slate-500 bg-slate-50 rounded-2xl p-3 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300">
              <Users className="w-4 h-4 mr-2" />
              <span className="font-medium">{user.connections.length} connections</span>
            </div>
          </div>

          {/* Skills */}
          {user.skills.length > 0 && (
            <div className="w-full mb-6">
              <div className="flex flex-wrap justify-center gap-2">
                {user.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-xl text-xs font-semibold border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
                {user.skills.length > 3 && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold">
                    +{user.skills.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Button logic */}
          <div className="w-full">
            {isCurrentUser ? (
              <Link to={`/profile/${user.id}`} className="block">
                <Button variant="outline" size="sm" className="w-full">
                  <span>View Profile</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300" />
                </Button>
              </Link>
            ) : (
              <Button
                variant={isConnected ? "outline" : "gradient"}
                size="sm"
                className="w-full"
                onClick={handleConnect}
                isLoading={isConnecting}
              >
                {isConnecting ? (
                  <span>Connecting...</span>
                ) : isConnected ? (
                  <>
                    <span>Connected</span>
                    <Sparkles className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    <span>Connect</span>
                    <Users className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Connection status */}
          {isConnected && !isCurrentUser && (
            <div className="mt-3 flex items-center space-x-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl font-medium">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>You're connected</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
