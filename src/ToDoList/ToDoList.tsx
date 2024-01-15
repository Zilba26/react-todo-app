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
import CreateEvent from "../CreateEvent/CreateEvent";
import CreateTask from "../CreateTask/CreateTask";
import { Task } from "../models/Task";
import { getTasks } from "../LocalStorage";
import { AddIcon } from "@chakra-ui/icons";

interface ToDoListProps { }

const ToDoList: React.FC<ToDoListProps> = () => {
  const tasks: Task[] = getTasks();

  return (
    <Card>
      <CardHeader>
        <Heading size="md">TODO List</Heading>
        {/* Assuming CreateTask and CreateEvent are your components for adding tasks and events */}
        <Box display="flex" flexDirection="row" justifyContent="space-evenly">
          <CreateTask />
          <CreateEvent state="create">
            <Button leftIcon={<AddIcon />} colorScheme="teal">
              Create Event
            </Button>
          </CreateEvent>
        </Box>
      </CardHeader>

      <CardBody>
        <Accordion allowToggle>
          {tasks.map((task) => (
            <AccordionItem key={task.id}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {task.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <p>Date: {new Date(task.date).toDateString()}</p>
                <p>Description: {task.description}</p>
                <p>Priority: {task.priority}</p>
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
