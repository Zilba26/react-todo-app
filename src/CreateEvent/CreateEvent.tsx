import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { addEvent } from "../LocalStorage";
import { Event } from "../models/Event";

import { AddIcon } from "@chakra-ui/icons";
import { Priority } from "../models/Priority";
import { Category } from "../models/Category";

interface CreateEventProps {}

const CreateEvent: React.FC<CreateEventProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    reminder: "", // Default to 'None'
    priority: Priority.LIGHT, // Default to 'Light'
  });

  const firstField = React.useRef(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCreate = () => {
    // Validate and handle the creation of the event
    const { name, description, startDate, endDate, reminder, priority } =
      formData;

    // Validate the form data here

    // Create a new event
    const newEvent = new Event(
      // You can generate a unique ID using a function or a library
      // For simplicity, you can use the current timestamp as an ID
      Date.now(),
      name,
      description,
      new Date(startDate),
      new Date(endDate),
      new Date(reminder),
      new Category(0, "None", "#000000"),
      priority
    );

    // Add the new event to the list
    addEvent(newEvent);

    // Close the drawer
    onClose();
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Create Event
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new Event
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  ref={firstField}
                  id="name"
                  placeholder="Please enter a name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="startDate">Start Date</FormLabel>
                <Input
                  type="date"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="endDate">End Date</FormLabel>
                <Input
                  type="date"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="reminder">Reminder</FormLabel>
                <Select
                  id="reminder"
                  value={formData.reminder}
                  onChange={handleInputChange}
                >
                  {/* Options for reminder */}
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="priority">Priority</FormLabel>
                <Select
                  id="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  {/* Options for priority */}
                </Select>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter
            borderTopWidth="1px"
            display="flex"
            flexDirection="row"
            justifyContent="space-evenly"
          >
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleCreate}>
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateEvent;
