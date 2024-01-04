import { useState } from "react";

export const AddEvent = ({ addEvent, categories }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [location, setLoaction] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);

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
    };

    try {
      const response = await addEvent(newEvent);
      if (response.ok) {
        const eventResponse = await fetch(
          `http://localhost:3000/events/${response.id}`
        );
        if (!eventResponse.ok) {
          throw new Error("Failed to fetch newly added event details");
        }
        const eventData = await eventResponse.json();
        setEventDetails(eventData);

        history.push(`/event/${response.id}`);
      } else {
        throw new Error("Failed to add event");
      }
    } catch (error) {
      console.error("Error adding event:", error);
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
          onChange={(e) => setImage(e.target.value)}
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
        <button type="submit" onClick={handleSubmit}>
          Add Event
        </button>
      </form>
    </div>
  );
};
