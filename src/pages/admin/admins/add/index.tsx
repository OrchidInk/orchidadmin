import React, { useState, useEffect } from "react";
import Header from "@/@core/components/Navbar";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios, { AxiosResponse } from "axios";
import { apiSuperAdminList, apiSuperAdminRegister } from "@/@core/utils/type/router";

interface Admin {
  id: number;
  lastname: string;
  firstname: string;
  username: string;
  email: string;
}

const AdminAdd = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [modalOpen, setModalOpen] = useState(false);

  const fetchAdmins = async () => {
    try {
      const response: AxiosResponse<{ ID: number; LastName: string; FirstName: string; UserName: string; Email: string }[]> = await axios.get(apiSuperAdminList);
      const mappedAdmins = response.data.map((admin) => ({
        id: admin.ID,
        lastname: admin.LastName,
        firstname: admin.FirstName,
        username: admin.UserName,
        email: admin.Email,
      }));
      setAdmins(mappedAdmins);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
      setSnackbarMessage("Failed to fetch admins. Please check the API endpoint and try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddOrUpdateAdmin = async () => {
    if (!lastname || !firstname || !username || !email || (!editingAdmin && !password)) {
      setSnackbarMessage("All fields are required.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      if (editingAdmin) {
        await axios.put(`${apiSuperAdminList}/${editingAdmin.id}`, {
          lastname,
          firstname,
          username,
          email,
        });
        setSnackbarMessage("Admin updated successfully.");
      } else {
        await axios.post(apiSuperAdminRegister, {
          lastname,
          firstname,
          username,
          email,
          password,
        });
        setSnackbarMessage("Admin added successfully.");
      }

      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setModalOpen(false);
      clearInputs();
      fetchAdmins();
    } catch (error) {
      console.error("Save error:", error);
      setSnackbarMessage("Failed to save admin. Please check the API endpoint and try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteAdmin = async (id: number) => {
    try {
      await axios.delete(`${apiSuperAdminList}/${id}`);
      setSnackbarMessage("Admin deleted successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      fetchAdmins();
    } catch (error) {
      console.error("Delete error:", error);
      setSnackbarMessage("Failed to delete admin. Please check the API endpoint and try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleEditAdmin = (admin: Admin) => {
    setEditingAdmin(admin);
    setLastname(admin.lastname);
    setFirstname(admin.firstname);
    setUsername(admin.username);
    setEmail(admin.email);
    setModalOpen(true);
  };

  const clearInputs = () => {
    setLastname("");
    setFirstname("");
    setUsername("");
    setEmail("");
    setPassword("");
    setEditingAdmin(null);
  };

  return (
    <>
      <Header />
      <Box sx={{ backgroundColor: "#0d0d0d", minHeight: "100vh", color: "#ffffff", p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Admin Management
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            clearInputs();
            setModalOpen(true);
          }}
          sx={{ backgroundColor: "#00ffba", color: "#0d0d0d", fontWeight: "bold", mb: 3 }}
        >
          Add Admin
        </Button>
        <TableContainer component={Paper} sx={{ backgroundColor: "#1a1a1a", color: "#ffffff", mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Lastname</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Firstname</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Username</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell sx={{ color: "#ffffff" }}>{admin.id}</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>{admin.lastname}</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>{admin.firstname}</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>{admin.username}</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>{admin.email}</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: "#00ffba", color: "#0d0d0d", mr: 1 }}
                      onClick={() => handleEditAdmin(admin)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: "#f44336", color: "#ffffff" }}
                      onClick={() => handleDeleteAdmin(admin.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Modal */}
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
          <DialogTitle sx={{ color: "#ffffff", backgroundColor: "#1a1a1a" }}>
            {editingAdmin ? "Edit Admin" : "Add Admin"}
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#1a1a1a" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Lastname"
                  variant="outlined"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  sx={{ mb: 2, input: { color: "#ffffff" }, label: { color: "#ffffff" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Firstname"
                  variant="outlined"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  sx={{ mb: 2, input: { color: "#ffffff" }, label: { color: "#ffffff" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ mb: 2, input: { color: "#ffffff" }, label: { color: "#ffffff" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2, input: { color: "#ffffff" }, label: { color: "#ffffff" } }}
                />
              </Grid>
              {!editingAdmin && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2, input: { color: "#ffffff" }, label: { color: "#ffffff" } }}
                  />
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#1a1a1a" }}>
            <Button onClick={() => setModalOpen(false)} sx={{ color: "#ffffff" }}>
              Cancel
            </Button>
            <Button
              onClick={handleAddOrUpdateAdmin}
              variant="contained"
              sx={{ backgroundColor: "#00ffba", color: "#0d0d0d" }}
            >
              {editingAdmin ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MuiAlert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{
              width: "100%",
              color: "#ffffff",
              backgroundColor: snackbarSeverity === "success" ? "#4caf50" : "#f44336",
            }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </>
  );
};

export default AdminAdd;
