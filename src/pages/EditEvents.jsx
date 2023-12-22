import { useState } from "react";

export const EditEvents = ({ editEvent, categories, event }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [image, setImage] = useState(event.image);
  const [location, setLoaction] = useState(event.location);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [selectedCategory, setSelectedCategory] = useState(event.categoryIds);

  const handleSubmit = (e) => {
    e.preventDefault();

    editEvent(event.id, {
      title,
      description,
      image,
      location,
      startTime,
      endTime,
      categoryIds: selectedCategory,
    });
  };

  return (
    <div>
      Edit Event
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
          Save Changes
        </button>
      </form>
    </div>
  );
};
