import React, { useEffect, useState } from "react";
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
import { FiCheckCircle } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { loginEmail, GoogleAuth, auth } from "../config/config";
import InputField from "../components/InputField";
import GoogleAuthButton from "../components/GoogleAuthButton";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Listen for changes in user authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, navigate to home page
        navigate("/");
      } else {
        // User is signed out, navigate to login page
        navigate("/login");
      }
      setLoading(false); // Set loading to false after checking auth state
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    try {
      const result = await loginEmail(data);
      // Check if email is verified
      if (!result.user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        return;
      }
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <Flex minHeight="100vh" align="center" justify="center" bg="gray.200">
        <Box
          width={{ base: "90%", md: "400px" }}
          p={8}
          bg="white"
          boxShadow="lg"
          borderRadius="xl"
        >
          <VStack spacing={6} align="stretch">
            <Center>
              <Icon as={FiCheckCircle} w={10} h={10} color="teal.500" />
            </Center>
            <Heading as="h2" size="lg" textAlign="center" color="teal.600">
              Log In to ToDo
            </Heading>

            <form onSubmit={handleSubmit(onSubmit)}>
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

              <Center mt={6}>
                <Button
                  colorScheme="teal"
                  size="md"
                  width="full"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Log In
                </Button>
              </Center>
            </form>

            <GoogleAuthButton label="Log In With Google" margin={[-1, 1]} />

            <Text fontSize="sm" color="gray.600">
              Don't have an account?{" "}
              <Link color="teal.500" href="/signup">
                Sign up
              </Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default LoginPage;
