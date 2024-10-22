'use client';

import { Box, Flex, HStack, Input, Avatar, Text, Menu, MenuButton, MenuList, MenuItem, Button, Divider, Icon, IconButton } from '@chakra-ui/react';
import { FaBell, FaCog, FaMoon, FaSun, FaExpand, FaLayerGroup, FaUserAlt, FaShieldAlt, FaHome, FaClipboard, FaChevronDown } from 'react-icons/fa';
import { useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Box w="full">
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
        <HStack spacing={4} w="full">
          <Text fontSize="2xl" fontWeight="bold" color="white">
            OR<Text as="span" color="teal.400">CH</Text>ID
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
            maxW={'100%'}
          />
        </HStack>

        {/* Right Side - Icons and Avatar */}
        <HStack spacing={4} ml={6}>
          <Text>Notification</Text>
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
            <MenuList bg="gray.800" color="white">
              <MenuItem icon={<FaUserAlt />} onClick={() => handleNavigation('/profile')}>Profile</MenuItem>
              <MenuItem icon={<FaCog />} onClick={() => handleNavigation('/settings')}>Settings</MenuItem>
              <MenuItem icon={<FaBell />} onClick={() => handleNavigation('/notifications')}>Notifications</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      <Divider borderColor="teal.400" />

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
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/dashboard')}>Analysis</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/dashboard/wallet')}>My Wallet</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/dashboard/iot')}>IoT</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaLayerGroup />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Unique Dashboard
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/dashboard/crm')}>CRM Management</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/dashboard/crypto')}>Cryptocurrency</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/dashboard/ecommerce')}>eCommerce</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaClipboard />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Applications
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/applications/calendar')}>Calendar</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/applications/email')}>Email App</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/applications/files')}>File Manager</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaClipboard />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Crafted Pages
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/pages/invoice')}>Invoice</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/pages/faq')}>FAQ</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/pages/pricing')}>Pricing</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaUserAlt />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Account
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/account/profile')}>Profile</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/account/settings')}>Settings</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaShieldAlt />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Authentication
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/auth/login')}>Login</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} onClick={() => handleNavigation('/auth/register')}>Register</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
