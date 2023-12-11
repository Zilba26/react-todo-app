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

import { AddIcon } from "@chakra-ui/icons";
import { Task } from "../models/Task";
import { Priority } from "../models/Priority";
import { addTask } from "../LocalStorage";

interface CreateTaskProps {}

const CreateTask: React.FC<CreateTaskProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    priority: Priority.LIGHT,
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
    // Validate and handle the creation of the reminder
    const { name, description, date, priority } = formData;

    // Validate the form data here

    // Create a new reminder
    const newTask = new Task(
      // You can generate a unique ID using a function or a library
      // For simplicity, you can use the current timestamp as an ID
      Date.now(),
      name,
      description,
      new Date(date),
      priority as Priority
    );

    // Add the new reminder to the list
    addTask(newTask);

    // Close the drawer
    onClose();
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Create Task
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create a new Task</DrawerHeader>

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
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="priority">Priority</FormLabel>
                <Select
                  id="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value={Priority.LIGHT}>{Priority.LIGHT}</option>
                  <option value={Priority.NORMAL}>{Priority.NORMAL}</option>
                  <option value={Priority.HIGHT}>{Priority.HIGHT}</option>
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

export default CreateTask;
