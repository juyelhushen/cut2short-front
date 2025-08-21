import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  IconButton,
  Tooltip,
  Avatar,
  Paper,
  Skeleton,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Pagination,
  Menu,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  QrCode as QrCodeIcon,
  Search,
  FilterList,
  MoreVert,
  Link as LinkIcon,
  CalendarToday,
  CheckCircle,
  Cancel,
  Download,
  Share,
  Close,
  Delete,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import useLoading from "/src/hooks/useLoading";
import { getQRCodeList, deleteQrCode } from "/src/services/UrlService";
import { useSelector } from "react-redux";
import useConfirmation from "/src/hooks/useConfirmation";

const QRCode = () => {
  const userId = useSelector((state) => state.userData.userId);
  const navigate = useNavigate();
  const { LoadingComponent, startLoading, stopLoading } = useLoading();
  const { openDialog, ConfirmationDialog } = useConfirmation();
  const [qrCodes, setQrCodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const [dateFilter, setDateFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedQr, setSelectedQr] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedQrId, setSelectedQrId] = useState(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    if (userId) fetchQrCodes(userId, page, size);
  }, [userId, page, size]);

  const fetchQrCodes = async (userId, page, size) => {
    startLoading();
    setIsLoading(true);
    try {
      const response = await getQRCodeList(userId, page, size);
      if (response.success) {
        setQrCodes(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
      } else {
        throw new Error("Failed to fetch QR codes");
      }
    } catch (error) {
      console.error("Error fetching QR codes:", error);
      toast.error("Failed to load QR code list.");
    } finally {
      stopLoading();
      setIsLoading(false);
    }
  };

  const handleDeleteQrCode = async (id) => {
    try {
      const response = await deleteQrCode(id);
      if (response.success) {
        toast.success("QR Code has been removed");
        fetchQrCodes(userId, page, size);
      } else {
        throw new Error("Failed to delete QR code");
      }
    } catch (error) {
      console.error("Error deleting QR code:", error);
      toast.error("Failed to delete QR code.");
    }
  };

  const confirmDelete = (id) => {
    openDialog(
      "Delete QR Code",
      "Are you sure you want to delete this QR code? This action cannot be undone.",
      () => handleDeleteQrCode(id),
      {
        confirmText: "Delete",
        cancelText: "Cancel",
        icon: Delete,
      }
    );
  };

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedQrId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedQrId(null);
  };

  const filteredQrCodes = qrCodes.filter((qr) => {
    const matchesSearch =
      (qr.title && qr.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      qr.originalUrl.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && qr.active) ||
      (statusFilter === "inactive" && !qr.active);

    return matchesSearch && matchesStatus;
  });

  const handleDownload = (byteData, title) => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${byteData}`;
    link.download = `${title || "qrcode"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}/qr/${id}`);
    toast.success("QR code link copied to clipboard!");
  };

  const handleOpenDialog = (qr) => {
    setSelectedQr(qr);
    setQrDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setQrDialogOpen(false);
    setSelectedQr(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setPage(0);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 4 }}>
        <LoadingComponent />
        <ConfirmationDialog />

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            QR Codes
          </Typography>

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
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                px: 3,
                py: 1,
              }}
            >
              Create code
            </Button>
          </motion.div>
        </Box>

        {/* Filters */}
        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderRadius: "12px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              placeholder="Search codes"
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                sx: { borderRadius: "12px" },
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Filter by date" }}
                sx={{ borderRadius: "12px" }}
              >
                <MenuItem value="all">All dates</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This week</MenuItem>
                <MenuItem value="month">This month</MenuItem>
                <MenuItem value="year">This year</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ borderRadius: "12px", px: 2 }}
            >
              Add filters
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Show:
            </Typography>
            <Chip
              label="Active"
              color={statusFilter === "active" ? "primary" : "default"}
              onClick={() => setStatusFilter("active")}
              sx={{ mr: 1, borderRadius: "6px" }}
            />
            <Chip
              label="Inactive"
              color={statusFilter === "inactive" ? "primary" : "default"}
              onClick={() => setStatusFilter("inactive")}
              sx={{ mr: 1, borderRadius: "6px" }}
            />
            <Chip
              label="All"
              color={statusFilter === "all" ? "primary" : "default"}
              onClick={() => setStatusFilter("all")}
              sx={{ borderRadius: "6px" }}
            />
          </Box>
        </Paper>

        {/* QR Code List */}
        {isLoading ? (
          <Box sx={{ display: "grid", gap: 2 }}>
            {[1, 2, 3].map((index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Skeleton
                        variant="rectangular"
                        width={80}
                        height={80}
                        sx={{ borderRadius: "8px" }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton width="60%" height={24} />
                        <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          <Skeleton width={80} height={32} />
                          <Skeleton width={120} height={20} />
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Skeleton width={100} height={36} />
                      <Skeleton variant="circular" width={40} height={40} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : filteredQrCodes.length > 0 ? (
          <>
            <Box sx={{ display: "grid", gap: 2, mb: 3 }}>
              {filteredQrCodes.map((qr) => (
                <motion.div key={qr.id} variants={itemVariants}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            src={`data:image/png;base64,${qr.byteData}`}
                            variant="square"
                            sx={{ width: 80, height: 80, borderRadius: "8px" }}
                          />

                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {qr.title || "Untitled QR Code"}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 0.5,
                              }}
                            >
                              <LinkIcon sx={{ fontSize: 16, mr: 0.5 }} />
                              {qr.originalUrl.length > 40
                                ? `${qr.originalUrl.substring(0, 40)}...`
                                : qr.originalUrl}
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 1,
                                gap: 1,
                              }}
                            >
                              <Chip
                                icon={
                                  qr.active ? (
                                    <CheckCircle fontSize="small" />
                                  ) : (
                                    <Cancel fontSize="small" />
                                  )
                                }
                                label={qr.active ? "Active" : "Inactive"}
                                size="small"
                                color={qr.active ? "success" : "error"}
                                sx={{ borderRadius: "4px" }}
                              />

                              <Chip
                                icon={<CalendarToday fontSize="small" />}
                                label={qr.createdOn}
                                size="small"
                                sx={{
                                  borderRadius: "4px",
                                  backgroundColor: "#f0f4ff",
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Tooltip title="Download QR Code">
                            <IconButton
                              onClick={() =>
                                handleDownload(qr.byteData, qr.title)
                              }
                              sx={{
                                backgroundColor: "#f0f4ff",
                                borderRadius: "8px",
                                "&:hover": { backgroundColor: "#e0e7ff" },
                              }}
                            >
                              <Download fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Share QR Code">
                            <IconButton
                              onClick={() => handleShare(qr.id)}
                              sx={{
                                backgroundColor: "#f0f4ff",
                                borderRadius: "8px",
                                "&:hover": { backgroundColor: "#e0e7ff" },
                              }}
                            >
                              <Share fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: "8px" }}
                            onClick={() => handleOpenDialog(qr)}
                          >
                            Scan data
                          </Button>

                          <IconButton onClick={(e) => handleMenuOpen(e, qr.id)}>
                            <MoreVert />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>

            {/* More Options Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 3,
                sx: {
                  borderRadius: "8px",
                  mt: 1,
                  minWidth: 140,
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  confirmDelete(selectedQrId);
                  handleMenuClose();
                }}
                sx={{ color: "error.main" }}
              >
                <Delete sx={{ mr: 1, fontSize: 20 }} />
                Delete
              </MenuItem>
            </Menu>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mr: 1 }}
                >
                  Rows per page:
                </Typography>
                <FormControl size="small" sx={{ minWidth: 60 }}>
                  <Select
                    value={size}
                    onChange={handleSizeChange}
                    displayEmpty
                    sx={{ borderRadius: "4px", height: 32 }}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 2 }}
                >
                  {`${page * size + 1}-${Math.min(
                    (page + 1) * size,
                    totalElements
                  )} of ${totalElements}`}
                </Typography>
              </Box>

              <Pagination
                count={totalPages}
                page={page + 1} // Convert to 1-based index for MUI
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
              />
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <QrCodeIcon sx={{ fontSize: 80, color: "#cbd5e1", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              You've reached the end of your QR codes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Create your first QR code to get started
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<QrCodeIcon />}
              onClick={() => navigate("create", { relative: "path" })}
              sx={{
                background: "linear-gradient(90deg, #4B5EFC 0%, #8F6ED5 100%)",
                borderRadius: "12px",
                px: 3,
                py: 1,
              }}
            >
              Create QR Code
            </Button>
          </Box>
        )}

        {/* QR Code Dialog */}
        <Dialog
          open={qrDialogOpen}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {selectedQr?.title || "QR Code"}
            <IconButton onClick={handleCloseDialog}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 4,
            }}
          >
            {selectedQr && (
              <>
                <Box
                  component="img"
                  src={`data:image/png;base64,${selectedQr.byteData}`}
                  alt="QR Code"
                  sx={{
                    width: "100%",
                    maxWidth: 400,
                    height: "auto",
                    mb: 3,
                  }}
                />
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedQr.originalUrl}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Download />}
              onClick={() =>
                handleDownload(selectedQr?.byteData, selectedQr?.title)
              }
              sx={{ borderRadius: "8px" }}
            >
              Download QR Code
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default QRCode;
