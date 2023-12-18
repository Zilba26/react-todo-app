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
import { addTask, getCategories, getCategoryByName } from "../LocalStorage";

interface CreateTaskProps {}

const CreateTask: React.FC<CreateTaskProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    category: "Work",
    priority: Priority.LIGHT,
  });

  const firstField = React.useRef(null);

  const categories = getCategories();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCreate = () => {
    const { name, description, date, time, category, priority } = formData;

    // Validate the form data here

    const newTask = new Task(
      // Use the current timestamp as an ID
      Date.now(),
      name,
      description,
      new Date(date + " " + time),
      getCategoryByName(category),
      priority
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
                <Box display="flex" flexDirection="column" gap="10px">
                  <Input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="time"
                    id="time"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </Box>
              </Box>
              <Box>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Select
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
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
