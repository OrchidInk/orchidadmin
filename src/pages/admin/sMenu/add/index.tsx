import Header from '@/@core/components/Navbar';
import {
  Box,
  Button,
  Modal,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TextField,
  Typography
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { addSCategoryEn, AddSCategoryMn, fetchSCategoriesEn, fetchSCategoriesMn } from '@/pages/api/smenu';

interface SubCategoryEn {
  SubCategoryIDEn: number;
  SubCategoryNameEN: string;
  categoryEnId: number;
}

interface SubCategoryMn {
  SubCategoryIDMn: number;
  SubCategoryNameMN: string;
  categoryMnId: number;
}

interface SCategoryEn {
  sCategoryIdEn: number;
  sCategoryNameEn: string;
  subCategoryIDEn: number;
}

interface SCategoryMn {
  sCategoryIdMn: number;
  sCategoryName: string;
  subCategoryIDMn: number;
}

const Index = () => {
  // State for existing categories
  const [enCategories, setEnCategories] = useState<SubCategoryEn[]>([]);
  const [mnCategories, setMnCategories] = useState<SubCategoryMn[]>([]);
  const [sCategoriesEn, setSCategoriesEn] = useState<SCategoryEn[]>([]);
  const [sCategoriesMn, setSCategoriesMn] = useState<SCategoryMn[]>([]);

  // State for modal visibility and new category inputs
  const [addModalOpen, setAddModalOpen] = useState(false);
  // English category fields
  const [newSCategoryNameEn, setNewSCategoryNameEn] = useState<string>('');
  const [subCategoryIDEn, setSubCategoryIDEn] = useState<number>(0);
  // Mongolian category fields
  const [newSCategoryNameMn, setNewSCategoryNameMn] = useState<string>('');
  const [subCategoryIDMn, setSubCategoryIDMn] = useState<number>(0);

  // A helper function to load category data.
  const loadCategories = async () => {
    try {
      const mnData: SubCategoryMn[] = await fetchSCategoriesMn();
      const enData: SubCategoryEn[] = await fetchSCategoriesEn();
      setMnCategories(mnData ?? []);
      setEnCategories(enData ?? []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Called when the user clicks the "Add" button in the modal.
  const handleAdd = async () => {
    // Validate that all fields are filled.
    if (!newSCategoryNameEn || !newSCategoryNameMn || subCategoryIDEn === 0 || subCategoryIDMn === 0) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await Promise.all([
        addSCategoryEn(newSCategoryNameEn, subCategoryIDEn),
        AddSCategoryMn(newSCategoryNameMn, subCategoryIDMn)
      ]);
      // Refresh category data.
      await loadCategories();
      // Close modal and reset fields.
      setAddModalOpen(false);
      setNewSCategoryNameEn('');
      setSubCategoryIDEn(0);
      setNewSCategoryNameMn('');
      setSubCategoryIDMn(0);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#ffffff', p: 2 }}>
      <Header />
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Дэд ангилал нэмэх
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={() => setAddModalOpen(true)}
        sx={{ backgroundColor: '#00ffba', color: '#0d0d0d', fontWeight: 'bold', mb: 2 }}
      >
        Дэд ангилал нэмэх
      </Button>

      {/* Modal for Adding New Categories */}
      <Modal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        aria-labelledby="add-scategory-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400
          }}
        >
          <Typography id="add-scategory-modal" variant="h6" sx={{ mb: 2 }}>
            Add New Categories
          </Typography>
          {/* English Category Fields */}
          <TextField
            label="Category Name (En)"
            fullWidth
            value={newSCategoryNameEn}
            onChange={(e) => setNewSCategoryNameEn(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Category ID (En)"
            type="number"
            fullWidth
            value={subCategoryIDEn}
            onChange={(e) => setSubCategoryIDEn(Number(e.target.value))}
            sx={{ mb: 2 }}
          />
          {/* Mongolian Category Fields */}
          <TextField
            label="Category Name (Mn)"
            fullWidth
            value={newSCategoryNameMn}
            onChange={(e) => setNewSCategoryNameMn(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Category ID (Mn)"
            type="number"
            fullWidth
            value={subCategoryIDMn}
            onChange={(e) => setSubCategoryIDMn(Number(e.target.value))}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleAdd} sx={{ mr: 1 }}>
              Add
            </Button>
            <Button variant="outlined" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* English Subcategories Table */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#00ffba' }}>
        Англи дээрх дэд ангилал
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name (En)</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enCategories.map((cat) => (
            <TableRow key={cat.SubCategoryIDEn}>
              <TableCell sx={{ color: '#ffffff' }}>{cat.SubCategoryIDEn}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>{cat.SubCategoryNameEN}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>
                {/* Insert action buttons here if needed */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Mongolian Subcategories Table */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: '#00ffba' }}>
        Монгол дээрх дэд ангилал
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name (Mn)</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mnCategories.map((cat) => (
            <TableRow key={cat.SubCategoryIDMn}>
              <TableCell sx={{ color: '#ffffff' }}>{cat.SubCategoryIDMn}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>{cat.SubCategoryNameMN}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>
                {/* Insert action buttons here if needed */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Index;
