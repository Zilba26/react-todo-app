import React from "react";
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
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

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
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input type="date" id="date" />
              </Box>
              <Box>
                <FormLabel htmlFor="duration">Duration</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="Minutes" />
                  <Input type="number" placeholder="Please enter a duration" />
                  <InputRightAddon children="Minutes" />
                </InputGroup>
              </Box>
              <Box>
                <FormLabel htmlFor="reminders">Reminders</FormLabel>
                <Input type="date" id="reminders" />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
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
