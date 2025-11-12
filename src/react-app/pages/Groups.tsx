import { useState, useEffect } from "react";
import { Users, Lock, Globe, Plus } from "lucide-react";
import { Group } from "../../shared/types";
import Button from "../components/common/Button";
import { mockGroups } from "../mockData/groups"; // ✅ make sure this file exists (local mock data)

// Temporary mock current user
const mockCurrentUser = {
  id: "1",
  name: "Guest User",
};

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [membershipStates, setMembershipStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadGroups = async () => {
    setIsLoading(true);
    try {
      // Load from local mock data instead of API
      const groupsData = mockGroups || [];
      setGroups(groupsData);

      // Initialize membership states
      const initialStates = groupsData.reduce((acc: Record<string, boolean>, group) => {
        acc[group.id] = group.members.includes(mockCurrentUser.id);
        return acc;
      }, {});
      setMembershipStates(initialStates);
    } catch (error) {
      console.error("Error loading groups:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    setMembershipStates((prev) => {
      const next = { ...prev, [groupId]: !prev[groupId] };

      // Update group membership counts locally
      setGroups((prevGroups) =>
        prevGroups.map((group) => {
          if (group.id !== groupId) return group;

          const alreadyMember = group.members.includes(mockCurrentUser.id);
          const updatedMembers = alreadyMember
            ? group.members.filter((id) => id !== mockCurrentUser.id)
            : [...group.members, mockCurrentUser.id];

          return {
            ...group,
            members: updatedMembers,
            memberCount: alreadyMember
              ? group.memberCount - 1
              : group.memberCount + 1,
          };
        })
      );

      return next;
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const publicGroups = groups.filter((group) => !group.isPrivate);
  const privateGroups = groups.filter((group) => group.isPrivate);

  const GroupCard = ({ group }: { group: Group }) => {
    const isMember = membershipStates[group.id];

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* Group banner */}
        <div className="relative h-48">
          <img
            src={group.image}
            alt={group.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            {group.isPrivate ? (
              <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center text-xs">
                <Lock className="w-3 h-3 mr-1" />
                Private
              </div>
            ) : (
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center text-xs">
                <Globe className="w-3 h-3 mr-1" />
                Public
              </div>
            )}
          </div>
        </div>

        {/* Group content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{group.name}</h3>

          <div className="flex items-center text-gray-600 mb-3">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {group.memberCount.toLocaleString()} members
            </span>
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-3">{group.description}</p>

          <div className="flex items-center justify-between">
            {isMember ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleJoinGroup(group.id)}
                className="w-full"
              >
                Leave Group
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleJoinGroup(group.id)}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                {group.isPrivate ? "Request to Join" : "Join Group"}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Groups</h1>
        <p className="text-gray-600">
          Join communities and connect with like-minded alumni
        </p>
      </div>

      {/* Public Groups */}
      {publicGroups.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Public Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}

      {/* Private Groups */}
      {privateGroups.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Private Groups
            <span className="text-lg font-normal text-gray-500 ml-2">
              (Invite or request required)
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {privateGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}

      {/* No Groups */}
      {groups.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No groups available</h3>
          <p className="text-gray-600">
            Check back later for new alumni groups and communities.
          </p>
        </div>
      )}
    </div>
  );
}
