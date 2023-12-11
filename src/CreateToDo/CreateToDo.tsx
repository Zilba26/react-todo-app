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
import React from "react";

import { AddIcon } from "@chakra-ui/icons";

interface CreateToDoProps {}

const CreateToDo: React.FC<CreateToDoProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef(null);

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Create ToDo
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
          <DrawerHeader borderBottomWidth="1px">Create a new ToDo</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="tnameitle">Name</FormLabel>
                <Input
                  ref={firstField}
                  id="name"
                  placeholder="Please enter a name"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea id="desc" />
              </Box>
              <Box>
                <FormLabel htmlFor="start_date">Start Date</FormLabel>
                <Input type="date" id="start_date" />
              </Box>
              <Box>
                <FormLabel htmlFor="end_date">End Date</FormLabel>
                <Input type="date" id="end_date" />
              </Box>
              <Box>
                <FormLabel htmlFor="reminders">Reminder</FormLabel>
                <Select>
                  <option value="option1" selected={true}>
                    None
                  </option>
                  <option value="option2">At the hour</option>
                  <option value="option3">5min before</option>
                  <option value="option4">10min before</option>
                  <option value="option5">15min before</option>
                  <option value="option6">30min before</option>
                  <option value="option7">1h before</option>
                  <option value="option8">2h before</option>
                  <option value="option9">1d before</option>
                  <option value="option10">2d before</option>
                  <option value="option11">1w before</option>
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="priority">Priority</FormLabel>
                <Select>
                  <option value="option1" selected={true}>
                    Light
                  </option>
                  <option value="option2">Normal</option>
                  <option value="option3">Hight</option>
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
            <Button colorScheme="blue">Create</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateToDo;
