import React, { useState, useEffect } from "react";
import {
  Heading,
  Text,
  Image,
  Badge,
  Modal,
  ModalContent,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { EditEvents } from "./EditEvents";
import { DeleteConfirmation } from "../components/DeleteConfirmation";

export const EventPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState({});

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        console.log("Event Response:", response);
        const userResponse = await fetch(`http://localhost:3000/users`);
        const categoryResponse = await fetch(
          `http://localhost:3000/categories`
        );

        if (!response.ok || !userResponse.ok || !categoryResponse.ok) {
          throw new Error("Failed to fetch events");
        }

        const eventData = await response.json();

        const userData = await userResponse.json();
        const categoryData = await categoryResponse.json();
        console.log("User Data:", userData);
        console.log("Category Data:", categoryData);

        setCategoryDetails(categoryData);
        setEventDetails(eventData);

        const creator = userData.find(
          (user) => user.id === String(eventData.createdBy)
        );
        setUserDetails(creator);
        setUserDetails(creator);

        console.log("Event Details:", eventDetails);
        console.log("User Details:", userDetails);
        console.log("Category Details:", categoryDetails);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const setImage = (imageData) => {
    setImageData(imageData);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const confirmDelete = (eventId) => {
    setEventToDelete(eventId);
  };

  const cancelDelete = () => {
    setEventToDelete(null);
  };

  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEventDetails({});

      console.log(`Event with ID ${eventId} deleted`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoryResponse = await fetch("http://localhost:3000/categories");
      if (!categoryResponse.ok) {
        throw new Error("Failed to fetch categories");
      }
      const categoryData = await categoryResponse.json();
      setCategoryDetails(categoryData);
      console.log(categoryData);
    } catch (error) {
      console.log("Error fetching categories:", error);
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

      setEventDetails(editedEvent);

      setIsEditModalOpen(false);

      console.log(`Event with ID ${eventId} edited`);
    } catch (error) {
      console.error("Error editing event:", error);
    }
  };

  return (
    <div className="event-page">
      <Heading>Event</Heading>

      {eventDetails && userDetails && categoryDetails.length > 0 && (
        <>
          <Heading>{eventDetails.title}</Heading>
          <Text>{eventDetails.description}</Text>
          <Text>Start Time: {eventDetails.startTime}</Text>
          <Text>End Time: {eventDetails.endTime}</Text>
          {eventDetails.image && (
            <Image src={eventDetails.image} alt={eventDetails.title} />
          )}
          {categoryDetails.map((category) => {
            if (
              eventDetails.categoryIds &&
              eventDetails.categoryIds.includes(category.id)
            ) {
              return (
                <Badge key={category.id} colorScheme="purple">
                  <Text key={category.id}>Category: {category.name}</Text>
                </Badge>
              );
            }
            return null;
          })}
          <Text>Created By: {userDetails.name}</Text>
          <Image
            borderRadius="full"
            boxSize="150px"
            alt={userDetails.name}
            src={userDetails.image}
          />
          <Badge colorScheme="yellow">
            <Button onClick={openEditModal}>Edit Event</Button>
            <Modal
              blockScrollOnMount={false}
              isOpen={isEditModalOpen}
              onClose={closeEditModal}
            >
              <ModalContent>
                {eventDetails && (
                  <EditEvents
                    event={eventDetails}
                    editEvent={editEvent}
                    categories={categoryDetails}
                    closeEditModal={closeEditModal}
                    setImage={setImage}
                  />
                )}
              </ModalContent>
              <ModalFooter>
                <Button onClick={closeEditModal}>Close</Button>
              </ModalFooter>
            </Modal>
          </Badge>
          <Badge colorScheme="red">
            <DeleteConfirmation
              onConfirmDelete={() => deleteEvent(eventDetails.id)}
              eventId={eventDetails.id}
              onCancelDelete={cancelDelete}
            />
          </Badge>
        </>
      )}
    </div>
  );
};
