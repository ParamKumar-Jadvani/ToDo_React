import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Icon,
  useBreakpointValue,
  Slide,
  Portal,
  IconButton,
} from "@chakra-ui/react";
import {
  HiHome,
  HiCheckCircle,
  HiUser,
  HiLogin,
  HiUserAdd,
  HiMenu,
  HiX,
} from "react-icons/hi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/config";
import NavButton from "./NavButton";

const navItems = [{ path: "/", label: "Home", icon: HiHome }];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const brandFontSize = useBreakpointValue({ base: "lg", md: "xl" });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <Flex
      as="nav"
      padding={4}
      backgroundColor="white"
      color="teal.600"
      boxShadow="lg"
      alignItems="center"
      justifyContent="space-between"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
    >
      <Box>
        <Text fontSize={brandFontSize} fontWeight="bold" letterSpacing="wider">
          ToDo App
        </Text>
      </Box>

      {/* Mobile Menu Toggle Button */}
      <IconButton
        aria-label="Toggle Navigation"
        icon={isOpen ? <HiX /> : <HiMenu />}
        variant="outline"
        colorScheme="teal"
        display={{ base: "block", md: "none" }} // Show on mobile only
        onClick={toggleMenu}
        marginLeft="auto"
        marginRight="1%"
        padding="auto"
      />

      {/* Mobile Navigation Menu */}
      <Portal>
        {isOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundColor="rgba(0, 0, 0, 0.5)"
            onClick={closeMenu}
            zIndex={998}
            opacity={isOpen ? 1 : 0}
            transition="opacity 0.3s ease-in-out"
          />
        )}
        <Slide
          direction="right"
          in={isOpen}
          style={{ zIndex: 999 }}
          transition={{ enter: { duration: 0.4 }, exit: { duration: 0.4 } }}
        >
          <Flex
            position="fixed"
            top="55"
            right={0}
            bottom={0}
            height="100vh"
            bg="white"
            direction="column"
            alignItems="center"
            mt="1.5%"
            display={{ base: "flex", md: "none" }} // Show on mobile only
            padding={2}
            boxShadow="lg"
            borderRadius="md"
            width={{ base: "75%", sm: "60%", md: "30%" }}
            transform={isOpen ? "scale(1)" : "scale(0.8)"}
            transition="transform 0.3s ease-in-out"
          >
            {/* Mobile Navigation Items */}
            {navItems.map(({ path, label, icon: IconComponent }, index) => (
              <Link key={index} to={path} style={{ width: "100%" }}>
                <NavButton
                  icon={<Icon as={IconComponent} />}
                  label={label}
                  borderBottomWidth="1px"
                  isActive={location.pathname === path}
                  width="100%"
                  _hover={{ backgroundColor: "teal.100" }}
                />
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/profile" style={{ width: "100%" }}>
                  <NavButton
                    icon={<HiUser />}
                    label="Profile"
                    isActive={location.pathname === "/profile"}
                    borderBottomWidth="1px"
                    width="100%"
                    _hover={{ backgroundColor: "teal.100" }}
                  />
                </Link>
                <NavButton
                  icon={<HiLogin />}
                  label="Logout"
                  onClickEvent={handleLogout}
                  hover_Color="red.600"
                  active_Color="red.700"
                  width="100%"
                  _hover={{ backgroundColor: "red.100" }}
                />
              </>
            ) : (
              <>
                <Link to="/login" style={{ width: "100%" }}>
                  <NavButton
                    icon={<HiLogin />}
                    label="Login"
                    isActive={location.pathname === "/login"}
                    borderBottomWidth="1px"
                    width="100%"
                    _hover={{ backgroundColor: "teal.100" }}
                  />
                </Link>
                <Link to="/signup" style={{ width: "100%" }}>
                  <NavButton
                    icon={<HiUserAdd />}
                    label="Signup"
                    isActive={location.pathname === "/signup"}
                    width="100%"
                    _hover={{ backgroundColor: "teal.100" }}
                  />
                </Link>
              </>
            )}
          </Flex>
        </Slide>
      </Portal>

      {/* Web Navigation Menu */}
      <Flex
        direction={{ base: "column", md: "row" }} // Ensure this is row for md and up
        alignItems="center" // Center items vertically
        display={{ base: "none", md: "flex" }}
        justifyContent="space-between"
        gap={1}
      >
        {/* Web Navigation Items */}
        {navItems.map(({ path, label, icon: IconComponent }, index) => (
          <Link key={index} to={path} style={{ width: "100%" }}>
            <NavButton
              icon={<Icon as={IconComponent} />}
              label={label}
              isActive={location.pathname === path}
            />
          </Link>
        ))}
        {user ? (
          <>
            <Link to="/profile" style={{ width: "100%" }}>
              <NavButton
                icon={<HiUser />}
                label="Profile"
                isActive={location.pathname === "/profile"}
              />
            </Link>
            <Link to="#" style={{ width: "100%" }}>
              <NavButton
                icon={<HiLogin />}
                label="Logout"
                onClickEvent={handleLogout}
                hover_Color="red.600"
                active_Color="red.700"
              />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" style={{ width: "100%" }}>
              <NavButton
                icon={<HiLogin />}
                label="Login"
                isActive={location.pathname === "/login"}
              />
            </Link>
            <Link to="/signup" style={{ width: "100%" }}>
              <NavButton
                icon={<HiUserAdd />}
                label="Signup"
                isActive={location.pathname === "/signup"}
              />
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
