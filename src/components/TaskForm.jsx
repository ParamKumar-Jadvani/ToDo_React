import React, { useState } from "react";
import { Box, Input, Button, useToast, VStack } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTask } from "../firebaseActions";
import { auth } from "../config/config";

const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentTime = new Date();

    // Check if start time is in the past
    if (startDate < currentTime) {
      toast({
        title: "Cannot set a past start date!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Check if end time is before or equal to the current time
    if (endDate <= currentTime) {
      toast({
        title: "End time must be greater than the current time!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Check if end time is before or equal to start time
    if (endDate <= startDate) {
      toast({
        title: "End time must be greater than the start time!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const taskData = {
      taskName,
      startTime: startDate,
      endTime: endDate,
      status: "pending",
      userId: auth.currentUser.uid,
    };

    await addTask(taskData);
    toast({
      title: "Task added!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setTaskName("");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <Box p={4} shadow="md" borderRadius="md" bg="white">
      <VStack spacing={4}>
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
          className="input input-bordered"
          required
        />
        <Box mt={4}>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            showTimeSelect
            dateFormat="Pp"
            className="input input-bordered"
          />
        </Box>
        <Box mt={4}>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            showTimeSelect
            dateFormat="Pp"
            className="input input-bordered"
          />
        </Box>
        <Button onClick={handleSubmit} colorScheme="teal" mt={4}>
          Add Task
        </Button>
      </VStack>
    </Box>
  );
};

export default TaskForm;
