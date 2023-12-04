import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface ToDoListProps {}

const ToDoList: React.FC<ToDoListProps> = () => (
  <Card>
    <CardHeader>
      <Heading size="md">TODO List</Heading>
    </CardHeader>

    <CardBody>
      <Stack divider={<StackDivider />} spacing="4">
        <Box>
          <Heading size="xs" textTransform="uppercase">
            Task 1
          </Heading>
          <Text pt="2" fontSize="sm">
            Do something.
          </Text>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            Task 2
          </Heading>
          <Text pt="2" fontSize="sm">
            Do something else.
          </Text>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            Task 3
          </Heading>
          <Text pt="2" fontSize="sm">
            Go to the store.
          </Text>
        </Box>
      </Stack>
    </CardBody>
  </Card>
);

export default ToDoList;
