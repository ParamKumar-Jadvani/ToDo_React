import React, { useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Button,
  Text,
  Link,
  Center,
  Icon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiUserPlus } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { signupEmail } from "../config/config"; // Import your signupEmail function
import InputField from "../components/InputField";
import GoogleAuthButton from "../components/GoogleAuthButton";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    try {
      // Sign up the user
      await signupEmail(data);
      toast.success(
        "Signup successful! Please check your email for verification."
      );
      // Redirect to the login page after signup
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <Flex
        minHeight="100vh"
        marginTop="3%"
        align="center"
        justify="center"
        bg="gray.200"
      >
        <Box
          width={{ base: "90%", md: "400px" }}
          p={8}
          bg="white"
          boxShadow="lg"
          borderRadius="xl"
        >
          <VStack spacing={6} align="stretch">
            <Center>
              <Icon as={FiUserPlus} w={10} h={10} color="teal.500" />
            </Center>
            <Heading as="h2" size="lg" textAlign="center" color="teal.600">
              Sign Up for ToDo
            </Heading>

            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                id="username"
                label="Username"
                type="text"
                placeholder="Enter your username"
                register={register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters long",
                  },
                })}
                errors={errors}
              />
              <InputField
                id="email"
                label="Email address"
                type="email"
                placeholder="Enter your email"
                register={register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                errors={errors}
              />
              <InputField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                register={register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters long and contain both letters and numbers",
                  },
                })}
                errors={errors}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                register={register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                errors={errors}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />

              <Center mt={6}>
                <Button
                  colorScheme="teal"
                  size="md"
                  width="full"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Sign Up
                </Button>
              </Center>

              <GoogleAuthButton label="Sign Up with Google" />

              <Text fontSize="sm" color="gray.600" marginTop={2}>
                Already have an account?{" "}
                <Link color="teal.500" href="/login">
                  Log in
                </Link>
              </Text>
            </form>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default SignupPage;
