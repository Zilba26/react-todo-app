import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Card, CardBody, CardHeader, Center,
  CloseButton, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Popover, PopoverContent, PopoverTrigger, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreateEvent from "../CreateEvent/CreateEvent";
import CreateTask from "../CreateTask/CreateTask";
import { Task } from "../models/Task";
import { addCategory, deleteCategory, getCategories, getEvents, getTasks, updateCategory } from "../LocalStorage";
import { AddIcon, CheckIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Category, Color } from "../models/Category";
import { HexColorPicker } from "react-colorful";
import "./ToDoList.css";

interface ToDoListProps { }

const ToDoList: React.FC<ToDoListProps> = () => {
  const tasks: Task[] = getTasks();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  }, [selectedEditIndex]);

  const closeModal = () => {
    window.location.reload();
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">TODO List</Heading>
          {/* Assuming CreateTask and CreateEvent are your components for adding tasks and events */}
          <Box display="flex" flexDirection="row" justifyContent="space-evenly">
            <CreateTask />
            <Button onClick={onOpen} leftIcon={<SettingsIcon />} colorScheme="teal">
              Gérér Catégories
            </Button>
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
      <Modal onClose={closeModal} isOpen={isOpen} isCentered>
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
    </>
  );
};

export default ToDoList;
