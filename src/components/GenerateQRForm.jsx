import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  InputAdornment,
  Link,
} from "@mui/material";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { toast } from "react-toastify";
import { generateQRCode } from "/src/services/UrlService";
import QRCodeModal from "/src/shared/QRCodeModal";

const GenerateQRForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!url) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsGenerating(true);
    setShowModal(true);
    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrCode(qrDataUrl);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate QR code");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirmSave = async () => {
    setIsSaving(true);
    try {
      const base64Data = qrCode.split(",")[1];
      const payload = {
        title: title || "Untitled QR Code",
        url: url,
        qrCodeBase64: base64Data,
      };
      await generateQRCode(payload);
      toast.success("QR code saved successfully!");
      setShowModal(false);
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save QR code");
    } finally {
      setIsSaving(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50"
    >
      <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: "12px" }}>
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            color="text.primary"
          >
            Create New QR Code
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Generate a QR code for any website URL
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Title (Optional)"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome QR Code"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />

            <TextField
              label="Website URL"
              variant="outlined"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Link color="inherit" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="contained"
                  onClick={handleGenerate}
                  disabled={!url || isGenerating}
                  size="large"
                  sx={{
                    background:
                      "linear-gradient(90deg, #4B5EFC 0%, #8F6ED5 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #3D4EDA 0%, #7A50C0 100%)",
                    },
                    borderRadius: "12px",
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  startIcon={
                    isGenerating ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  {isGenerating ? "Generating..." : "Generate QR Code"}
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Paper>

        {showModal && (
          <QRCodeModal
            qrCode={qrCode}
            title={title || "Untitled QR Code"}
            url={url}
            loading={isGenerating}
            saving={isSaving}
            onConfirm={handleConfirmSave}
            onCancel={() => setShowModal(false)}
          />
        )}
      </Box>
    </motion.div>
  );
};

export default GenerateQRForm;
