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
  Switch,
  FormControlLabel,
  Card,
  Alert,
  Dialog,
  DialogContent,
  DialogActions,
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
import QrCodeIcon from "@mui/icons-material/QrCode";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import QRCode from "qrcode";

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
  generateQrCode: boolean;
  qrCodeData: string | null;
}

const CreateOrUpdateUrl = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openDialog, ConfirmationDialog } = useConfirmation();
  const { LoadingComponent, startLoading, stopLoading, withLoading } =
    useLoading();
  const [state, setState] = useState<FormState>({
    destination: "",
    title: "",
    domain: "c2s.in",
    backHalf: "",
    errors: {},
    isSubmitting: false,
    shortenUrl: "",
    generateQrCode: false,
    qrCodeData: null,
  });
  const [qrPreviewOpen, setQrPreviewOpen] = useState(false);

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

  const generateQrCode = async (url: string): Promise<string> => {
    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: "#3b82f6",
          light: "#FFFFFF",
        },
      });
      return qrDataUrl.split(",")[1];
    } catch (error) {
      console.error("QR Code generation error:", error);
      throw new Error("Failed to generate QR code");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    openDialog(
      "Create Short Link",
      `Are you sure you want to create this short URL? ${
        state.generateQrCode ? "A QR code will also be generated." : ""
      }`,
      async () => {
        await withLoading(async () => {
          try {
            let qrCodeBase64 = null;

            // Generate QR code if enabled
            if (state.generateQrCode && state.destination) {
              try {
                qrCodeBase64 = await generateQrCode(state.destination);
              } catch (error) {
                toast.error("Failed to generate QR code");
                return;
              }
            }

            const payload = {
              originalUrl: state.destination,
              title: state.title,
              suffix: state.backHalf,
              qrCodeData: qrCodeBase64,
            };

            const response = await createUrlShort(payload);
            if (response.success) {
              toast.success("Short link created successfully!");
              navigate(-1);
            }
          } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to create short link");
          }
        });
      },
      {
        confirmText: "Create",
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
        confirmText: "Update",
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

  const handleQrCodeToggle = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const generateQrCode = event.target.checked;

    if (generateQrCode && state.destination) {
      // Generate QR code preview when enabling
      try {
        const qrDataUrl = await QRCode.toDataURL(state.destination, {
          width: 300,
          margin: 2,
          color: {
            dark: "#3b82f6",
            light: "#FFFFFF",
          },
        });
        setState((prev) => ({
          ...prev,
          generateQrCode,
          qrCodeData: qrDataUrl,
        }));
        setQrPreviewOpen(true);
      } catch (error) {
        console.error("QR Code generation error:", error);
        toast.error("Failed to generate QR code preview");
        // Still set the toggle but don't show preview
        setState((prev) => ({
          ...prev,
          generateQrCode,
          qrCodeData: null,
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        generateQrCode,
        qrCodeData: null,
      }));
    }
  };

  const handlePreviewQrCode = async () => {
    if (state.destination) {
      try {
        const qrDataUrl = await QRCode.toDataURL(state.destination, {
          width: 300,
          margin: 2,
          color: {
            dark: "#3b82f6",
            light: "#FFFFFF",
          },
        });
        setState((prev) => ({
          ...prev,
          qrCodeData: qrDataUrl,
        }));
        setQrPreviewOpen(true);
      } catch (error) {
        console.error("QR Code generation error:", error);
        toast.error("Failed to generate QR code preview");
      }
    }
  };

  const handleQrPreviewClose = () => {
    setQrPreviewOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(state.shortenUrl);
  };

  const isUrlValid = state.destination && !state.errors.destination;

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

        {/* QR Code Preview Dialog */}
        <Dialog
          open={qrPreviewOpen}
          onClose={handleQrPreviewClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              QR Code Preview
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This is how your QR code will look
            </Typography>
            {state.qrCodeData && (
              <Box
                sx={{
                  p: 2,
                  bgcolor: "white",
                  borderRadius: 3,
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  border: "2px solid",
                  borderColor: "primary.light",
                  display: "inline-block",
                }}
              >
                <img
                  src={state.qrCodeData}
                  alt="QR Code Preview"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            )}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 2, display: "block" }}
            >
              Scan this code to visit: {state.destination}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              onClick={handleQrPreviewClose}
              variant="contained"
              startIcon={<CloseIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Close Preview
            </Button>
          </DialogActions>
        </Dialog>

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

              {/* QR Code Generation Toggle - Only show for new URLs */}
              {!id && (
                <motion.div variants={fieldVariants}>
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={state.generateQrCode}
                            onChange={handleQrCodeToggle}
                            color="primary"
                            disabled={!isUrlValid}
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight="600">
                              Generate QR Code
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 0.5 }}
                            >
                              Create a QR code for easy sharing
                            </Typography>
                          </Box>
                        }
                      />
                      {state.generateQrCode && isUrlValid && (
                        <Button
                          variant="outlined"
                          startIcon={<VisibilityIcon />}
                          onClick={handlePreviewQrCode}
                          size="small"
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                          }}
                        >
                          Preview
                        </Button>
                      )}
                    </Box>

                    {state.generateQrCode && (
                      <Alert
                        severity="info"
                        sx={{
                          mt: 2,
                          borderRadius: 2,
                          bgcolor: "primary.50",
                          color: "primary.800",
                          border: "1px solid",
                          borderColor: "primary.200",
                        }}
                        icon={<QrCodeIcon />}
                      >
                        A QR code will be generated for quick scanning and
                        sharing
                      </Alert>
                    )}

                    {!isUrlValid && (
                      <Alert
                        severity="warning"
                        sx={{
                          mt: 2,
                          borderRadius: 2,
                        }}
                      >
                        Enter a valid URL to enable QR code generation
                      </Alert>
                    )}
                  </Card>
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
                            "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                          boxShadow: "0 4px 6px rgba(79, 70, 229, 0.2)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
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
                        disabled={!isUrlValid}
                        sx={{
                          px: 3,
                          py: 1,
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          background:
                            "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                          boxShadow: "0 4px 6px rgba(79, 70, 229, 0.2)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                            boxShadow: "0 6px 8px rgba(79, 70, 229, 0.3)",
                          },
                        }}
                        startIcon={
                          state.generateQrCode ? (
                            <QrCodeIcon />
                          ) : (
                            <AddLinkIcon />
                          )
                        }
                      >
                        {state.generateQrCode
                          ? "Create with QR Code"
                          : "Create Short Link"}
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
