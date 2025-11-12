import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Building, Calendar, Edit3, Users, MessageSquare } from "lucide-react";
import { User, Post } from "../../shared/types";
import { mockUsers } from "../mockData/users";
import { mockPosts } from "../mockData/posts";
import Button from "../components/common/Button";
import PostCard from "../components/features/PostCard";
import UserCard from "../components/features/UserCard";

// Temporary mock current user (simulates logged-in user)
const mockCurrentUser = {
  id: "1",
  name: "Guest User",
  profilePicture:
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=500&q=80",
  connections: ["2", "3", "4"],
};

export default function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [connections, setConnections] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<"about" | "posts" | "connections">("about");
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (userId) {
      loadProfile(userId);
    }
  }, [userId]);

  const loadProfile = async (id: string) => {
    setIsLoading(true);
    try {
      // Mock lookup instead of API call
      const userData = mockUsers.find((u) => u.id === id);
      if (userData) {
        setProfile(userData);

        // Load user's posts
        const posts = mockPosts.filter((post) => post.authorId === id);
        setUserPosts(posts);

        // Load connections
        const userConnections = mockUsers.filter((user) =>
          userData.connections.includes(user.id)
        );
        setConnections(userConnections);

        // Check if current user is connected to this profile
        setIsConnected(userData.connections.includes(mockCurrentUser.id));
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    if (!profile || isConnecting) return;

    setIsConnecting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsConnected(!isConnected);
    setIsConnecting(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Profile not found</h1>
          <p className="text-gray-600 mt-2">
            The user profile you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const isOwnProfile = mockCurrentUser.id === profile.id;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>

        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
            {/* Profile Picture */}
            <div className="relative -mt-16 mb-4 sm:mb-0">
              <img
                src={profile.profilePicture}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white"
              />
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-lg text-gray-600 mb-2">{profile.headline}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  {profile.currentCompany}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Class of {profile.graduationYear}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-4 sm:mt-0">
              {isOwnProfile ? (
                <Button variant="outline">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant={isConnected ? "outline" : "primary"}
                    onClick={handleConnect}
                    isLoading={isConnecting}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    {isConnected ? "Connected" : "Connect"}
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{connections.length}</div>
              <div className="text-sm text-gray-500">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{userPosts.length}</div>
              <div className="text-sm text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{profile.skills.length}</div>
              <div className="text-sm text-gray-500">Skills</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { key: "about", label: "About", count: null },
            { key: "posts", label: "Posts", count: userPosts.length },
            { key: "connections", label: "Connections", count: connections.length },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
              {count !== null && (
                <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "about" && (
            <div className="space-y-6">
              {/* Bio */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{profile.headline}</h4>
                      <p className="text-gray-600">{profile.currentCompany}</p>
                      <p className="text-sm text-gray-500">2025 - Present</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{profile.college}</h4>
                    <p className="text-gray-600">{profile.branch}</p>
                    <p className="text-sm text-gray-500">
                      Class of {profile.graduationYear}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "posts" && (
            <div className="space-y-6">
              {userPosts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-600">
                    {isOwnProfile
                      ? "You haven't posted anything yet."
                      : `${profile.name} hasn't posted anything yet.`}
                  </p>
                </div>
              ) : (
                userPosts.map((post) => <PostCard key={post.id} post={post} />)
              )}
            </div>
          )}

          {activeTab === "connections" && (
            <div>
              {connections.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No connections yet</h3>
                  <p className="text-gray-600">
                    {isOwnProfile
                      ? "Start connecting with alumni!"
                      : `${profile.name} hasn't connected with anyone yet.`}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {connections.map((connection) => (
                    <UserCard key={connection.id} user={connection} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
