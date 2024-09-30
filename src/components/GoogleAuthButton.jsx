import React from "react";
import { Center, Divider, Text, Button } from "@chakra-ui/react";
import googleLogo from "../assets/Images/google-icon.png";
import { GoogleAuth } from "../config/config";
import { toast } from "react-hot-toast"; // Import toast

const GoogleAuthButton = ({ label = "", margin = [2, 4] }) => {
  const handleGoogleLogin = async () => {
    try {
      await GoogleAuth();
      toast.success("Google login successful!");
    } catch (error) {
      console.error(error);
      toast.error("Google login failed.");
    }
  };

  return (
    <>
      <Center mt={margin[0]}>
        <Divider orientation="horizontal" color="gray.600" />
        <Text
          mx={margin[1]}
          fontWeight="bold"
          color="gray.500"
          whiteSpace="nowrap"
        >
          OR
        </Text>
        <Divider orientation="horizontal" />
      </Center>

      <Center mt={margin[0]}>
        <Button
          size="md"
          width="full"
          onClick={handleGoogleLogin}
          bg="white"
          border="1px"
          borderColor="gray.300"
        >
          <img
            src={googleLogo}
            alt="Google"
            style={{ width: "42px", marginRight: "10px" }}
          />
          {label}
        </Button>
      </Center>
    </>
  );
};

export default GoogleAuthButton;
