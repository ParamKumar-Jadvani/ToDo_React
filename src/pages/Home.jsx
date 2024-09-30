import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Box p={6} maxW="1200px" mx="auto" mt={12}>
        <Heading textAlign="center" mb={8}>
          Plan Your Future Todos
        </Heading>

        <Flex direction="column" alignItems="center" mb={8}>
          <TaskForm />
        </Flex>

        <Flex direction="column" alignItems="center" width="100%" mt={6}>
          <TaskList />
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
