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
  updateEvent,
} from "../LocalStorage";
import { Event } from "../models/Event";
import { Priority } from "../models/Priority";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface CreateEventProps extends PropsWithChildren {
  state: "create" | "edit";
  eventToUpdate?: Event;
}

const CreateEvent: React.FC<CreateEventProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getReminderByDate = (event: Event) => {
    if (event == null || event.reminder == null) return "none";
    const diff = event.startDate.getTime() - event.reminder.getTime();
    const minutes = diff / 60000;
    return minutes.toString();
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const firstField = React.useRef(null);

  if (props.state === "edit" && !props.eventToUpdate) {
    return null;
  }

  const categories = getCategories();

  const getReminderDate = (date: Date, reminder: number) => {
    return new Date(date.getTime() - reminder * 60000);
  };

  const submit = (formData: any) => {
    const {
      name,
      description,
      eventDate,
      startTime,
      endTime,
      reminder,
      category,
      priority,
    } = formData;

    const newEvent = new Event(
      props.eventToUpdate ? props.eventToUpdate.id : Date.now(),
      name,
      description,
      new Date(eventDate + " " + startTime),
      new Date(eventDate + " " + endTime),
      getReminderDate(
        new Date(eventDate + " " + startTime),
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

  const openModal = () => {
    onOpen();
    reset();
  };

  return (
    <>
      <Box onClick={openModal} className="flex-center">
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
            {props.state == "create" ? "Create a new Event" : "Update an Event"}
          </DrawerHeader>

          <DrawerBody>
            <form
              id="event-form"
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              onSubmit={handleSubmit(submit)}
            >
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Entrer un nom"
                  {...register("name", {
                    required: "This is required",
                    value:
                      props.state === "edit" ? props.eventToUpdate?.name : "",
                  })}
                />
              </FormControl>
              <FormControl display="flex" flexDirection="column">
                <FormLabel>Description</FormLabel>
                <Textarea
                  height="20px"
                  {...register("description", {
                    value:
                      props.state === "edit"
                        ? props.eventToUpdate?.description
                        : "",
                  })}
                />
              </FormControl>
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>Event Date</FormLabel>
                <Box display="flex" flexDirection="row" gap="10px">
                  <Input
                    type="date"
                    {...register("eventDate", {
                      required: "This is required",
                      value:
                        props.state === "edit"
                          ? props.eventToUpdate?.startDate
                              .toISOString()
                              .split("T")[0]
                          : "",
                    })}
                  />
                </Box>
              </FormControl>
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>Event time</FormLabel>
                <Box display="flex" flexDirection="row" gap="10px">
                  <Input
                    type="time"
                    {...register("startTime", {
                      required: "This is required",
                      value:
                        props.state === "edit"
                          ? props.eventToUpdate?.startDate
                              .toISOString()
                              .split("T")[1]
                              .split(".")[0]
                          : "",
                      validate: (value, formValues) => {
                        const startTime = new Date(
                          formValues.eventDate + " " + value
                        );
                        const endTime = new Date(
                          formValues.eventDate + " " + formValues.endTime
                        );
                        if (startTime > endTime) {
                          return "Start time must be avant end time";
                        }
                        return true;
                      },
                    })}
                  />
                  <Input
                    type="time"
                    {...register("endTime", {
                      required: "This is required",
                      value:
                        props.state === "edit"
                          ? props.eventToUpdate?.endDate
                              .toISOString()
                              .split("T")[1]
                              .split(".")[0]
                          : "",
                    })}
                  />
                </Box>
                <ErrorMessage
                  name="startTime"
                  errors={errors}
                  render={({ message }) => (
                    <p style={{ color: "red" }}>{message}</p>
                  )}
                />
              </FormControl>
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>Rappel</FormLabel>
                <Select
                  {...register("reminder", {
                    required: "This is required",
                    value:
                      props.state === "edit"
                        ? getReminderByDate(props.eventToUpdate!)
                        : "",
                  })}
                >
                  <option value="none">Aucun</option>
                  <option value="15">15 minutes avant</option>
                  <option value="30">30 minutes avant</option>
                  <option value="60">1 heure avant</option>
                  <option value="120">2 heures avant</option>
                  <option value="1440">1 jour avant</option>
                  <option value="2880">2 jours avant</option>
                  <option value="10080">1 semaine avant</option>
                </Select>
              </FormControl>
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  {...register("category", {
                    required: "This is required",
                    value:
                      props.state === "edit"
                        ? props.eventToUpdate?.category.name
                        : "",
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
                <FormLabel>Priorité</FormLabel>
                <Select
                  {...register("priority", {
                    required: "This is required",
                    value:
                      props.state === "edit"
                        ? props.eventToUpdate?.priority
                        : "",
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
              Annuler
            </Button>
            <Button colorScheme="blue" type="submit" form="event-form">
              {props.state == "create" ? "Create" : "Update"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateEvent;
