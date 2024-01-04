import React from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

export const DeleteConfirmation = ({ onConfirmDelete, onCancelDelete }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const handleConfirmDelete = () => {
    onConfirmDelete();
    onClose();
  };

  const handleCancelDelete = () => {
    onCancelDelete();
    onClose();
  };

  return (
    <>
      <Button onClick={onToggle}>Delete Event</Button>
      <Popover
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>Are you sure you want to delet this event?</PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline" onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};
