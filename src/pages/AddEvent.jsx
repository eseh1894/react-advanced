import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export const AddEvent = ({ addEvent, categories, users }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [location, setLoaction] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const toast = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      description,
      image,
      location,
      startTime,
      endTime,
      categoryIds: selectedCategory,
      createdBy: selectedUser,
    };

    try {
      await addEvent(newEvent);

      toast({
        title: "Event Added",
        description: "New event has been added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding event:", error);
      toast({
        title: "Error",
        description: "Failed to add the event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setTitle("");
    setDescription("");
    setImage(null);
    setLoaction("");
    setStartTime("");
    setEndTime("");
    setSelectedCategory([]);
  };
  const handleCategoryChange = (e) => {
    const selectedCategoryIds = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );

    setSelectedCategory(selectedCategoryIds);
  };

  const handleUserChange = (e) => {
    const selectedUserId = parseInt(e.target.value);
    setSelectedUser(selectedUserId);
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    const newUser = {};

    try {
      await addUser(newUser);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      AddEvent
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          placeholder="image"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
        />
        <input
          type="text"
          placeholder="location"
          value={location}
          onChange={(e) => setLoaction(e.target.value)}
        />
        <input
          type="text"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <select
          multiple
          value={selectedCategory}
          onChange={(e) => {
            const options = e.target.options;
            const selectedCategoryIds = [];
            for (let i = 0; i < options.length; i++) {
              if (options[i].selected) {
                selectedCategoryIds.push(parseInt(options[i].value));
              }
            }
            setSelectedCategory(selectedCategoryIds);
          }}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select value={selectedUser} onChange={handleUserChange}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit" onClick={handleSubmit}>
          Add Event
        </button>
      </form>
    </div>
  );
};
