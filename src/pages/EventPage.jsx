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
import { useParams } from "react-router-dom";
import { EditEvents } from "./EditEvents";
import { DeleteConfirmation } from "../components/DeleteConfirmation";

export const EventPage = () => {
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

        setCategoryDetails(categoryData);

        setEventDetails(eventData);

        const creator = userData.find(
          (user) => user.id === eventData.createdBy
        );
        setUserDetails(creator);

        console.log(eventData);

        console.log(categoryDetails);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

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
            if (category.id === eventDetails.selectedCategory) {
              return <Text key={category.id}>Category: {category.name}</Text>;
            }
            return null;
          })}
          <Text>Created By: {userDetails.name}</Text>
          <Image
            borderRadius="full"
            boxSize="150px"
            alt="{userDetaisl.name}"
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
                    editEvent={() => {}}
                    categories={categoryDetails}
                    closeEditModal={closeEditModal}
                    setImage={() => {}}
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
          ;
        </>
      )}
    </div>
  );
};
