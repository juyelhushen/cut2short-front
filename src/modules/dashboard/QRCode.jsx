import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { toast } from "react-toastify";
import useLoading from "/src/hooks/useLoading";

const QRCode = () => {
  const navigate = useNavigate();
  const { LoadingComponent, startLoading, stopLoading } = useLoading();
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    startLoading();
    try {
      const response = await fetch("/api/url", {
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUrls(data);
      } else {
        throw new Error("Failed to fetch URLs");
      }
    } catch (error) {
      console.error("Error fetching URLs:", error);
      toast.error("Failed to load URL list.");
    } finally {
      stopLoading();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const rowVariants = {
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
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 4, mt: 4 }}>
        <LoadingComponent />
        <motion.div variants={rowVariants}>
          <Typography
            variant="h4"
            gutterBottom
            className="tracking-wide font-bold text-slate-800 text-left"
          >
            QR Code URL List
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            className="text-yellow-700 text-left font-medium"
          >
            View and manage your QR-coded URLs.
          </Typography>
        </motion.div>

        <Divider sx={{ my: 4, borderColor: "gray-300" }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<QrCodeIcon />}
              onClick={() => navigate("create", { relative: "path" })}
              sx={{
                background: "linear-gradient(90deg, #4B5EFC 0%, #8F6ED5 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #3D4EDA 0%, #7A50C0 100%)",
                },
              }}
            >
              Create New QR Code
            </Button>
          </motion.div>
        </Box>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Table sx={{ minWidth: 650 }} aria-label="qr code list">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "slate-800" }}>
                  ID
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "slate-800" }}>
                  URL
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "slate-800" }}>
                  Title
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "slate-800" }}>
                  QR Code
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.map((url) => (
                <motion.div
                  key={url.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <TableRow sx={{ "&:hover": { backgroundColor: "gray-50" } }}>
                    <TableCell>{url.id}</TableCell>
                    <TableCell>{url.originalUrl}</TableCell>
                    <TableCell>{url.title}</TableCell>
                    <TableCell>
                      {url.qrCode && url.qrCode.qrCodeData && (
                        <img
                          src={`/api/qrcode/get/${url.id}`}
                          alt={`QR Code for ${url.originalUrl}`}
                          style={{ width: 50, height: 50 }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                </motion.div>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </motion.div>
  );
};
export default QRCode;
