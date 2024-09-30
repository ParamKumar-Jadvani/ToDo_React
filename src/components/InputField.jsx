import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const InputField = ({
  id,
  label,
  type,
  placeholder,
  register,
  errors,
  showPassword,
  togglePasswordVisibility,
}) => {
  return (
    <FormControl id={id} isInvalid={!!errors[id]}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          type={type}
          placeholder={placeholder}
          {...register}
          focusBorderColor="teal.500"
        />
        {id === "password" || id === "confirmPassword" ? (
          <InputRightElement>
            <Button
              size="sm"
              variant="ghost"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        ) : null}
      </InputGroup>
      <FormErrorMessage>{errors[id]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
