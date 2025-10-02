import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 👇 Dummy data (mimicking API response)
    const dummyEvents = [
      {
        _id: "1",
        title: "Annual Sports Meet",
        description:
          "Join us for KIIT’s biggest sports celebration with multiple competitions across athletics, football, basketball, and more.",
        date: "2025-09-15T00:00:00.000Z",
        location: "Main Stadium",
        imageUrl:
          "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: "2",
        title: "Yoga Workshop",
        description:
          "A special yoga session for stress relief and mindfulness led by certified trainers.",
        date: "2025-09-20T00:00:00.000Z",
        location: "Hostel Gym Hall",
        imageUrl:
          "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: "3",
        title: "Inter-College Cricket Tournament",
        description:
          "An exciting cricket tournament between KIIT and other universities. Come cheer your team!",
        date: "2025-10-05T00:00:00.000Z",
        location: "University Cricket Ground",
        imageUrl:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: "4",
        title: "Inter-College Cricket Tournament",
        description:
          "An exciting cricket tournament between KIIT and other universities. Come cheer your team!",
        date: "2025-10-05T00:00:00.000Z",
        location: "University Cricket Ground",
        imageUrl:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: "5",
        title: "Inter-College Cricket Tournament",
        description:
          "An exciting cricket tournament between KIIT and other universities. Come cheer your team!",
        date: "2025-10-05T00:00:00.000Z",
        location: "University Cricket Ground",
        imageUrl:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80",
      }
    ];

    setEvents(dummyEvents);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold text-green-700 mb-2">
                  {event.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <FaCalendarAlt className="text-green-600" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
