import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users, Video } from "lucide-react";
import { Event } from "../../shared/types";
import Button from "../components/common/Button";
import { mockEvents } from "../mockData/events"; // local mock data

// Temporary mock current user (string ids to match mockEvents)
const mockCurrentUser = {
  id: "1",
  name: "Guest User",
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rsvpStates, setRsvpStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      // Use local mock events instead of API
      const eventsData = mockEvents || [];
      setEvents(eventsData);

      // Initialize RSVP states for the mock current user
      const initialRsvpStates = eventsData.reduce((acc: Record<string, boolean>, event) => {
        acc[event.id] = event.attendees?.includes(mockCurrentUser.id) ?? false;
        return acc;
      }, {});
      setRsvpStates(initialRsvpStates);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRSVP = async (eventId: string) => {
    // For now, we rely on mockCurrentUser — if not present, do nothing
    if (!mockCurrentUser) return;

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Toggle RSVP state locally
      setRsvpStates((prev) => {
        const next = { ...prev, [eventId]: !prev[eventId] };
        // Also update the events array so counts reflect the change
        setEvents((prevEvents) =>
          prevEvents.map((ev) => {
            if (ev.id !== eventId) return ev;
            const already = ev.attendees.includes(mockCurrentUser.id);
            const updatedAttendees = already
              ? ev.attendees.filter((id) => id !== mockCurrentUser.id)
              : [...ev.attendees, mockCurrentUser.id];
            return { ...ev, attendees: updatedAttendees };
          })
        );
        return next;
      });
    } catch (error) {
      console.error("Error updating RSVP:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const time = new Date();
    time.setHours(parseInt(hours, 10), parseInt(minutes ?? "0", 10));
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  const upcomingEvents = events.filter((event) => isUpcoming(event.date));
  const pastEvents = events.filter((event) => !isUpcoming(event.date));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const EventCard = ({ event, isPast = false }: { event: Event; isPast?: boolean }) => {
    const isRSVPed = rsvpStates[event.id];

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          {isPast && (
            <div className="absolute top-4 right-4 bg-gray-900/80 text-white px-2 py-1 rounded text-sm">
              Past Event
            </div>
          )}
          {isRSVPed && !isPast && (
            <div className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded text-sm">
              RSVP'd
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm">{formatDate(event.date)}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm">{formatTime(event.time)}</span>
            </div>

            <div className="flex items-center text-gray-600">
              {event.isOnline ? (
                <>
                  <Video className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">{event.location}</span>
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  <span className="text-sm">{event.location}</span>
                </>
              )}
            </div>

            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2 text-purple-500" />
              <span className="text-sm">
                {event.attendees.length} {event.attendees.length === 1 ? "attendee" : "attendees"}
              </span>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-3">{event.description}</p>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">Organized by {event.organizer}</div>

            {!isPast && (
              <Button variant={isRSVPed ? "outline" : "primary"} size="sm" onClick={() => handleRSVP(event.id)}>
                {isRSVPed ? "Cancel RSVP" : "RSVP"}
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Events</h1>
        <p className="text-gray-600">Stay connected and engaged with your alumni community</p>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} isPast />
            ))}
          </div>
        </div>
      )}

      {/* No Events */}
      {events.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events scheduled</h3>
          <p className="text-gray-600">Check back later for upcoming alumni events and gatherings.</p>
        </div>
      )}
    </div>
  );
}
