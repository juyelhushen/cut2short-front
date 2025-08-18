import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUrlsId, getUrlsByUserId } from "../../services/UrlService";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  TextField,
  IconButton,
  Chip,
  Avatar,
  Typography,
  Box,
  Stack,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Pagination,
} from "@mui/material";
import {
  ContentCopy,
  Share,
  Edit,
  MoreVert,
  BarChart,
  AddLink,
  Search,
  FilterList,
  Delete,
} from "@mui/icons-material";
import chainIcon from "../../assets/chain.png";
import { toast } from "react-toastify";
import useLoading from "../../hooks/useLoading";
import { motion, AnimatePresence } from "framer-motion";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useConfirmation from "/src/hooks/useConfirmation";

const Links = () => {
  const userId = useSelector((state) => state.userData.userId);
  const navigate = useNavigate();
  const { openDialog, ConfirmationDialog } = useConfirmation();
  const { LoadingComponent, startLoading, stopLoading } = useLoading();

  const [urls, setUrls] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeUrl, setActiveUrl] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 5,
    totalPages: 1,
    totalElements: 0,
  });

  useEffect(() => {
    if (userId != null) fetchUrls(userId, pagination.page, pagination.size);
  }, [userId, pagination.page, pagination.size]);

  const fetchUrls = async (userId, page, size) => {
    try {
      startLoading();
      const response = await getUrlsByUserId(userId, page, size);
      setUrls(response.data.content || []);
      setPagination((prev) => ({
        ...prev,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
      }));
    } catch (error) {
      console.error("Error fetching URLs:", error);
    } finally {
      stopLoading();
    }
  };

  const handleDelete = (id) => {
    openDialog(
      "Delete Short URL",
      "This will permanently delete the short URL and all its analytics data.",
      async () => {
        try {
          startLoading();
          const response = await deleteUrlsId(id);
          if (response.success) {
            stopLoading();
            fetchUrls(userId, pagination.page, pagination.size);
            toast.success("URL deleted successfully");
          }
        } catch (error) {
          toast.error("Failed to delete URL", error);
        }
      },
      {
        confirmText: "Delete",
        cancelText: "Cancel",
        icon: DeleteOutlineIcon,
      }
    );
  };

  const handleEdit = (id) => {
    navigate(`edit/${id}`, { relative: "path" });
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
  };

  const redirect = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleMenuOpen = (event, url) => {
    setAnchorEl(event.currentTarget);
    setActiveUrl(url);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveUrl(null);
  };

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage - 1 }));
  };

  const handleSizeChange = (event) => {
    setPagination((prev) => ({
      ...prev,
      size: parseInt(event.target.value),
      page: 0,
    }));
  };

  const filteredUrls = urls.filter(
    (url) =>
      url.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.shortenUrl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.originalUrl?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 4,
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f9fafb, #f0f4f8)",
      }}
    >
      <ConfirmationDialog />
      <LoadingComponent />

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
          overflow: "hidden",
          p: { xs: 2, md: 4 },
        }}
      >
        {/* Header Section */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          mb={4}
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
            My Short Links
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddLink />}
            onClick={() => navigate("create", { relative: "path" })}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              "&:hover": {
                background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                boxShadow: "0 4px 6px rgba(59, 130, 246, 0.3)",
              },
            }}
          >
            Create New
          </Button>
        </Stack>
        {/* Search and Filter Section */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          mb={4}
          alignItems="center"
        >
          <TextField
            fullWidth
            placeholder="Search links..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <Search sx={{ color: "text.secondary", mr: 1 }} />
              ),
              sx: {
                borderRadius: 2,
                backgroundColor: "background.paper",
              },
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{
              px: 3,
              borderRadius: 2,
              minWidth: 120,
            }}
          >
            Filter
          </Button>
        </Stack>
        {/* Links List */}
        {filteredUrls.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              textAlign: "center",
            }}
          >
            <img
              src={chainIcon}
              alt="No links"
              style={{ width: 120, opacity: 0.5, marginBottom: 16 }}
            />
            <Typography variant="h6" color="text.secondary" mb={1}>
              No links found
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              {searchTerm
                ? "Try a different search term"
                : "Create your first short link"}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddLink />}
              onClick={() => navigate("create", { relative: "path" })}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                "&:hover": {
                  background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                  boxShadow: "0 4px 6px rgba(59, 130, 246, 0.3)",
                },
              }}
            >
              Create Link
            </Button>
          </Box>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredUrls.map((url) => (
                <motion.div
                  key={url.id}
                  variants={cardVariants}
                  whileHover="hover"
                  layout
                >
                  <Card
                    sx={{
                      mb: 3,
                      p: 3,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      alignItems={{ xs: "flex-start", md: "center" }}
                      spacing={3}
                    >
                      {/* URL Info */}
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ flex: 1, minWidth: 0 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "#e0e7ff",
                            width: 48,
                            height: 48,
                          }}
                        >
                          <img
                            src={chainIcon}
                            alt="Link"
                            style={{ width: 24, height: 24 }}
                          />
                        </Avatar>

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            noWrap
                            sx={{ mb: 0.5 }}
                          >
                            {url.title || "Untitled Link"}
                          </Typography>

                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography
                              variant="body2"
                              color="primary"
                              sx={{
                                fontWeight: 500,
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" },
                              }}
                              onClick={() => redirect(url.shortenUrl)}
                            >
                              {url.shortenUrl}
                            </Typography>

                            <Chip
                              label={`${url.hitCount} clicks`}
                              size="small"
                              icon={<BarChart sx={{ fontSize: 14 }} />}
                              sx={{
                                height: 20,
                                "& .MuiChip-icon": { ml: 0.5, mr: -0.5 },
                              }}
                            />
                          </Stack>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            sx={{ mt: 0.5 }}
                          >
                            {url.originalUrl}
                          </Typography>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            Created On {url.createdAt}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Action Buttons */}
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          alignSelf: { xs: "flex-end", md: "center" },
                          ml: "auto",
                        }}
                      >
                        <Tooltip title="Copy">
                          <IconButton
                            size="small"
                            onClick={() => handleCopy(url.shortenUrl)}
                            sx={{
                              color: "text.secondary",
                              "&:hover": { color: "primary.main" },
                            }}
                          >
                            <ContentCopy fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Share">
                          <IconButton
                            size="small"
                            sx={{
                              color: "text.secondary",
                              "&:hover": { color: "success.main" },
                            }}
                          >
                            <Share fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(url.id)}
                            sx={{
                              color: "text.secondary",
                              "&:hover": { color: "warning.main" },
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="More options">
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, url)}
                            sx={{
                              color: "text.secondary",
                              "&:hover": { color: "text.primary" },
                            }}
                          >
                            <MoreVert fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mb={3}
          mt={3}
        >
          <Typography variant="body2" color="text.secondary">
            Showing{" "}
            {Math.min(
              pagination.page * pagination.size + 1,
              pagination.totalElements
            )}
            -
            {Math.min(
              (pagination.page + 1) * pagination.size,
              pagination.totalElements
            )}{" "}
            of {pagination.totalElements} links
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2}>
            <TextField
              select
              size="small"
              value={pagination.size}
              onChange={handleSizeChange}
              sx={{ minWidth: 80 }}
            >
              {[5, 10, 20, 50].map((size) => (
                <MenuItem key={size} value={size}>
                  {size} per page
                </MenuItem>
              ))}
            </TextField>

            <Pagination
              count={pagination.totalPages}
              page={pagination.page + 1}
              onChange={handlePageChange}
              shape="rounded"
              color="primary"
              showFirstButton
              showLastButton
              siblingCount={1}
              boundaryCount={1}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: 2,
            minWidth: 180,
            py: 0.5,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleCopy(activeUrl?.shortenUrl);
            handleMenuClose();
          }}
        >
          <ContentCopy fontSize="small" sx={{ mr: 1.5 }} />
          Copy
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleEdit(activeUrl?.id);
            handleMenuClose();
          }}
        >
          <Edit fontSize="small" sx={{ mr: 1.5 }} />
          Edit
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            handleDelete(activeUrl?.id);
            handleMenuClose();
          }}
          sx={{ color: "error.main" }}
        >
          <Delete fontSize="small" sx={{ mr: 1.5 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Links;
