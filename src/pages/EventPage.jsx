import React, { useState, useEffect } from "react";
import { Heading, Text, Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const EventPage = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [categoryDetails, setCategoryDetails] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
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
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  return (
    <div className="event-page">
      <Heading>Event</Heading>

      {eventDetails && userDetails && categoryDetails.length > 0 && (
        <>
          <Heading>{eventDetails.title}</Heading>

          <Text>{eventDetails.description}</Text>
          <Text>{eventDetails.startTime}</Text>
          <Text>{eventDetails.endTime}</Text>
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
        </>
      )}
    </div>
  );
};
