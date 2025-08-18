import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Tooltip,
  Paper,
  InputAdornment,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import { createUrlShort, getUrlById, updateUrl } from "../services/UrlService";
import useConfirmation from "../hooks/useConfirmation";
import useLoading from "../hooks/useLoading";
import CheckIcon from "@mui/icons-material/Check";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";
import AddLinkIcon from "@mui/icons-material/AddLink";

interface FormState {
  destination: string;
  title: string;
  domain: string;
  backHalf: string;
  errors: {
    destination?: string;
    backHalf?: string;
  };
  isSubmitting: boolean;
  shortenUrl: string;
}

const CreateOrUpdateUrl = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openDialog, ConfirmationDialog } = useConfirmation();
  const { LoadingComponent, startLoading, stopLoading } = useLoading();
  const [state, setState] = useState<FormState>({
    destination: "",
    title: "",
    domain: "c2s.in",
    backHalf: "",
    errors: {},
    isSubmitting: false,
    shortenUrl: "",
  });

  const validate = (): boolean => {
    const errors: FormState["errors"] = {};

    try {
      new URL(state.destination);
    } catch (_) {
      errors.destination = "Please enter a valid URL";
    }

    if (state.backHalf && !/^[a-zA-Z0-9_-]*$/.test(state.backHalf)) {
      errors.backHalf =
        "Only letters, numbers, hyphens, and underscores allowed";
    }

    setState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (id) fetchUrlById(id);
  }, [id]);

  const fetchUrlById = async (id: string) => {
    try {
      startLoading();
      const response = await getUrlById(Number(id));
      if (response.success) {
        const data = response.data;
        setState((prev: any) => ({
          ...prev,
          destination: data.originalUrl,
          title: data.title,
          shortenUrl: data.shortenUrl,
          backHalf: data.suffix,
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      stopLoading();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    openDialog(
      "Create Short Link",
      "Are you sure you want to create this short URL?",
      async () => {
        startLoading();
        try {
          const payload = {
            originalUrl: state.destination,
            title: state.title,
            suffix: state.backHalf,
          };
          const response = await createUrlShort(payload);
          if (response.success) {
            navigate(-1);
          }
        } catch (error) {
          console.error("Submission error:", error);
        } finally {
          stopLoading();
        }
      },
      {
        confirmText: "Confirm",
        cancelText: "Cancel",
        icon: CheckIcon,
      }
    );
  };

  const handleOnUpdate = async (id: string) => {
    if (!validate()) return;

    openDialog(
      "Update Link",
      "Are you sure you want to update this short URL?",
      async () => {
        startLoading();
        try {
          const payload = {
            id: Number(id),
            title: state.title,
            suffix: state.backHalf,
          };
          const response = await updateUrl(payload);
          if (response.success) {
            navigate(-1);
          }
        } catch (error) {
          console.error("Submission error:", error);
        } finally {
          stopLoading();
        }
      },
      {
        confirmText: "Confirm",
        cancelText: "Cancel",
        icon: CheckIcon,
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: undefined },
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(state.shortenUrl);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
        py: 4,
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto px-4"
      >
        <ConfirmationDialog />
        <LoadingComponent />

        <Paper
          elevation={2}
          sx={{
            borderRadius: 4,
            p: 4,
            background: "white",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
          }}
        >
          <motion.div variants={fieldVariants}>
            <Box display="flex" alignItems="center" mb={2}>
              {id ? (
                <EditIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
              ) : (
                <AddLinkIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
              )}
              <Typography
                variant="h4"
                fontWeight="bold"
                color="text.primary"
                sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
              >
                {id ? "Update URL" : "Create New Short Link"}
              </Typography>
            </Box>

            <Chip
              label="You can create 4 more links this month"
              color="warning"
              size="small"
              sx={{ mb: 3 }}
            />
          </motion.div>

          <Divider sx={{ my: 3, borderColor: "divider" }} />

          <motion.form onSubmit={handleSubmit} variants={containerVariants}>
            <Stack spacing={3}>
              <motion.div variants={fieldVariants}>
                <Box display="flex" alignItems="center" mb={1}>
                  <LinkIcon color="action" sx={{ mr: 1 }} />
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="text.primary"
                  >
                    Destination URL
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  name="destination"
                  value={state.destination}
                  onChange={handleChange}
                  placeholder="https://example.com/my-long-url"
                  variant="outlined"
                  required
                  error={!!state.errors.destination}
                  helperText={state.errors.destination}
                  disabled={!!id}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& fieldset": {
                        borderColor: "divider",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  color="text.primary"
                  mb={1}
                >
                  Title (optional)
                </Typography>
                <TextField
                  fullWidth
                  name="title"
                  value={state.title}
                  onChange={handleChange}
                  variant="outlined"
                  inputProps={{ maxLength: 50 }}
                  helperText="Max 50 characters"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </motion.div>

              {id && (
                <motion.div variants={fieldVariants}>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="text.primary"
                    mb={1}
                  >
                    Current Short URL
                  </Typography>
                  <Tooltip title="Click to copy" arrow>
                    <TextField
                      fullWidth
                      name="shortenUrl"
                      value={state.shortenUrl}
                      onClick={copyToClipboard}
                      disabled
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LinkIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={copyToClipboard}>
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          cursor: "pointer",
                          backgroundColor: "action.hover",
                        },
                      }}
                    />
                  </Tooltip>
                </motion.div>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                }}
              >
                <motion.div variants={fieldVariants} style={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="text.primary"
                    mb={1}
                  >
                    Domain
                  </Typography>
                  <Tooltip title="Domain is fixed for this project">
                    <TextField
                      fullWidth
                      name="domain"
                      value={state.domain}
                      disabled
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          backgroundColor: "action.hover",
                        },
                      }}
                    />
                  </Tooltip>
                </motion.div>

                <motion.div variants={fieldVariants} style={{ flex: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="text.primary"
                    mb={1}
                  >
                    Custom Back-Half (optional)
                  </Typography>
                  <TextField
                    fullWidth
                    name="backHalf"
                    value={state.backHalf}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">/</InputAdornment>
                      ),
                      sx: {
                        borderRadius: 2,
                      },
                    }}
                    error={!!state.errors.backHalf}
                    helperText={
                      state.errors.backHalf || (
                        <Typography variant="caption" color="text.secondary">
                          Only letters, numbers, hyphens, and underscores
                          allowed.
                          <br />2 custom back-halves remaining this month.
                        </Typography>
                      )
                    }
                  />
                </motion.div>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate(-1)}
                      sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  {id ? (
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOnUpdate(id)}
                        sx={{
                          px: 3,
                          py: 1,
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          background:
                            "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                          boxShadow: "0 4px 6px rgba(79, 70, 229, 0.2)",
                          "&:hover": {
                            boxShadow: "0 6px 8px rgba(79, 70, 229, 0.3)",
                          },
                        }}
                      >
                        Update Link
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        // color="primary"
                        sx={{
                          px: 3,
                          py: 1,
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          background:
                            "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                          boxShadow: "0 4px 6px rgba(79, 70, 229, 0.2)",
                          "&:hover": {
                            boxShadow: "0 6px 8px rgba(79, 70, 229, 0.3)",
                          },
                        }}
                      >
                        Create Short Link
                      </Button>
                    </motion.div>
                  )}
                </Stack>
              </Box>
            </Stack>
          </motion.form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default CreateOrUpdateUrl;
