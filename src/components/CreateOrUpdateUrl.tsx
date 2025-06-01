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
} from "@mui/material";
import { createUrlShort, getUrlById, updateUrl } from "../services/UrlService";
import useConfirmation from "../hooks/useConfirmation";
import useLoading from "../hooks/useLoading";
import CheckIcon from "@mui/icons-material/Check";
import { useParams, useNavigate } from "react-router-dom";

interface FormState {
  destination: string;
  title: string;
  domain: string;
  backHalf: string;
  errors: {
    destination?: string;
    backHalf?: string;
  };
  isSubmitting: false;
  shortenUrl: "";
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
        "Only letters, numbers, hyphens and underscores allowed";
    }

    setState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (id) fetchUrlById(id);
  }, [id]);

  const fetchUrlById = async (id: number) => {
    try {
      startLoading();
      const resonse = await getUrlById(id);
      if (resonse.success) {
        const data = resonse.data;
        setState((prev: any) => ({
          ...prev,
          destination: data.originalUrl,
          title: data.title,
          shortenUrl: data.shortenUrl,
          backHalf: data.suffix,
        }));
      }
    } catch (error) {
      console.error("error : ", error);
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

  const handleOnUpdate = async (id: number) => {
    if (!validate()) return;

    openDialog(
      "Update Link",
      "Are you sure you want to update this short URL?",
      async () => {
        startLoading(); 
        try {
          const payload = {
            id: id,
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

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <ConfirmationDialog />
      <LoadingComponent />
      <Typography
        gutterBottom
        variant="h4"
        className="tracking-wide font-bold text-slate-700 text-left"
      >
        {id ? "Update URL" : "Create a link"}
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        className="text-start text-yellow-800"
      >
        You can create 4 more links this month. Upgrade for more.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="subtitle2"
              gutterBottom
              className="text-start text-slate-700 text-2xl font-semibold"
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
              disabled={id}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="subtitle2"
              gutterBottom
              className="text-start text-slate-700 text-2xl font-semibold"
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
            />
          </Grid>

          {id && (
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                gutterBottom
                className="text-start text-slate-700 text-2xl font-semibold"
              >
                Current Shorten URL
              </Typography>
              <TextField
                fullWidth
                name="title"
                value={state.shortenUrl}
                disabled
              />
            </Grid>
          )}

          <Grid item xs={4}>
            <Typography
              variant="subtitle2"
              gutterBottom
              className="text-start text-slate-700 text-2xl font-semibold"
            >
              Domain
            </Typography>
            <TextField fullWidth name="title" value={state.domain} disabled />
          </Grid>

          <Grid item xs={1}>
            <Typography
              variant="subtitle2"
              gutterBottom
              className="text-start text-slate-700 text-2xl font-semibold"
            >
              /
            </Typography>
          </Grid>

          <Grid item xs={7}>
            <Typography
              variant="subtitle2"
              gutterBottom
              className="text-start text-slate-700 text-2xl font-semibold"
            >
              Custom back-half (optional)
            </Typography>
            <TextField
              fullWidth
              name="backHalf"
              value={state.backHalf}
              onChange={handleChange}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              }}
              error={!!state.errors.backHalf}
              helperText={
                state.errors.backHalf || (
                  <Typography
                    variant="caption"
                    display="block"
                    className="text-start text-yellow-950"
                  >
                    Only letters, numbers, hyphens and underscores allowed. You
                    can create 2 more custom back-halves this month.
                  </Typography>
                )
              }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                type="button"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              {id ? (
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => handleOnUpdate(id)}
                >
                  Update Link
                </Button>
              ) : (
                <Button type="submit" variant="contained" color="primary">
                  Create Link
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateOrUpdateUrl;
