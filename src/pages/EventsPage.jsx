import React, { useEffect, useState } from "react";
import { Heading, Card, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddEvent } from "./AddEvent";

export const EventsPage = () => {
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
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (event) => {
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(event),
    });
    event.id = (await response.json()).id;
    setEvents(events.concat(event));
  };

  return (
    <div className="events-list">
      <Heading>List of events</Heading>
      <AddEvent addEvent={addEvent} />
      <ul>
        <SimpleGrid columns={(1, 2, 3)} spacingY="20px">
          {events.map((event) => (
            <li key={event.id}>
              <Link key={event.id} to={`/events/${event.id}`}>
                <Card key={event.id} maxW="sm">
                  <Image
                    src={event.image}
                    alt={event.title}
                    borderRadius="lg"
                  />
                  <Text>{event.title}</Text>
                  <Text>{event.description}</Text>
                  <Text>{event.startTime}</Text>
                  <Text>{event.endTime}</Text>
                </Card>
              </Link>
            </li>
          ))}
        </SimpleGrid>
      </ul>
    </div>
  );
};
