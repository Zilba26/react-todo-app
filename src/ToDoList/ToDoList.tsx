import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import CreateEvent from "../EventDrawer/EventDrawer";
import TaskDrawer from "../TaskDrawer/TaskDrawer";
import { Task } from "../models/Task";
import { deleteTask, getTasks } from "../LocalStorage";
import {
  AddIcon,
  CalendarIcon,
  DeleteIcon,
  EditIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import "./ToDoList.css";

interface ToDoListProps {}

const ToDoList: React.FC<ToDoListProps> = () => {
  const tasks: Task[] = getTasks();

  function formaterDateEtHeure(date: Date): {
    date: string;
    heure: string;
  } {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const dateFormatee = `${day}/${month}/${year}`;
    const heureFormatee = `${hours}:${minutes}`;

    return { date: dateFormatee, heure: heureFormatee };
  }

  function removeTask(task: Task) {
    deleteTask(task.id);
    window.location.reload();
  }

  return (
    <Card margin="30px">
      <CardHeader>
        <Heading as="h2" size="lg" padding="15px">
          {" "}
          Liste des tâches à faire{" "}
        </Heading>
        {/* Assuming TaskDrawer and CreateEvent are your components for adding tasks and events */}
        <Box display="flex" flexDirection="row" justifyContent="space-evenly">
          <TaskDrawer state="create">
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              className="hoverable-button"
            >
              Créer une tâche
            </Button>
          </TaskDrawer>
          <CreateEvent state="create">
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              className="hoverable-button"
            >
              Créer un événement
            </Button>
          </CreateEvent>
        </Box>
      </CardHeader>

      <CardBody>
        <Accordion allowToggle>
          {tasks.map((task) => (
            <AccordionItem key={task.id}>
              <AccordionButton gap="7px">
                <Box as="span" flex="1" textAlign="left">
                  {task.name}
                </Box>
                <AccordionIcon />
                <TaskDrawer state="edit" task={task}>
                  <EditIcon className="hoverable-icon" />
                </TaskDrawer>
                <DeleteIcon
                  onClick={() => removeTask(task)}
                  className="hoverable-icon"
                />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Box
                  display="flex"
                  flexDirection="row"
                  gap="5px"
                  alignItems="center"
                >
                  <CalendarIcon />
                  <p>Date: {formaterDateEtHeure(new Date(task.date)).date}</p>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  gap="5px"
                  alignItems="center"
                >
                  <TimeIcon />
                  <p>Heure: {formaterDateEtHeure(new Date(task.date)).heure}</p>
                </Box>

                <p>Description: {task.description}</p>
                <p>Priorité: {task.priority}</p>
                {/* Add any additional details you want to display */}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  );
};

export default ToDoList;
