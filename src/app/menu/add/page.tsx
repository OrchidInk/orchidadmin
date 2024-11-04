'use client';

import { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  VStack,
  HStack,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';
import NavbarLayout from "@/@core/components/navbar/navbarLayout";

interface Category {
  id: number;
  category_name_en: string;
  category_name_mn: string;
}

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryEn, setNewCategoryEn] = useState('');
  const [newCategoryMn, setNewCategoryMn] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCategoryEn, setEditingCategoryEn] = useState('');
  const [editingCategoryMn, setEditingCategoryMn] = useState('');
  const toast = useToast();

  const handleAddCategory = () => {
    if (!newCategoryEn || !newCategoryMn) {
      toast({
        title: 'Error',
        description: 'Both English and Mongolian category names are required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newCategory: Category = {
      id: categories.length + 1,
      category_name_en: newCategoryEn,
      category_name_mn: newCategoryMn,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryEn('');
    setNewCategoryMn('');
    toast({
      title: 'Category added successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditingCategoryEn(category.category_name_en);
    setEditingCategoryMn(category.category_name_mn);
  };

  const handleSaveCategory = () => {
    setCategories(categories.map(cat =>
      cat.id === editingCategoryId
        ? { ...cat, category_name_en: editingCategoryEn, category_name_mn: editingCategoryMn }
        : cat
    ));
    setEditingCategoryId(null);
    setEditingCategoryEn('');
    setEditingCategoryMn('');
    toast({
      title: 'Category updated successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(category => category.id !== id));
    toast({
      title: 'Category deleted successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <NavbarLayout>
      <Box bg="gray.800" color="white" p={6} borderRadius="md" boxShadow="lg">
        <VStack spacing={6} align="stretch">
          {/* Add Category Form */}
          <HStack spacing={4} wrap="wrap">
            <Input
              placeholder="Category Name (EN)"
              value={newCategoryEn}
              onChange={(e) => setNewCategoryEn(e.target.value)}
              color="white"
              bg="gray.700"
              _placeholder={{ color: 'gray.400' }}
              flex={1}
            />
            <Input
              placeholder="Category Name (MN)"
              value={newCategoryMn}
              onChange={(e) => setNewCategoryMn(e.target.value)}
              color="white"
              bg="gray.700"
              _placeholder={{ color: 'gray.400' }}
              flex={1}
            />
            <Button colorScheme="teal" onClick={handleAddCategory} minW="120px">
             Category Нэмэх 
            </Button>
          </HStack>

          {/* Category List */}
          <Box overflowX="auto">
            <Table variant="simple" colorScheme="whiteAlpha" size={isMobile ? 'sm' : 'md'}>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Category Name (EN)</Th>
                  <Th>Category Name (MN)</Th>
                  <Th>Үйлдэл</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories.map((category) => (
                  <Tr key={category.id}>
                    <Td>{category.id}</Td>
                    <Td>
                      {editingCategoryId === category.id ? (
                        <Input
                          value={editingCategoryEn}
                          onChange={(e) => setEditingCategoryEn(e.target.value)}
                          color="white"
                          bg="gray.700"
                          _placeholder={{ color: 'gray.400' }}
                        />
                      ) : (
                        category.category_name_en
                      )}
                    </Td>
                    <Td>
                      {editingCategoryId === category.id ? (
                        <Input
                          value={editingCategoryMn}
                          onChange={(e) => setEditingCategoryMn(e.target.value)}
                          color="white"
                          bg="gray.700"
                          _placeholder={{ color: 'gray.400' }}
                        />
                      ) : (
                        category.category_name_mn
                      )}
                    </Td>
                    <Td>
                      {editingCategoryId === category.id ? (
                        <Button size="sm" colorScheme="teal" onClick={handleSaveCategory}>
                          Save
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          colorScheme="blue"
                          onClick={() => handleEditCategory(category)}
                        >
                          Edit
                        </Button>
                      )}
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDeleteCategory(category.id)}
                        ml={2}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Box>
    </NavbarLayout>
  );
};

export default CategoryManagement;
