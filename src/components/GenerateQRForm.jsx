import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { toast } from "react-toastify";
import useLoading from "/src/hooks/useLoading";
import { generateQRCode } from "/src/services/UrlService";

const GenerateQRForm = () => {
  const { LoadingComponent, startLoading, stopLoading } = useLoading();
  const [formData, setFormData] = useState({
    url: "",
    title: "",
  });
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateQR = async () => {
    if (!formData.url || !formData.title) {
      toast.error("Please fill in both URL and title.");
      return;
    }

    startLoading();
    try {
      const response = await generateQRCode({
        title: formData.title,
        url: formData.url,
      });
      const blob = new Blob([response.data], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setQrCodeUrl(url);
      setOpenModal(true); // Open modal with the QR code
      toast.success("QR code generated successfully!");
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Failed to generate QR code.");
    } finally {
      stopLoading();
    }
  };

  const handleDownloadQR = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = `qrcode_${formData.title.replace(/ /g, "_")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Optionally revoke the object URL to free memory
    if (qrCodeUrl) URL.revokeObjectURL(qrCodeUrl);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-100 to-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ maxWidth: 800, mx: "auto", p: 4, mt: 4 }}>
        <LoadingComponent />
        <motion.div variants={fieldVariants}>
          <Typography
            variant="h4"
            gutterBottom
            className="tracking-wide font-bold text-slate-800 text-left"
          >
            Generate QR Code
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            className="text-yellow-700 text-left font-medium"
          >
            Create a QR code for any URL with a custom title.
          </Typography>
        </motion.div>

        <Divider sx={{ my: 4, borderColor: "gray-300" }} />

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerateQR();
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <motion.div variants={fieldVariants}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="text-slate-700 font-semibold"
                >
                  URL
                </Typography>
                <TextField
                  fullWidth
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  variant="outlined"
                  required
                  InputProps={{
                    sx: {
                      "& fieldset": { borderColor: "gray-300" },
                      "&:hover fieldset": { borderColor: "blue-500" },
                      "&.Mui-focused fieldset": { borderColor: "blue-600" },
                    },
                  }}
                />
              </motion.div>
            </Grid>

            <Grid item xs={12}>
              <motion.div variants={fieldVariants}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="text-slate-700 font-semibold"
                >
                  Title
                </Typography>
                <TextField
                  fullWidth
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a title"
                  variant="outlined"
                  required
                  InputProps={{
                    sx: {
                      "& fieldset": { borderColor: "gray-300" },
                      "&:hover fieldset": { borderColor: "blue-500" },
                    },
                  }}
                />
              </motion.div>
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<QrCodeIcon />}
                  sx={{
                    background:
                      "linear-gradient(90deg, #4B5EFC 0%, #8F6ED5 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #3D4EDA 0%, #7A50C0 100%)",
                    },
                  }}
                >
                  Generate QR Code
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </motion.form>

        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              background: "linear-gradient(135deg, #F5F7FA 0%, #E0E7FF 100%)",
            },
          }}
        >
          <DialogTitle className="text-slate-800 font-bold text-center">
            Generated QR Code
          </DialogTitle>
          <DialogContent>
            {qrCodeUrl && (
              <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <img
                  src={qrCodeUrl}
                  alt="Generated QR Code"
                  style={{ width: 250, height: 250 }}
                />
              </Box>
            )}
            <Typography
              variant="body2"
              className="text-center text-gray-600 mt-2"
            >
              Title: {formData.title}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
            <Button
              onClick={handleDownloadQR}
              variant="outlined"
              color="primary"
              sx={{ mr: 2 }}
            >
              Download
            </Button>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="primary"
              sx={{
                background: "linear-gradient(90deg, #4B5EFC 0%, #8F6ED5 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #3D4EDA 0%, #7A50C0 100%)",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default GenerateQRForm;
