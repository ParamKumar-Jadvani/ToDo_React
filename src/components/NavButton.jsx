import { Button } from "@chakra-ui/react";
import React from "react";

const NavButton = ({
  icon,
  label,
  borderBottomWidth = 0,
  hover_Color = "teal.600",
  active_Color = "teal.700",
  isActive = false,
  onClickEvent = () => {},
  width = "140px",
}) => {
  return (
    <Button
      leftIcon={icon}
      width={width}
      className="btn btn-outline"
      colorScheme="teal"
      variant="outline"
      justifyContent="center"
      borderWidth="0"
      borderRadius="0"
      borderBottom={borderBottomWidth}
      _hover={{
        borderColor: hover_Color,
        backgroundColor: hover_Color,
        color: "white",
        // transition: "0.2s ease-in-out",
        transition: "background-color 0.3s ease-in-out",
      }}
      _active={{
        borderColor: active_Color,
        backgroundColor: active_Color,
        color: "white",
      }}
      isActive={isActive}
      onClick={onClickEvent}
    >
      {label}
    </Button>
  );
};

export default NavButton;
