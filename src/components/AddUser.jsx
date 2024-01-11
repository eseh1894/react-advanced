import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export const AddUser = ({ addUser }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const toast = useToast();

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

      toast({
        title: "User Added",
        description: "New user has been added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding user:", error);

      toast({
        title: "Error",
        description: "Failed to add the user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
