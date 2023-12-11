import React from "react";
import { Heading } from "@chakra-ui/react";

export const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventResponse = await fetch("http://localhost:3000/events");
        if (!eventResponse.ok) {
          throw new Error("Failed to fetch events");
        }
        const eventData = await eventResponse.json();
        setEvents(eventData);
        console.log(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div className="event-page">
      <Heading>Event</Heading>

      <Text>{events.title}</Text>
      <Text>{event.description}</Text>
      <Text>{event.startTime}</Text>
      <Text>{event.endTime}</Text>
    </div>
  );
};
