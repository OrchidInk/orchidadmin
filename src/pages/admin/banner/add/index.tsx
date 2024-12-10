import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Button,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import Header from "@/@core/components/Navbar";

const BannerAdd = () => {
    const [base64Data, setBase64Data] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [bannerImageUrl, setBannerImageUrl] = useState<string>("");
    const [banners, setBanners] = useState<Array<{ BannerId: number; BannerImageUrl: string }> | null>(null);

    useEffect(() => {
        axios
            .get("http://103.50.205.86:9000/api/v1/superadmin/banner/list")
            .then(({ data }) => setBanners(data))
            .catch((error) => {
                alert("Error fetching banners: " + error);
                setBanners([]); // Set an empty array if the fetch fails
            });
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result?.toString() || "";
                setBase64Data(base64);
                setBannerImageUrl(base64);
            };
            reader.readAsDataURL(file);
        } else {
            alert("File too large or invalid.");
        }
    };
    console.log(base64Data)

    const handleSubmit = () => {
        if (!bannerImageUrl) return alert("Please upload a banner image.");
        axios
            .post("http://103.50.205.86:9000/api/v1/superadmin/banner/create", { BannerImageUrl: bannerImageUrl })
            .then(() => {
                alert("Banner added successfully!");
                setIsModalOpen(false);
                setBase64Data(null);
                axios.get("http://103.50.205.86:9000/api/v1/superadmin/banner/list").then(({ data }) => setBanners(data));
            })
            .catch((error) => alert("Error adding banner: " + error));
    };

    return (
        <Box sx={{ backgroundColor: "#0d0d0d", color: "#fff", minHeight: "100vh", p: 4 }}>
            <Header />
            <Typography variant="h4" gutterBottom>
                Banner оруулах
            </Typography>
            <Button variant="contained" sx={{ mb: 3 }} onClick={() => setIsModalOpen(true)}>
                Banner нэмэх
            </Button>

            {/* Modal for Uploading Banner */}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        p: 4,
                        bgcolor: "black",
                        color: "white",
                        borderRadius: 2,
                        width: 400,
                        mx: "auto",
                        mt: "20%",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Banner нэмэх
                    </Typography>
                    <input type="file" accept="image/*,video/*" onChange={handleFileChange} style={{ marginBottom: 20 }} />
                    <Button onClick={handleSubmit} variant="contained" sx={{ mr: 2 }}>
                        Submit
                    </Button>
                    <Button onClick={() => setIsModalOpen(false)} variant="contained" color="error">
                        Close
                    </Button>
                </Box>
            </Modal>

            {/* Banners Table */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Banners
                </Typography>
                <TableContainer component={Paper} sx={{ backgroundColor: "#1a1a1a" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#fff" }}>Banner ID</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Banner Preview</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {banners && banners.length > 0 ? (
                                banners.map(({ BannerId, BannerImageUrl }) => (
                                    <TableRow key={BannerId}>
                                        <TableCell sx={{ color: "#fff" }}>{BannerId}</TableCell>
                                        <TableCell>
                                            {BannerImageUrl.startsWith("data:image/") ? (
                                                <Box
                                                    component="img"
                                                    src={BannerImageUrl}
                                                    alt={`Banner ${BannerId}`}
                                                    sx={{
                                                        width: "150px",
                                                        height: "auto",
                                                        borderRadius: 2,
                                                    }}
                                                />
                                            ) : (
                                                <Typography color="error">Invalid Base64 Data</Typography>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ color: "#fff", textAlign: "center" }}>
                                        No banners available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default BannerAdd;
