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
  Typography,
  MenuItem
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  addSCategoryEn,
  AddSCategoryMn,
  fetchCategoriesEns,
  fetchCategoriesMns,
  fetchSCategoriesEn,
  fetchSCategoriesMn
} from '@/pages/api/smenu';

// Update interfaces to match the API response keys exactly.
// Your sample API response for a subCategory (for English) is:
// { SubCategoryIDEn: 1, SubCategoryNameEn: "A4", CategoryEnID: 1 }
interface SubCategoryEn {
  SubCategoryIDEn: number;
  SubCategoryNameEn: string;
  CategoryEnID: number;
}
interface SubCategoryMn {
  SubCategoryIDMn: number;
  SubCategoryNameMn: string;
  CategoryMnID: number;
}

// sCategory interfaces – these are the records you want to render in your sCategory table.
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
  // State for subcategories (to use in dropdowns for adding new sCategory records)
  const [enCategories, setEnCategories] = useState<SubCategoryEn[]>([]);
  const [mnCategories, setMnCategories] = useState<SubCategoryMn[]>([]);

  // State for sCategories (records to display in the sCategory tables)
  const [sCategoriesEn, setSCategoriesEn] = useState<SCategoryEn[]>([]);
  const [sCategoriesMn, setSCategoriesMn] = useState<SCategoryMn[]>([]);

  // State for modal visibility and new sCategory inputs
  const [addModalOpen, setAddModalOpen] = useState(false);
  // English sCategory fields
  const [newSCategoryNameEn, setNewSCategoryNameEn] = useState<string>('');
  const [subCategoryIDEn, setSubCategoryIDEn] = useState<number>(0);
  // Mongolian sCategory fields
  const [newSCategoryNameMn, setNewSCategoryNameMn] = useState<string>('');
  const [subCategoryIDMn, setSubCategoryIDMn] = useState<number>(0);

  // Helper function to load all required data.
  const loadCategories = async () => {
    try {
      // Fetch subCategories (for dropdowns)
      const mnData: SubCategoryMn[] = await fetchCategoriesMns();
      const enData: SubCategoryEn[] = await fetchCategoriesEns();

      console.log("Fetched English SubCategories:", enData);
      console.log("Fetched Mongolian SubCategories:", mnData);

      setMnCategories(mnData ?? []);
      setEnCategories(enData ?? []);

      // Fetch sCategories (the data you want to render in your tables)
      const sCatEnData: SCategoryEn[] = await fetchSCategoriesEn();
      const sCatMnData: SCategoryMn[] = await fetchSCategoriesMn();

      console.log("Fetched sCategories (En):", sCatEnData);
      console.log("Fetched sCategories (Mn):", sCatMnData);

      setSCategoriesEn(sCatEnData ?? []);
      setSCategoriesMn(sCatMnData ?? []);
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
      // Refresh data.
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
        С Ангилал Нэмэх
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={() => setAddModalOpen(true)}
        sx={{ backgroundColor: '#00ffba', color: '#0d0d0d', fontWeight: 'bold', mb: 2 }}
      >
        С Ангилал Нэмэх
      </Button>

      {/* Modal for Adding New sCategory Records */}
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
            Add New sCategory
          </Typography>
          {/* English sCategory Fields */}
          <TextField
            label="sCategory Name (En)"
            fullWidth
            value={newSCategoryNameEn}
            onChange={(e) => setNewSCategoryNameEn(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Select SubCategory (En)"
            fullWidth
            value={subCategoryIDEn}
            onChange={(e) => setSubCategoryIDEn(Number(e.target.value))}
            sx={{ mb: 2 }}
          >
            {enCategories.map((subCat) => (
              <MenuItem key={subCat.SubCategoryIDEn} value={subCat.SubCategoryIDEn}>
                {subCat.SubCategoryNameEn || 'N/A'}
              </MenuItem>
            ))}
          </TextField>
          {/* Mongolian sCategory Fields */}
          <TextField
            label="sCategory Name (Mn)"
            fullWidth
            value={newSCategoryNameMn}
            onChange={(e) => setNewSCategoryNameMn(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Select SubCategory (Mn)"
            fullWidth
            value={subCategoryIDMn}
            onChange={(e) => setSubCategoryIDMn(Number(e.target.value))}
            sx={{ mb: 2 }}
          >
            {mnCategories.map((subCat) => (
              <MenuItem key={subCat.SubCategoryIDMn} value={subCat.SubCategoryIDMn}>
                {subCat.SubCategoryNameMn || 'N/A'}
              </MenuItem>
            ))}
          </TextField>
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

      {/* Table for English sCategories */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#00ffba' }}>
        Англи дахь с Ангилал
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>sCategory ID (En)</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name (En)</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory ID</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sCategoriesEn.map((cat) => (
            <TableRow key={cat.sCategoryIdEn}>
              <TableCell sx={{ color: '#ffffff' }}>{cat.sCategoryIdEn}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>{cat.sCategoryNameEn}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>{cat.subCategoryIDEn}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>
                {/* Insert action buttons here if needed */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Table for Mongolian sCategories */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: '#00ffba' }}>
        Монгол дахь с Ангилал
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>sCategory ID (Mn)</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name (Mn)</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>SubCategory ID</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sCategoriesMn.map((cat) => (
            <TableRow key={cat.sCategoryIdMn}>
              <TableCell sx={{ color: '#ffffff' }}>{cat.sCategoryIdMn}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>{cat.sCategoryName}</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>{cat.subCategoryIDMn}</TableCell>
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
