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

import { Task } from "../models/Task";
import { Priority } from "../models/Priority";
import { useForm } from "react-hook-form";
import {
  addTask,
  getCategories,
  getCategoryByName,
  getTaskById,
  updateTask,
} from "../LocalStorage";

interface TaskDrawerProps extends PropsWithChildren {
  state: "create" | "edit";
  task?: Task;
}

const TaskDrawer: React.FC<TaskDrawerProps> = (props: TaskDrawerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, register } = useForm();

  const firstField = React.useRef(null);

  const categories = getCategories();

  const [currentTask, setCurrentTask] = React.useState<Task | null>(null);

  function formatDate(date: string | Date): string {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = parsedDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatTime(date: string | Date): string {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    const hours = parsedDate.getHours().toString().padStart(2, "0");
    const minutes = parsedDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function getDrawerTitle(): string {
    if (props.state === "create") {
      return "Créer une nouvelle tâche";
    } else if (props.state === "edit") {
      return "Modifier une tâche";
    } else {
      throw new Error("Invalid state");
    }
  }

  function getDrawerButtonText(): string {
    if (props.state === "create") {
      return "Créer";
    } else if (props.state === "edit") {
      return "Enregistrer";
    } else {
      throw new Error("Invalid state");
    }
  }

  React.useEffect(() => {
    if (props.state === "edit") {
      if (props.task) {
        const taskToEdit = getTaskById(props.task.id);
        setCurrentTask(taskToEdit);
      }
    }
  }, [props.state, props.task]);

  const submit = (formData: any) => {
    const { name, description, date, time, category, priority } = formData;

    const newTask = new Task(
      // Use the current timestamp as an ID
      props.task ? props.task.id : Date.now(),
      name,
      description,
      new Date(date + " " + time),
      getCategoryByName(category),
      priority
    );

    if (props.state === "edit") {
      updateTask(newTask);
    } else if (props.state === "create") {
      addTask(newTask);
    } else {
      throw new Error("Invalid state");
    }

    // Close the drawer
    onClose();
  };

  return (
    <>
      <Box onClick={onOpen}>{props.children}</Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {getDrawerTitle()}
          </DrawerHeader>

          <DrawerBody>
            <form
              id="task-form"
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
              onSubmit={handleSubmit(submit)}
            >
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Entrer un nom"
                  {...register("name", {
                    required: "This is required",
                  })}
                  defaultValue={currentTask ? currentTask.name : ""}
                />
              </FormControl>
              <FormControl display="flex" flexDirection="column">
                <FormLabel>Description</FormLabel>
                <Textarea
                  height="20px"
                  {...register("description", {})}
                  defaultValue={currentTask ? currentTask.description : ""}
                />
              </FormControl>
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>Date</FormLabel>
                <Box display="flex" flexDirection="column" gap="5px">
                  <Input
                    type="date"
                    {...register("date", {
                      required: "This is required",
                    })}
                    defaultValue={
                      currentTask ? formatDate(currentTask.date) : ""
                    }
                  />
                  <Input
                    type="time"
                    {...register("time", {
                      required: "This is required",
                    })}
                    defaultValue={
                      currentTask ? formatTime(currentTask.date) : ""
                    }
                  />
                </Box>
              </FormControl>
              <FormControl display="flex" flexDirection="column" isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  {...register("category", {
                    required: "This is required",
                  })}
                  defaultValue={
                    currentTask ? currentTask.category.name : "Personal"
                  }
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
                  {...register("priority", {
                    required: "This is required",
                  })}
                  defaultValue={
                    currentTask ? currentTask.priority : Priority.NONE
                  }
                >
                  <option value={Priority.NONE}>{Priority.NONE}</option>
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
            <Button colorScheme="blue" type="submit" form="task-form">
              {getDrawerButtonText()}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TaskDrawer;
