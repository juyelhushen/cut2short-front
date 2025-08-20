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
  Switch,
  FormControlLabel,
  Grid,
  Card,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { toast } from "react-toastify";
import { generateQRCode } from "/src/services/UrlService";
import QRCodeModal from "/src/shared/QRCodeModal";
import LinkIcon from "@mui/icons-material/Link";
import TitleIcon from "@mui/icons-material/Title";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import useLoading from "/src/hooks/useLoading";
import useConfirmation from "/src/hooks/useConfirmation";

const GenerateQRForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [generateShortLink, setGenerateShortLink] = useState(false);
  const navigate = useNavigate();

  const { LoadingComponent, startLoading, stopLoading, withLoading } = useLoading();
  const { openDialog, ConfirmationDialog } = useConfirmation();

  const handleGenerate = async () => {
    if (!url) {
      toast.error("Please enter a valid URL");
      return;
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (_) {
      toast.error("Please enter a valid URL format (include http:// or https://)");
      return;
    }

    await withLoading(async () => {
      setShowModal(true);
      try {
        const qrDataUrl = await QRCode.toDataURL(url, {
          width: 300,
          margin: 2,
          color: {
            dark: "#3b82f6",
            light: "#FFFFFF",
          },
        });
        setQrCode(qrDataUrl);
      } catch (err) {
        console.error(err);
        toast.error("Failed to generate QR code");
      }
    });
  };

  const handleConfirmSave = async () => {
    await withLoading(async () => {
      try {
        const base64Data = qrCode.split(",")[1];
        const payload = {
          title: title || "Untitled QR Code",
          url: url,
          qrCodeBase64: base64Data,
          generateShortLink: generateShortLink
        };
        await generateQRCode(payload);
        toast.success("QR code saved successfully!");
        setShowModal(false);
        navigate(-1);
      } catch (err) {
        console.error(err);
        toast.error("Failed to save QR code");
      }
    });
  };

  const handleSaveWithConfirmation = () => {
    openDialog(
      "Save QR Code",
      `Are you sure you want to save this QR code? ${generateShortLink ? "A short link will also be generated." : ""}`,
      handleConfirmSave,
      {
        confirmText: "Save",
        cancelText: "Cancel",
      }
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        py: 4,
        px: 2,
      }}
    >
      {/* Custom Loader */}
      <LoadingComponent />
      
      {/* Confirmation Dialog */}
      <ConfirmationDialog />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Paper
              elevation={2}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                background: "white",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              {/* Header */}
              <motion.div variants={itemVariants}>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      mb: 2,
                    }}
                  >
                    <QrCodeIcon sx={{ color: "white", fontSize: 32 }} />
                  </Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                  >
                    Create QR Code
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Generate beautiful QR codes for any website URL
                  </Typography>
                </Box>
              </motion.div>

              {/* Form */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <motion.div variants={itemVariants}>
                  <TextField
                    label="QR Code Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="My Awesome QR Code"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TitleIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        "&:hover fieldset": {
                          borderColor: "#3b82f6",
                        },
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
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
                          <LinkIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        "&:hover fieldset": {
                          borderColor: "#3b82f6",
                        },
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={generateShortLink}
                          onChange={(e) => setGenerateShortLink(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="subtitle1" fontWeight="600">
                            Generate Short Link
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Create a shortened URL along with the QR code
                          </Typography>
                        </Box>
                      }
                    />
                    
                    {generateShortLink && (
                      <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
                        A shortened URL will be generated and associated with this QR code
                      </Alert>
                    )}
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleGenerate}
                        disabled={!url}
                        size="large"
                        startIcon={<AutoAwesomeIcon />}
                        sx={{
                          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                          "&:hover": {
                            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                            boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
                          },
                          borderRadius: 3,
                          px: 5,
                          py: 1.5,
                          textTransform: "none",
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
                          minWidth: 200,
                        }}
                      >
                        Generate QR Code
                      </Button>
                    </motion.div>
                  </Box>
                </motion.div>
              </Box>

              {/* Features List */}
              <motion.div variants={itemVariants}>
                <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #e2e8f0" }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom sx={{ textAlign: "center" }}>
                    Why use our QR codes?
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" fontWeight="600">
                          🎨 Custom Design
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Beautiful, branded QR codes
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" fontWeight="600">
                          ⚡ Instant Generation
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Generate in seconds
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" fontWeight="600">
                          📊 Analytics Ready
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Track scans and engagement
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>

      {showModal && (
        <QRCodeModal
          qrCode={qrCode}
          title={title || "Untitled QR Code"}
          url={url}
          loading={false}
          saving={false}  
          onConfirm={handleSaveWithConfirmation} 
          onCancel={() => setShowModal(false)}
          generateShortLink={generateShortLink}
        />
      )}
    </Box>
  );
};

export default GenerateQRForm;