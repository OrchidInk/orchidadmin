import React, { useState } from "react";
import Header from "@/@core/components/Navbar";
import axios from "axios";
import { Box, Typography, Button, Modal, TextareaAutosize } from "@mui/material";

const BannerAdd = () => {
    const [base64Data, setBase64Data] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [bannerImageUrl, setBannerImageUrl] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result?.toString() || "";
                setBase64Data(base64String);
                setBannerImageUrl(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        if (!bannerImageUrl) {
            alert("Please upload a banner image.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/v1/superadmin/banner/create", {
                bannerImageUrl,
            });

            if (response.status === 200) {
                alert("Banner added successfully!");
                closeModal();
                // Optionally, reset the state or perform additional actions
            } else {
                alert(`Failed to add banner: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error adding banner:", error);
            alert("An error occurred while adding the banner.");
        }
    };

    return (
        <>
            <Header />
            <Box sx={{ backgroundColor: "#0d0d0d", minHeight: "100vh", color: "#ffffff", p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Upload Banner Image/Video/GIF
                </Typography>
                <Button
                    variant="contained"
                    onClick={openModal}
                    sx={{ marginBottom: 3, backgroundColor: "#1976d2" }}
                >
                    Add Banner
                </Button>

                <Modal open={isModalOpen} onClose={closeModal} closeAfterTransition>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "black",
                            color: "white",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Add Banner
                        </Typography>
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            style={{ marginBottom: "20px" }}
                        />
                        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                sx={{ backgroundColor: "#1976d2" }}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={closeModal}
                                sx={{ backgroundColor: "#d32f2f" }}
                            >
                                Close
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                {base64Data && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Base64 Representation:
                        </Typography>
                        <TextareaAutosize
                            value={base64Data}
                            readOnly
                            minRows={10}
                            style={{
                                width: "100%",
                                backgroundColor: "#333",
                                color: "#fff",
                                padding: "10px",
                                border: "none",
                                borderRadius: "4px",
                            }}
                        />
                    </Box>
                )}
            </Box>
        </>
    );
};

export default BannerAdd;
