'use client';

import { Box, Flex, HStack, Input, Avatar, Text, Menu, MenuButton, MenuList, MenuItem, Button, Divider, Icon, IconButton } from '@chakra-ui/react';
import { FaBell, FaCog, FaMoon, FaSun, FaExpand, FaLayerGroup, FaUserAlt, FaShieldAlt, FaHome, FaClipboard, FaChevronDown, FaCar, FaProductHunt, FaStore } from 'react-icons/fa';
import { useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'; 
import { FaBagShopping } from 'react-icons/fa6';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const currentPath = usePathname(); 

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const activeMenuItemStyle = {
    color: 'teal.300',
    bg: 'gray.700'
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
            placeholder="Хайх үгээ бичнэ үү"
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

        <HStack spacing={4} ml={6}>
          <Text>Мэдэгдэл</Text>
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
              Dashboard
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/dashboard' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/dashboard')}>Анализ</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/dashboard/wallet' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/dashboard/wallet')}>Орлого</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant={`ghost`} leftIcon={<FaStore />} rightIcon={<FaChevronDown />} color={"teal.400"} _hover={{color: `teal.300`}}>
              Төрөл
            </MenuButton>
            <MenuList bg={`gray.800`} color={`white`}>
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/product/add' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/menu/add')}>Menu Нэмэх</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/product/inventory' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/menu/list')}>Menu харах</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/product/add' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/subCategory/add')}>Sub Category Нэмэх</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/product/inventory' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/subCategory/list')}>Sub Category харах</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaBagShopping />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
             Бүтээгдэхүүн 
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/product/add' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/product/add')}>Нэмэх</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/product/inventory' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/product/inventory')}>Агуулах харах</MenuItem>
            </MenuList>
          </Menu>


          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaClipboard />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Байгуулга 
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/applications/calendar' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/customer/calendar')}>Нэмэх</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/applications/email' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/customer/email')}>Захиалга хийх</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/applications/files' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/customer/files')}>Төлөвлөгөөт захиалга хийх</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaCar />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Хүргэлт
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/pages/invoice' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/delivery/invoice')}>Төлөв</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/pages/faq' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/delivery/faq')}>Буцаагдсан</MenuItem>
              <MenuItem _hover={{bg:'gray.700'}} style={currentPath === "/pages/path" ? activeMenuItemStyle :{}} onClick={() => handleNavigation('/delivery/hurgelt')}>Хүргэлтийн бүс</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaUserAlt />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Хэрэглэгч  
            </MenuButton>
            <MenuList bg="gray.800" color="white">
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/account/profile' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/account/profile')}>Profile</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/account/settings' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/account/settings')}>Settings</MenuItem>
            </MenuList>
          </Menu>


          <Menu>
            <MenuButton as={Button} variant="ghost" leftIcon={<FaShieldAlt />} rightIcon={<FaChevronDown />} color="teal.400" _hover={{ color: 'teal.300' }}>
              Web Site Banner 
            </MenuButton>
            <MenuList bg="gray.800" color="white">
               <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/auth/register' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/auth/register')}>Нэмэх</MenuItem>
              <MenuItem _hover={{ bg: 'gray.700' }} style={currentPath === '/auth/login' ? activeMenuItemStyle : {}} onClick={() => handleNavigation('/auth/login')}>Солих</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
