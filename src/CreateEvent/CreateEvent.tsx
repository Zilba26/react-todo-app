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
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import {
  addEvent,
  getCategories,
  getCategoryByName,
  setCategories,
  updateEvent,
} from "../LocalStorage";
import { Event } from "../models/Event";
import { Priority } from "../models/Priority";
import { useForm } from "react-hook-form";

interface CreateEventProps extends PropsWithChildren {
  state: "create" | "edit";
}

const CreateEvent: React.FC<CreateEventProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
  } = useForm();

  setCategories([
    {
      id: 1,
      name: "Work",
      color: "rgb(0, 255, 0)", // RGB.BLUE,
    },
    {
      id: 2,
      name: "Personal",
      color: "rgb(255, 0, 0)", // RGB.RED,
    },
    {
      id: 3,
      name: "Secret",
      color: "rgb(0, 0, 255)", // RGB.GREEN,
    },
  ]);

  const firstField = React.useRef(null);

  const categories = getCategories();

  const getReminderDate = (date: Date, reminder: number) => {
    return new Date(date.getTime() - reminder * 60000);
  };

  const submit = (formData: any) => {
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

    if (props.state === "edit") {
      updateEvent(newEvent);
    } else if (props.state === "create") {
      addEvent(newEvent);
    } else {
      throw new Error("Invalid state");
    }

    onClose();
  };

  return (
    <>
      <Box onClick={onOpen}>
        {props.children}
      </Box>
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
            Create a new Event
          </DrawerHeader>

          <DrawerBody>
            <form id="event-form" style={{ display: "flex", flexDirection: "column", gap: "8px" }} onSubmit={handleSubmit(submit)}>
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Entrer un nom"
                  {...register('name', {
                    required: 'This is required',
                  })}
                />
              </FormControl>
              <FormControl display="flex" flexDirection="column">
                <FormLabel>Description</FormLabel>
                <Textarea
                  height="20px"
                  {...register('description', {})}
                />
              </FormControl>
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>Start Date</FormLabel>
                <Box display="flex" flexDirection="row" gap="10px">
                  <Input
                    type="date"
                    {...register('startDate', {
                      required: 'This is required',
                    })}
                  />
                  <Input
                    type="time"
                    {...register('startTime', {
                      required: 'This is required',
                    })}
                  />
                </Box>
              </FormControl>
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>End Date</FormLabel>
                <Box display="flex" flexDirection="row" gap="10px">
                  <Input
                    type="date"
                    {...register('endDate', {
                      required: 'This is required',
                    })}
                  />
                  <Input
                    type="time"
                    {...register('endTime', {
                      required: 'This is required',
                    })}
                  />
                </Box>
              </FormControl>
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>Reminder</FormLabel>
                <Select
                  {...register('reminder', {
                    required: 'This is required',
                  })}
                >
                  <option value="none">None</option>
                  <option value="15">15 minutes before</option>
                  <option value="30">30 minutes before</option>
                  <option value="60">1 hour before</option>
                  <option value="120">2 hours before</option>
                  <option value="1440">1 day before</option>
                  <option value="2880">2 days before</option>
                  <option value="10080">1 week before</option>
                </Select>
              </FormControl>
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  {...register('category', {
                    required: 'This is required',
                  })}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>Priority</FormLabel>
                <Select
                  {...register('priority', {
                    required: 'This is required',
                  })}
                >
                  <option value={Priority.LIGHT}>{Priority.LIGHT}</option>
                  <option value={Priority.NORMAL}>{Priority.NORMAL}</option>
                  <option value={Priority.HIGHT}>{Priority.HIGHT}</option>
                </Select>
              </FormControl>
            </form>
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
            <Button colorScheme="blue" type="submit" form="event-form">
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateEvent;
