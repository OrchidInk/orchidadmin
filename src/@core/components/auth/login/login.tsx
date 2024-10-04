'use client';

import { Box, Button, FormControl, FormLabel, Input, Heading, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      toast({
        title: "Login successful.",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onLoginSuccess();
    } else {
      toast({
        title: "Login failed.",
        description: "Invalid username or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        width="100%"
        maxW="md"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6} color="black">
         Orchid Admins
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                focusBorderColor="teal.500"
                color="black"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                focusBorderColor="teal.500"
                color="black"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              fontSize="md"
              mt={4}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
