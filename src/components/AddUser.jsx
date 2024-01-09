import { useState } from "react";

export const AddUser = ({ addUser }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      image,
    };

    try {
      await addUser(newUser);
      setName("");
      setImage("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

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

  return (
    <div>
      Add User
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          placeholder="image"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};
