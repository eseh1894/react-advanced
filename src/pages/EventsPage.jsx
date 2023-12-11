import React, { useEffect, useState } from "react";
import {
  Heading,
  Card,
  SimpleGrid,
  Text,
  Image,
  Badge,
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  Menu,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddEvent } from "./AddEvent";
import { SearchBar } from "../components/SearchBar";
import { EventFilter } from "../components/EventFilter";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = (searchTerm) => {
    const filtered = events.filter((event) => {
      return (
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredEvents(filtered);
  };

  const handleCategorySelect = (categoryId) => {
    if (categoryId === selectedCategory) {
      setSelectedCategory(null);
      setFilteredEvents(events);
    } else {
      setSelectedCategory(categoryId);
      const filtered = events.filter((event) =>
        event.categoryIds.includes(categoryId)
      );
      setFilteredEvents(filtered);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventResponse = await fetch("http://localhost:3000/events");
        if (!eventResponse.ok) {
          throw new Error("Failed to fetch events");
        }
        const eventData = await eventResponse.json();
        setEvents(eventData);
        setFilteredEvents(eventData);
        console.log(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoryResponse = await fetch(
          "http://localhost:3000/categories"
        );
        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);
        console.log(categoryData);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchEvents();
    fetchCategories();
  }, []);

  const addEvent = async (event) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      const newEvent = await response.json();

      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      const updatedEvents = events.filter((event) => event.id !== eventId);
      setEvents(updatedEvents);

      console.log(`Event with ID ${eventId} deleted`);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="events-list">
      <Heading>List of events</Heading>
      <SearchBar onSearch={handleSearch} />
      <EventFilter
        categories={categories}
        onSelectCategory={handleCategorySelect}
      />

      <Button onClick={() => setIsModalOpen(true)}>Add Event</Button>
      <Modal
        blockScrollOnMount={false}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          <AddEvent addEvent={addEvent} />
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ul>
        <SimpleGrid columns={(1, 2, 3)} spacingY="20px">
          {filteredEvents.map((event) => (
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
                  <Text>{categories.name}</Text>
                </Card>
                <Badge colorScheme="red">
                  <button onClick={() => deleteEvent(event.id)}>
                    Delete Event
                  </button>
                </Badge>
              </Link>
            </li>
          ))}
        </SimpleGrid>
      </ul>
    </div>
  );
};
