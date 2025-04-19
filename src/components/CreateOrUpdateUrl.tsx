import React, { useState } from "react";
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
import { createUrlShort } from "../services/UrlService";
import { useNavigate } from "react-router-dom";
import useConfirmation from "../hooks/useConfirmation";
import useLoading from "../hooks/useLoading";
import CheckIcon from "@mui/icons-material/Check";

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
}

const CreateOrUpdateUrl = () => {
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
  });

  const validate = (): boolean => {
    const errors: FormState["errors"] = {};

    // URL validation
    if (
      !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
        state.destination
      )
    ) {
      errors.destination = "Please enter a valid URL";
    }

    // Back-half validation
    if (state.backHalf && !/^[a-zA-Z0-9_-]*$/.test(state.backHalf)) {
      errors.backHalf =
        "Only letters, numbers, hyphens and underscores allowed";
    }

    setState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    openDialog(
      "Create Short Link",
      "Are you sure you want to create this short URL?",
      async () => {
        startLoading(); // This will now only run after confirmation
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
          stopLoading(); // Ensure loading stops in all cases
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
        Create a link
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

          <Grid item xs={4}>
            <Typography
              variant="subtitle2"
              gutterBottom
              className="text-start text-slate-700 text-2xl font-semibold"
            >
              domain
            </Typography>
            <TextField fullWidth name="title" value={state.domain} disabled />
            <Typography variant="subtitle2" gutterBottom></Typography>
          </Grid>

          <Grid item xs={8}>
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
              <Button variant="outlined" color="primary" type="button">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create Link
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateOrUpdateUrl;
