import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export const EditEvents = ({ editEvent, categories, event, setImage }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [imageState, setImageState] = useState("");
  const [location, setLoaction] = useState(event.location);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [selectedCategory, setSelectedCategory] = useState(event.categoryIds);

  const toast = useToast();

  const handleImageChange = (e) => {
    setImageState(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editEvent(event.id, {
        title,
        description,
        image: imageState,
        location,
        startTime,
        endTime,
        categoryIds: selectedCategory,
      });

      toast({
        title: "Event Edited",
        description: "Your changes have been saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error editing event:", error);
      toast({
        title: "Error",
        description: "Failed to edit the event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
          accept="image/*"
          onChange={(e) => setImageState(e.target.value)}
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
                selectedCategoryIds.push(options[i].value);
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
          Save Changes
        </button>
      </form>
    </div>
  );
};
