import { useState } from "react";

export const AddEvent = ({ addEvent, categories }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLoaction] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    addEvent({
      title,
      description,
      image,
      location,
      startTime,
      endTime,
      selectedCategory,
      categoryIds: selectedCategory,
    });

    setTitle("");
    setDescription("");
    setImage("");
    setLoaction("");
    setStartTime("");
    setEndTime("");
    setSelectedCategory([]);
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
          value={image}
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
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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
