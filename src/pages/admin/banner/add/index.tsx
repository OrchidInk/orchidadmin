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
    Paper,
} from "@mui/material";
import Header from "@/@core/components/Navbar";

const BannerAdd = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bannerImageUrl, setBannerImageUrl] = useState("");
    const [banners, setBanners] = useState<Array<{ BannerId: number; BannerImageUrl: string }> | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<{ BannerId: number; BannerImageUrl: string } | null>(null);

    // State for delete confirmation modal
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [bannerToDelete, setBannerToDelete] = useState<number | null>(null);
    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const { data } = await axios.get("https://api.orchid.mn/api/v1/superadmin/banner/list");
            // const { data } = await axios.get("http://localhost:9000/api/v1/superadmin/banner/list");
            setBanners(data);
        } catch (error) {
            alert("Error fetching banners: " + error);
            setBanners([]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            alert("No file selected.");
            return;
        }
        if (!file.type.startsWith("image/")) {
            alert("Selected file is not an image.");
            return;
        }

        // Create an image element to load the file.
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.onload = () => {
            // Set desired maximum width/height.
            const MAX_WIDTH = 1280;
            const MAX_HEIGHT = 720;
            let { width, height } = img;

            // Calculate new dimensions while maintaining aspect ratio.
            if (width > MAX_WIDTH) {
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
            }
            if (height > MAX_HEIGHT) {
                width = Math.round((width * MAX_HEIGHT) / height);
                height = MAX_HEIGHT;
            }

            // Create a canvas with the new dimensions.
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                alert("Could not get canvas context");
                return;
            }
            // Draw the image onto the canvas.
            ctx.drawImage(img, 0, 0, width, height);

            // Convert canvas to a Blob.
            // The third argument is a quality parameter (0.0 to 1.0).
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        // Optionally, check blob size.
                        if (blob.size > 5 * 1024 * 1024) { // e.g., 5MB limit
                            alert("Compressed image is still too large. Please choose a smaller file.");
                            return;
                        }
                        // Convert the blob to a data URL.
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setBannerImageUrl(reader.result?.toString() || "");
                        };
                        reader.readAsDataURL(blob);
                    } else {
                        alert("Image compression failed. Please try another image.");
                    }
                },
                file.type,
                0.7 // Adjust quality (0.0 to 1.0) as needed
            );
            URL.revokeObjectURL(objectUrl);
        };
        img.onerror = () => {
            alert("Failed to load image.");
            URL.revokeObjectURL(objectUrl);
        };
        img.src = objectUrl;
    };


    const handleAddSubmit = async () => {
        if (!bannerImageUrl) return alert("Please upload a banner image.");

        try {
            await axios.post("https://api.orchid.mn/api/v1/superadmin/banner/create", {
                // await axios.post("http://localhost:9000/api/v1/superadmin/banner/create", {
                BannerImageUrl: bannerImageUrl,
            });
            alert("Banner added successfully!");
            setIsModalOpen(false);
            fetchBanners();
        } catch (error) {
            alert("Error adding banner: " + error);
        }
    };

    const handleEdit = (banner: { BannerId: number; BannerImageUrl: string }) => {
        setEditingBanner(banner);
        setBannerImageUrl(banner.BannerImageUrl);
        setEditModalOpen(true);
    };

    const handleEditSubmit = async () => {
        if (!editingBanner) return;

        try {
            await axios.put("https://api.orchid.mn/api/v1/superadmin/banner/update", {
                BannerId: editingBanner.BannerId,
                BannerImageUrl: bannerImageUrl,
            });
            alert("Banner updated successfully!");
            setEditModalOpen(false);
            setEditingBanner(null);
            fetchBanners();
        } catch (error) {
            alert("Error updating banner: " + error);
        }
    };

    const handleDelete = async () => {
        if (!bannerToDelete) return;

        try {
            const response = await axios.delete(
                `https://api.orchid.mn/api/v1/superadmin/banner/delete/${bannerToDelete}`
            );

            if (response.status === 200) {
                alert("Banner deleted successfully!");

                // Optimistic state update
                setBanners((prevBanners) =>
                    prevBanners ? prevBanners.filter((banner) => banner.BannerId !== bannerToDelete) : null
                );
            } else {
                alert(`Failed to delete banner. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting banner:", error);
            alert("Error deleting banner. Please try again.");
        } finally {
            setDeleteModalOpen(false); // Close the modal
        }
    };

    const openDeleteModal = (bannerId: number) => {
        setBannerToDelete(bannerId);
        setDeleteModalOpen(true);
    };

    return (
        <Box sx={{ backgroundColor: "#0d0d0d", color: "#fff", minHeight: "100vh" }}>
            <Header />
            <Typography variant="h4" gutterBottom>
                Banner Management
            </Typography>
            <Button variant="contained" sx={{ mb: 3 }} onClick={() => setIsModalOpen(true)}>
                Add Banner
            </Button>

            {/* Add Modal */}
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
                        Add Banner
                    </Typography>
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: 20 }} />
                    <Button onClick={handleAddSubmit} variant="contained" sx={{ mr: 2 }}>
                        Submit
                    </Button>
                    <Button onClick={() => setIsModalOpen(false)} variant="contained" color="error">
                        Close
                    </Button>
                </Box>
            </Modal>

            {/* Edit Modal */}
            <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
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
                        Edit Banner
                    </Typography>
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: 20 }} />
                    <Button onClick={handleEditSubmit} variant="contained" sx={{ mr: 2 }}>
                        Save Changes
                    </Button>
                    <Button onClick={() => setEditModalOpen(false)} variant="contained" color="error">
                        Cancel
                    </Button>
                </Box>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
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
                        Confirm Delete
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        Are you sure you want to delete this banner?
                    </Typography>
                    <Button onClick={handleDelete} variant="contained" color="error" sx={{ mr: 2 }}>
                        Delete
                    </Button>
                    <Button onClick={() => setDeleteModalOpen(false)} variant="outlined" color="primary">
                        Cancel
                    </Button>
                </Box>
            </Modal>

            {/* Banners Table */}
            <TableContainer component={Paper} sx={{ backgroundColor: "#1a1a1a" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "#fff" }}>Banner ID</TableCell>
                            <TableCell sx={{ color: "#fff" }}>Banner Preview</TableCell>
                            <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {banners && banners.length > 0 ? (
                            banners.map(({ BannerId, BannerImageUrl }) => (
                                <TableRow key={BannerId}>
                                    <TableCell sx={{ color: "#fff" }}>{BannerId}</TableCell>
                                    <TableCell>
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
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            sx={{ mr: 1 }}
                                            onClick={() => handleEdit({ BannerId, BannerImageUrl })}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => openDeleteModal(BannerId)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} sx={{ color: "#fff", textAlign: "center" }}>
                                    No banners available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default BannerAdd;
