import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  UserCircle,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { getCurrentUser } from "../../mockData/users"; // ✅ Import your mock user data

export default function Navbar() {
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // ✅ Load actual user (Divye)
  const user = getCurrentUser();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/directory", label: "Directory", icon: Users },
    { path: "/events", label: "Events", icon: Calendar },
    { path: "/groups", label: "Groups", icon: MessageSquare },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
                <img
                  src="/alumnilink-logo.jpg"
                  alt="AlumniLink Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-blue-600">AlumniLink</span>
              <span className="text-xs text-slate-500 font-medium tracking-wider uppercase">
                Connect • Grow • Succeed
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`relative flex items-center space-x-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 group ${
                  location.pathname === path
                    ? "text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md shadow-blue-100/50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/80 hover:shadow-md hover:shadow-slate-200/50 hover:scale-105"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-all duration-300 ${
                    location.pathname === path
                      ? "text-blue-600"
                      : "group-hover:scale-110"
                  }`}
                />
                <span className="font-semibold">{label}</span>
              </Link>
            ))}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-white/80 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-10 h-10 rounded-2xl object-cover ring-2 ring-white shadow-md group-hover:ring-blue-200 transition-all duration-300"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-900">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500">Online</p>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                  isProfileDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsProfileDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-3 w-72 rounded-2xl shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200/50 z-20 overflow-hidden bg-white">
                  <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-md"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                        <p className="text-xs text-blue-600 font-medium">
                          {user.headline}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link
                      to={`/profile/${user.id}`}
                      className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-blue-50/50 hover:text-blue-700 transition-all duration-200 group"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <UserCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
