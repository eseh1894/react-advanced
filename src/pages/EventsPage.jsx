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
  Box,
  FormLabel,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AddEvent } from "./AddEvent";
import { SearchBar } from "../components/SearchBar";
import { EventFilter } from "../components/EventFilter";
import { EditEvents } from "./EditEvents";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { AddUser } from "../components/AddUser";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [users, setUsers] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [eventToDelete, setEventToDelete] = useState(null);
  const [image, setImage] = useState("");

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
      const filtered = events.filter(
        (event) => event.categoryIds && event.categoryIds.includes(categoryId)
      );
      setFilteredEvents(filtered);
    }
  };

  const history = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventResponse = await fetch("http://localhost:3000/events");

        if (!eventResponse.ok) {
          const errorData = await eventResponse.json();
          throw new Error(
            `Failed to fetch events: ${eventResponse.status} - ${errorData.message}`
          );
        }

        const eventData = await eventResponse.json();
        setEvents(eventData);
        setFilteredEvents(eventData);
        console.log(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const userResponse = await fetch("http://localhost:3000/users");
        if (!userResponse.ok) {
          throw new Error("Failed to fetch users");
        }
        const userData = await userResponse.json();
        setUsers(userData);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
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
    fetchUsers();
    fetchCategories();
  }, [isEditModalOpen, isModalOpen]);

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
      history(`/event/${newEvent.id}`);
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

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );

      console.log(`Event with ID ${eventId} deleted`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const editEvent = async (eventId, updatedEventData) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEventData),
      });

      if (!response.ok) {
        throw new Error("Failed to edit event");
      }

      const editedEvent = await response.json();

      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === eventId ? editedEvent : event))
      );

      if (editedEvent.image) {
        setImage(editedEvent.image);
      }

      setIsEditModalOpen(false);

      console.log(`Event with ID ${eventId} edited`);
    } catch (error) {
      console.error("Error editing event:", error);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const newUser = await response.json();

      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedEvent(null);
    setIsEditModalOpen(false);
  };

  const confirmDelete = (eventId) => {
    setEventToDelete(eventId);
  };

  const cancelDelete = () => {
    setEventToDelete(null);
  };

  const openUserModal = () => {
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };
  console.log("Categories:", categories);

  return (
    <div className="events-list">
      <Heading>List of events</Heading>
      <SearchBar onSearch={handleSearch} />

      <EventFilter
        categories={categories}
        onSelectCategory={handleCategorySelect}
      />

      <Button colorScheme="teal" mt={4} onClick={() => setIsModalOpen(true)}>
        Add Event
      </Button>
      <Modal
        blockScrollOnMount={false}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          <FormLabel>Create Event</FormLabel>
          <AddEvent addEvent={addEvent} categories={categories} users={users} />
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

      <Button
        colorScheme="teal"
        mt={4}
        onClick={() => setIsUserModalOpen(true)}
      >
        Add User
      </Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isUserModalOpen}
        onClose={closeUserModal}
      >
        <ModalContent>
          <AddUser addUser={addUser} />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeUserModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ul>
        <SimpleGrid columns={(1, 2, 3)} spacingY="20px">
          {filteredEvents.map((event) => (
            <li key={event.id}>
              <Link key={event.id} to={`/event/${event.id}`}>
                <Card key={event.id} maxW="sm" boxShadow="md" rounded="md">
                  <Image
                    src={event.image}
                    alt={event.title}
                    borderRadius="lg"
                  />
                  <Text>{event.title}</Text>
                  <Text>{event.description}</Text>
                  <Text> Start Time: {event.startTime}</Text>
                  <Text> End Time: {event.endTime}</Text>
                  <Box>
                    {categories.map((category) => {
                      // console.log("Category ID:", category.id);
                      return event.categoryIds &&
                        event.categoryIds.includes(category.id) ? (
                        <Badge key={category.id} colorScheme="purple">
                          <Text key={category.id}>
                            Category: {category.name}
                          </Text>
                        </Badge>
                      ) : null;
                    })}
                  </Box>
                </Card>
              </Link>

              <DeleteConfirmation
                onConfirmDelete={() => deleteEvent(event.id)}
                eventId={event.id}
                onCancelDelete={cancelDelete}
              />

              <Button
                colorScheme="yellow"
                ml={2}
                onClick={() => openEditModal(event)}
              >
                Edit Event
                <Modal
                  blockScrollOnMount={false}
                  isOpen={isEditModalOpen}
                  onClose={closeEditModal}
                >
                  <ModalContent>
                    {selectedEvent && (
                      <EditEvents
                        event={selectedEvent}
                        editEvent={editEvent}
                        categories={categories}
                        closeEditModal={closeEditModal}
                        setImage={setImage}
                      />
                    )}
                  </ModalContent>
                  <ModalFooter>
                    <button onClick={() => deleteEvent(event.id)}>Close</button>
                  </ModalFooter>
                </Modal>
              </Button>
            </li>
          ))}
        </SimpleGrid>
      </ul>
    </div>
  );
};
