import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Card, CardBody, CardHeader, Center,
  CloseButton, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Popover, PopoverContent, PopoverTrigger, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { addCategory, deleteCategory, getCategories, getEvents, getTasks, updateCategory, deleteTask } from "../LocalStorage";
import { AddIcon, CalendarIcon, CheckIcon, DeleteIcon, EditIcon, SettingsIcon, TimeIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Category, Color } from "../models/Category";
import { HexColorPicker } from "react-colorful";
import CreateEvent from "../EventDrawer/EventDrawer";
import TaskDrawer from "../TaskDrawer/TaskDrawer";
import { Task } from "../models/Task";
import "./ToDoList.css";

interface ToDoListProps { }

const ToDoList: React.FC<ToDoListProps> = () => {
  const tasks: Task[] = getTasks();
  const [taskToSup, setTaskToSup] = useState<Task | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDeleteTask,
    onOpen: onOpenDeleteTask,
    onClose: onCloseDeleteTask
  } = useDisclosure()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setError,
    clearErrors
  } = useForm();

  const [colorCategoryToCreate, setColorCategoryToCreate] = useState<string | undefined>(undefined);
  const [colorCategoryToEdit, setColorCategoryToEdit] = useState<string>("");
  const [selectedEditIndex, setSelectedEditIndex] = useState<number | null>(null)
  const [categories, setCategories] = useState<Category[]>(getCategories());
  const [shakeDeleteButton, setShakeDeleteButton] = useState<number | null>(null);
  const [chgtDone, setChgtDone] = useState<boolean>(false);

  const submitCategory = (formData: any) => {
    const { name } = formData;
    if (colorCategoryToCreate === undefined) {
      setError("color", { type: "manual", message: "requis" });
      return;
    }

    const category = new Category(Date.now(), name, (colorCategoryToCreate) as Color);
    addCategory(category);
    setCategories(getCategories());
    reset();
    setColorCategoryToCreate(undefined);
  }

  const checkAndDeleteCategory = (id: number) => {
    const tasks = getTasks();
    const events = getEvents();
    const categoryTasks = tasks.filter((task) => task.category.id === id);
    const categoryEvents = events.filter((event) => event.category.id === id);
    if (categoryTasks.length > 0 || categoryEvents.length > 0) {
      setShakeDeleteButton(id);
      setTimeout(() => setShakeDeleteButton(null), 600);
    } else {
      deleteCategory(id);
      setCategories(getCategories());
    }
  }

  const changeColor = (color: string) => {
    setColorCategoryToCreate(color);
    clearErrors("color");
  }

  const editCategory = (id: number) => {
    const name = (document.getElementById("edit-category-name") as HTMLInputElement).value;
    if (name === "") {
      return;
    }
    const category = categories.find((category) => category.id === id)!;
    category.name = name;
    category.color = colorCategoryToEdit as Color;
    updateCategory(category);
    setChgtDone(true);
    setCategories(getCategories());
    setSelectedEditIndex(null);
  }

  const setEditCategoryIndex = (category: Category) => {
    setSelectedEditIndex(category.id);
    setColorCategoryToEdit(category.color);
  }

  useEffect(() => {
    if (selectedEditIndex != null) {
      const category = categories.find((category) => category.id === selectedEditIndex)!;
      (document.getElementById("edit-category-name") as HTMLInputElement).value = category.name;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEditIndex]);

  const closeModal = () => {
    onClose();
    if (chgtDone) window.location.reload();
  }

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
    setTaskToSup(task);
    onOpenDeleteTask();
  }

  function deleteTaskAndCloseModal() {
    deleteTask(taskToSup!.id);
    setTaskToSup(null);
    onCloseDeleteTask();
    window.location.reload();
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Heading as="h2" size="lg" padding="15px">
            {" "}
            Liste des tâches à faire{" "}
          </Heading>
          <Box display="flex" flexDirection="row" justifyContent="space-evenly">
            <TaskDrawer state="create">
              <Button leftIcon={<AddIcon />} colorScheme="teal" className="hoverable-button">Créer une tâche</Button>
            </TaskDrawer>
            <Button onClick={onOpen} leftIcon={<SettingsIcon />} colorScheme="teal">
              Gérér Catégories
            </Button>
            <CreateEvent state="create">
              <Button leftIcon={<AddIcon />} colorScheme="teal" className="hoverable-button">Créer un événement</Button>
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
      </Card >
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Catégories</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form style={{ display: "flex", gap: "16px" }} onSubmit={handleSubmit(submitCategory)}>
              <Box>
                <Input
                  placeholder="Entrer un nom"
                  {...register('name', {
                    required: 'Un nom est requis',
                  })}
                />
                <ErrorMessage name="name" errors={errors}
                  render={({ message }) => <p style={{ color: "red" }}>{message}</p>} />
              </Box>
              <Box className="flex-center" flexDir="column">
                <Popover>
                  <PopoverTrigger>
                    <Center>
                      <Box h="30px" w="30px" bgColor={colorCategoryToCreate} borderRadius="8px"
                        border="1px solid white" cursor="pointer"></Box>
                    </Center>
                  </PopoverTrigger>
                  <PopoverContent>
                    <HexColorPicker color={colorCategoryToCreate} onChange={changeColor} />
                  </PopoverContent>
                </Popover>
                <ErrorMessage name="color" errors={errors}
                  render={({ message }) => <p style={{ color: "red" }}>{message}</p>} />
              </Box>
              <Button type="submit" colorScheme="teal" px="30px">Créer</Button>
            </form>
            <Box h="16px"></Box>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th><Center>Nom</Center></Th>
                    <Th><Center>Couleur</Center></Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {categories.map((category) => (
                    <Tr key={category.id}>
                      <Td>
                        <Center>
                          {selectedEditIndex == category.id ? <Input id="edit-category-name"></Input> : category.name}
                        </Center>
                      </Td>
                      <Td>
                        <Center>
                          {selectedEditIndex == category.id ? <Popover>
                            <PopoverTrigger>
                              <Center>
                                <Box h="30px" w="30px" bgColor={colorCategoryToEdit} borderRadius="8px"
                                  border="1px solid white" cursor="pointer"></Box>
                              </Center>
                            </PopoverTrigger>
                            <PopoverContent>
                              <HexColorPicker color={colorCategoryToEdit} onChange={setColorCategoryToEdit} />
                            </PopoverContent>
                          </Popover>
                            : <Box w="30px" h="30px" bgColor={category.color} borderRadius="100%" border="1px solid white"></Box>}
                        </Center>
                      </Td>
                      <Td>
                        <Center>
                          {selectedEditIndex == category.id
                            ? <IconButton icon={<CheckIcon />} onClick={() => editCategory(category.id)} aria-label="validate-edit" colorScheme="green"></IconButton>
                            : <IconButton icon={<EditIcon />} onClick={() => setEditCategoryIndex(category)} aria-label="edit"></IconButton>}
                          <Box w="16px"></Box>
                          <IconButton className={shakeDeleteButton === category.id ? "shake" : undefined} icon={<CloseButton colorScheme="red" />} onClick={() => checkAndDeleteCategory(category.id)} aria-label="close" colorScheme="red"></IconButton>
                        </Center>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenDeleteTask} onClose={onCloseDeleteTask} isCentered autoFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{taskToSup?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Êtes-vous sûr de supprimer cette tâche ?</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseDeleteTask}>
              Close
            </Button>
            <Button colorScheme="red" onClick={deleteTaskAndCloseModal}>
              Supprimer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ToDoList;
