import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  Box,
  Avatar,
  IconButton,
  Link as MuiLink // Renamed to avoid conflict
} from "@mui/material";
import { Close, Download, CheckCircle } from "@mui/icons-material";
import { motion } from "framer-motion";

const QRCodeModal = ({ qrCode, title, url, onConfirm, onCancel, loading, saving }) => {
  const handleDownload = () => {
    if (!qrCode) return;
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${title || 'qrcode'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog
      open={true}
      onClose={!loading && !saving ? onCancel : null}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          p: 2
        }
      }}
    >
      <DialogTitle sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        pb: 1
      }}>
        <Typography variant="h6" fontWeight="bold">
          {title || "QR Code Preview"}
        </Typography>
        {!loading && !saving && (
          <IconButton onClick={onCancel} disabled={loading || saving}>
            <Close />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        py: 4
      }}>
        {loading || saving ? (
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            gap: 2,
            py: 4
          }}>
            <CircularProgress size={60} thickness={4} />
            <Typography variant="body1" color="text.secondary">
              {loading ? "Generating QR Code..." : "Saving QR Code..."}
            </Typography>
          </Box>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar
                src={qrCode}
                variant="square"
                sx={{ 
                  width: 240, 
                  height: 240,
                  borderRadius: "12px",
                  mb: 2
                }}
              />
            </motion.div>

            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1,
              mb: 2,
              maxWidth: "100%",
              wordBreak: "break-all"
            }}>
              <CheckCircle color="success" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                <MuiLink href={url} target="_blank" rel="noopener" color="inherit">
                  {url}
                </MuiLink>
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>

      {!loading && !saving && (
        <DialogActions sx={{ 
          justifyContent: "space-between",
          px: 3,
          pb: 3
        }}>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleDownload}
            sx={{
              borderRadius: "12px",
              px: 3,
              textTransform: "none"
            }}
          >
            Download
          </Button>
          
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={onCancel}
              sx={{
                borderRadius: "12px",
                px: 3,
                textTransform: "none"
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={onConfirm}
              sx={{
                background: "linear-gradient(90deg, #4B5EFC 0%, #8F6ED5 100%)",
                "&:hover": {
                  background: "linear-gradient(90deg, #3D4EDA 0%, #7A50C0 100%)",
                },
                borderRadius: "12px",
                px: 3,
                textTransform: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
            >
              Save QR Code
            </Button>
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default QRCodeModal;