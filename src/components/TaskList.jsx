import React, { useEffect, useState } from "react";
import {
  listenForTasks,
  updateTaskStatus,
  deleteTask,
} from "../firebaseActions";
import { Box, Button, Text, SimpleGrid, Select } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/config";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeTasks = listenForTasks(user.uid, setTasks);
        return () => unsubscribeTasks();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const checkTaskStatus = (task) => {
    const currentTime = new Date();
    const startTime = task.startTime.toDate();
    const endTime = task.endTime.toDate();

    if (currentTime >= startTime && currentTime < endTime) {
      if (task.status === "pending") {
        updateTaskStatus(auth.currentUser.uid, task.id, "ongoing");
      }
    } else if (currentTime >= endTime) {
      if (task.status === "ongoing") {
        updateTaskStatus(auth.currentUser.uid, task.id, "missing");
      }
    } else if (currentTime.getTime() === startTime.getTime()) {
      if (task.status === "pending") {
        updateTaskStatus(auth.currentUser.uid, task.id, "ongoing");
      }
    }
  };

  useEffect(() => {
    tasks.forEach((task) => {
      checkTaskStatus(task);
    });

    const interval = setInterval(() => {
      tasks.forEach((task) => {
        checkTaskStatus(task);
      });
    }, 60); // Check every minute

    return () => clearInterval(interval);
  }, [tasks]);

  const handleCompleteTask = (taskId) => {
    updateTaskStatus(auth.currentUser.uid, taskId, "complete");
  };

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {tasks.map((task) => (
        <Box
          key={task.id}
          p={4}
          boxShadow="md"
          borderRadius="md"
          border={
            task.status === "missing" ? "2px solid red" : "2px solid green"
          }
          bg={task.status === "missing" ? "red.100" : "white"}
        >
          <Text fontSize="lg" fontWeight="bold">
            {task.taskName}
          </Text>
          <Text>Start Time: {task.startTime.toDate().toLocaleString()}</Text>
          <Text>End Time: {task.endTime.toDate().toLocaleString()}</Text>
          <Text fontWeight="bold">Status: {task.status}</Text>
          {task.status === "missing" && (
            <Text color="red.600">This task is marked as missing!</Text>
          )}
          <Select
            onChange={(e) =>
              e.target.value === "complete" ? handleCompleteTask(task.id) : null
            }
            placeholder="Actions"
            mt={2}
          >
            <option value="complete">Mark as Complete</option>
          </Select>
          <Button
            colorScheme="red"
            onClick={() => deleteTask(auth.currentUser.uid, task.id)}
            mt={2}
          >
            Delete Task
          </Button>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default TaskList;
