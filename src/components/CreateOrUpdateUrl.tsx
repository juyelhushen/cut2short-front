import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Divider,
  Grid,
  Tooltip,
} from "@mui/material";
import { createUrlShort, getUrlById, updateUrl } from "../services/UrlService";
import useConfirmation from "../hooks/useConfirmation";
import useLoading from "../hooks/useLoading";
import CheckIcon from "@mui/icons-material/Check";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

interface FormState {
  destination: string;
  title: string;
  domain: string;
  backHalf: string;
  errors: {
    destination?: string;
    backHalf?: string;
  };
  isSubmitting: boolean; // Changed to boolean
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

  // Animation variants
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
        <ConfirmationDialog />
        <LoadingComponent />

        <motion.div variants={fieldVariants}>
          <Typography
            variant="h4"
            gutterBottom
            className="tracking-wide font-bold text-slate-800 text-left"
          >
            {id ? "Update URL" : "Create a Link"}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            className="text-yellow-700 text-left font-medium"
          >
            You can create 4 more links this month. Upgrade for more.
          </Typography>
        </motion.div>

        <Divider sx={{ my: 4, borderColor: "gray-300" }} />

        <motion.form
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <motion.div variants={fieldVariants}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="text-slate-700 font-semibold"
                >
                  Destination
                </Typography>
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
                  InputProps={{
                    sx: {
                      "& fieldset": { borderColor: "gray-300" },
                      "&:hover fieldset": { borderColor: "blue-500" },
                    },
                  }}
                />
              </motion.div>
            </Grid>

            {id && (
              <Grid item xs={12}>
                <motion.div variants={fieldVariants}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className="text-slate-700 font-semibold"
                  >
                    Current Shorten URL
                  </Typography>
                  <Tooltip title="This URL cannot be edited">
                    <TextField
                      fullWidth
                      name="shortenUrl"
                      value={state.shortenUrl}
                      disabled
                      variant="outlined"
                      InputProps={{
                        sx: {
                          "& fieldset": { borderColor: "gray-400" },
                        },
                      }}
                    />
                  </Tooltip>
                </motion.div>
              </Grid>
            )}

            <Grid item xs={12} sm={4}>
              <motion.div variants={fieldVariants}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="text-slate-700 font-semibold"
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
                    InputProps={{
                      sx: {
                        "& fieldset": { borderColor: "gray-400" },
                      },
                    }}
                  />
                </Tooltip>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={8}>
              <motion.div variants={fieldVariants}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="text-slate-700 font-semibold"
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
                      "& fieldset": { borderColor: "gray-300" },
                      "&:hover fieldset": { borderColor: "blue-500" },
                      "&.Mui-focused fieldset": { borderColor: "blue-600" },
                    },
                  }}
                  error={!!state.errors.backHalf}
                  helperText={
                    state.errors.backHalf || (
                      <Typography
                        variant="caption"
                        className="text-yellow-800"
                      >
                        Only letters, numbers, hyphens, and underscores allowed.
                        2 custom back-halves remaining this month.
                      </Typography>
                    )
                  }
                />
              </motion.div>
            </Grid>

            <Grid item xs={12} sx={{ mt: 4 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(-1)}
                    sx={{
                      borderColor: "gray-400",
                      "&:hover": { borderColor: "gray-600", backgroundColor: "gray-50" },
                    }}
                  >
                    Back
                  </Button>
                </motion.div>
                {id ? (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOnUpdate(id)}
                      sx={{
                        background: "linear-gradient(90deg, #4B5EFC 0%, #8F6ED5 100%)",
                        "&:hover": { background: "linear-gradient(90deg, #3D4EDA 0%, #7A50C0 100%)" },
                      }}
                    >
                      Update Link
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        background: "linear-gradient(90deg, #4B5EFC 0%, #8F6ED5 100%)",
                        "&:hover": { background: "linear-gradient(90deg, #3D4EDA 0%, #7A50C0 100%)" },
                      }}
                    >
                      Create Link
                    </Button>
                  </motion.div>
                )}
              </Box>
            </Grid>
          </Grid>
        </motion.form>
      </Box>
    </motion.div>
  );
};

export default CreateOrUpdateUrl;