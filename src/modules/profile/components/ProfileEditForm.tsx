import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { useProfile } from "/src/hooks/useProfile";

const ProfileEditPage = () => {
  const { profile, LoadingComponent, saveProfile, withLoading } = useProfile();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profileFile: null as File | null,
    profilePreview: "",
  });

  useEffect(() => {
    if (profile) {
      const [firstName, ...rest] = profile.name.split(" ");
      const lastName = rest.join(" ");
      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName,
        phoneNumber: profile.phoneNumber || "",
        profilePreview: profile.profileUrl || "",
      }));
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profileFile" && files) {
      setFormData((prev) => ({
        ...prev,
        profileFile: files[0],
        profilePreview: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    await withLoading(async () => {
      try {
        const updates = {
          name: `${formData.firstName} ${formData.lastName}`,
          phoneNumber: formData.phoneNumber,
          // Handle profile file upload if needed
          profileFile: formData.profileFile,
        };
        await saveProfile(updates);
        toast.success("Profile updated successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to update profile.");
      }
    });
  };

  if (!profile) return <LoadingComponent />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 8,
        px: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <LoadingComponent />

        {/* Avatar with upload */}
        <Box sx={{ position: "relative", mb: 3 }}>
          <Avatar
            src={formData.profilePreview}
            alt="Profile Picture"
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              border: "3px solid #8b5cf6",
            }}
          />
          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2 }}
          >
            Upload Picture
            <input
              type="file"
              accept="image/*"
              hidden
              name="profileFile"
              onChange={handleChange}
            />
          </Button>
        </Box>

        {/* Name and Phone */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileEditPage;
