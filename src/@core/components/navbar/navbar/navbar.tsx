'use client';
import { Box, Flex, HStack, Input, Avatar, Text, Menu, MenuButton, MenuList, MenuItem, Button, Divider, Icon, IconButton } from '@chakra-ui/react';
import { FaBell, FaCog, FaMoon, FaSun, FaExpand, FaLayerGroup, FaUserAlt, FaShieldAlt, FaHome, FaClipboard, FaChevronDown } from 'react-icons/fa';
import { useColorMode } from '@chakra-ui/react';
import { useState } from 'react';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchValue, setSearchValue] = useState('');

  return (
    <Box w="full">
      {/* Top Section - Logo, Search, and Right-side Icons */}
      <Flex
        as="header"
        align="center"
        justify="space-between"
        px={6}
        py={3}
        bg="gray.900"
        color="white"
        boxShadow="md"
        w="full"
      >
        {/* Left Side - Logo and Search */}
        <HStack spacing={4} w="full">
          <Text fontSize="2xl" fontWeight="bold" color="teal.400">
            Orchid
          </Text>
          <Input
            placeholder="Enter your search key word"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            size="md"
            borderRadius="md"
            bg="gray.700"
            color="white"
            _placeholder={{ color: 'gray.400' }}
            flex={1}
            maxW={'none'}
          />
        </HStack>

        {/* Right Side - Icons and Avatar */}
        <HStack spacing={4} ml={6}>
          <Text>Мэдэгдэл</Text>
          <Icon as={FaExpand} cursor="pointer" _hover={{ color: 'teal.400' }} />
          <Icon as={FaLayerGroup} cursor="pointer" _hover={{ color: 'teal.400' }} />
          <Icon as={FaBell} cursor="pointer" _hover={{ color: 'teal.400' }} />
          <IconButton
            aria-label="Toggle Dark Mode"
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            bg="transparent"
            _hover={{ bg: 'gray.700' }}
          />
          <IconButton
            aria-label="Settings"
            icon={<FaCog />}
            bg="transparent"
            _hover={{ bg: 'gray.700' }}
          />
          <Menu>
            <MenuButton>
              <Avatar name="C" bg="purple.500" cursor="pointer" />
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FaUserAlt />}>Profile</MenuItem>
              <MenuItem icon={<FaCog />}>Settings</MenuItem>
              <MenuItem icon={<FaBell />}>Notifications</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Divider and Bottom Green Bar */}
      <Divider borderColor="teal.400" />

      {/* Bottom Section - Menu Items with Dropdowns */}
      <Flex
        as="nav"
        align="center"
        justify="center"
        py={3}
        bg="gray.900"
        borderBottom="2px solid"
        borderColor="teal.400"
      >
        <HStack spacing={8}>
          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaHome />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              My Dashboard
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }}>Analysis</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }}>My Wallet</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }}>IoT</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaLayerGroup />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Unique Dashboard
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }}>CRM Management</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }}>Cryptocurrency</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }}>eCommerce</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaClipboard />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Applications
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }}>Calendar</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }}>Email App</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }}>File Manager</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaClipboard />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Crafted Pages
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }}>Invoice</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }}>FAQ</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }}>Pricing</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaUserAlt />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Account
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }}>Profile</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }}>Settings</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaShieldAlt />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Authentication
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }}>Login</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }}>Register</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
