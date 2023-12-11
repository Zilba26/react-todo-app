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

interface CreateReminderProps {}

const CreateReminder: React.FC<CreateReminderProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef(null);

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Create Reminder
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
          <DrawerHeader borderBottomWidth="1px">
            Create a new Reminder
          </DrawerHeader>

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
                <FormLabel htmlFor="end_date">End Date</FormLabel>
                <Input type="date" id="end_date" />
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

export default CreateReminder;
