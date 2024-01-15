import { AddIcon } from "@chakra-ui/icons";
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
import {
  addEvent,
  getCategories,
  getCategoryByName,
  setCategories,
} from "../LocalStorage";
import { Event } from "../models/Event";
import { Priority } from "../models/Priority";

interface CreateEventProps {}

const CreateEvent: React.FC<CreateEventProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    reminder: "", // Default to 'None'
    category: "Travail", // Default to 'Work'
    priority: Priority.LIGHT, // Default to 'Light'
  });

  setCategories([
    {
      id: 1,
      name: "Travail",
      color: "rgb(0, 0, 255)", // RGB.BLUE,
    },
    {
      id: 2,
      name: "Personnel",
      color: "rgb(0, 0, 255)", // RGB.RED,
    },
    {
      id: 3,
      name: "Secret",
      color: "rgb(0, 0, 255)", // RGB.GREEN,
    },
  ]);

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

  const getReminderDate = (date: Date, reminder: number) => {
    return new Date(date.getTime() - reminder * 60000);
  };

  const handleCreate = () => {
    // Validate and handle the creation of the event
    const {
      name,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      reminder,
      category,
      priority,
    } = formData;

    // Validate the form data here

    const newEvent = new Event(
      // Current timestamp as an ID
      Date.now(),
      name,
      description,
      new Date(startDate + " " + startTime),
      new Date(endDate + " " + endTime),
      getReminderDate(
        new Date(startDate + " " + startTime),
        parseInt(reminder)
      ),
      getCategoryByName(category),
      priority
    );

    // Add the new event to the list
    addEvent(newEvent);

    // Close the drawer
    onClose();

    // Reset the form data
    setFormData({
      name: "",
      description: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      reminder: "", // Default to 'None'
      category: "Work", // Default to 'Work'
      priority: Priority.LIGHT, // Default to 'Light'
    });
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Créer un évènement
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Créer un évènement
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="7px">
              <Box display="flex" flexDirection="column">
                <FormLabel htmlFor="name">Nom</FormLabel>
                <Input
                  ref={firstField}
                  id="name"
                  placeholder="Please enter a name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Box>
              <Box display="flex" flexDirection="column">
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  height="20px"
                />
              </Box>
              <Box display="flex" flexDirection="column">
                <FormLabel htmlFor="startDate">Date de début</FormLabel>
                <Box display="flex" flexDirection="row" gap="10px">
                  <Input
                    type="date"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="time"
                    id="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                </Box>
              </Box>
              <Box display="flex" flexDirection="column">
                <FormLabel htmlFor="endDate">Date de Fin</FormLabel>
                <Box display="flex" flexDirection="row" gap="10px">
                  <Input
                    type="date"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="time"
                    id="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </Box>
              </Box>
              <Box display="flex" flexDirection="column">
                <FormLabel htmlFor="reminder">Rappel</FormLabel>
                <Select
                  id="reminder"
                  value={formData.reminder}
                  onChange={handleInputChange}
                >
                  <option value="">Aucun</option>
                  <option value="15">15 minutes avant</option>
                  <option value="30">30 minutes avant</option>
                  <option value="60">1 heure avant</option>
                  <option value="120">2 heures avant</option>
                  <option value="1440">1 jour avant</option>
                  <option value="2880">2 jours avant</option>
                  <option value="10080">1 semaine avant</option>
                </Select>
              </Box>
              <Box display="flex" flexDirection="column">
                <FormLabel htmlFor="category">Catégorie</FormLabel>
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
              <Box display="flex" flexDirection="column">
                <FormLabel htmlFor="priority">Priorité</FormLabel>
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

export default CreateEvent;
