import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminDashboard, BASEURL } from "@/@core/utils/type/router";
import { Button, TextField, Box, Typography, CircularProgress, Container, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      h4: {
        fontWeight: 700,
        color: darkMode ? '#ffffff' : '#333333',
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BASEURL}/login`, {
        username,
        password,
      });

      const { token } = response.data;

      const expirationTime = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem('token', token);
      localStorage.setItem('token_expiration', expirationTime.toString());

      toast.success('Login successful! Redirecting to dashboard...', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        router.push(adminDashboard);
      }, 3000);
    } catch (error) {
      console.error('Login failed:', error); // Log the error for debugging
      toast.error('Нууц үг эсхүл Нэвтрэх нэр 2 ийн нэг нь буруу байна.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <Switch checked={darkMode} onChange={handleThemeChange} />
          <Typography variant="caption">{darkMode ? 'Dark' : 'Light'} Mode</Typography>
        </Box>
        <Box component="div" sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 3, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Orchid Admins
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Box sx={{ mt: 2, position: 'relative' }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              {loading && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />}
            </Box>
          </form>
        </Box>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
