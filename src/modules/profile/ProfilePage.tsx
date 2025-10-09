import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  useTheme,
  alpha,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  Edit as EditIcon,
  CameraAlt as CameraIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LinkedIn as LinkedInIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { useProfile } from "/src/hooks/useProfile";
import useConfirmation from "/src/hooks/useConfirmation";
import { updateProfie } from "/src/services/UserService";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const ProfilePage = () => {
  const { profile, LoadingComponent, withLoading } = useProfile();
  const { openDialog, ConfirmationDialog } = useConfirmation();
  const [isEdit, setIsEdit] = useState(false);
  const theme = useTheme();

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
      setFormData({
        firstName,
        lastName,
        phoneNumber: profile.phoneNumber || "",
        profileFile: null,
        profilePreview: profile.profileUrl || "",
      });
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

  const handleSave = () => {
    openDialog(
      "Update Profile",
      "Are you sure you want to save changes to your profile?",
      async () => {
        await withLoading(async () => {
          try {
            let base64Profile = "";
            if (formData.profileFile) {
              base64Profile = await fileToBase64(formData.profileFile);
            }

            await updateProfie({
              firstName: formData.firstName,
              lastName: formData.lastName,
              mobileNo: formData.phoneNumber,
              base6dProfile: base64Profile,
            });

            toast.success("Profile updated successfully!");
            setIsEdit(false);
          } catch (err) {
            console.error(err);
            toast.error("Failed to update profile.");
          }
        });
      },
      {
        confirmText: "Save",
        cancelText: "Cancel",
      }
    );
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });

  if (!profile) return <LoadingComponent />;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        p: 2,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "linear-gradient(45deg, #8a2be2, #00bfff)",
          borderRadius: "50%",
          top: "-100px",
          right: "-100px",
          opacity: 0.2,
          filter: "blur(40px)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
          borderRadius: "50%",
          bottom: "-100px",
          left: "-100px",
          opacity: 0.2,
          filter: "blur(40px)",
        },
      }}
    >
      <LoadingComponent />
      <ConfirmationDialog />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "1000px" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            background: alpha("#fff", 0.8),
            backdropFilter: "blur(10px)",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          {/* Sidebar with user info */}
          <Box
            sx={{
              width: { xs: "100%", md: "35%" },
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              p: 4,
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                width: "200px",
                height: "200px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                top: "-50px",
                left: "-50px",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                width: "150px",
                height: "150px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                bottom: "-50px",
                right: "-50px",
              },
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Avatar
                src={formData.profilePreview}
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                  mb: 3,
                }}
              />
            </motion.div>

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
              {profile.name}
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
              UI/UX Designer
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <IconButton
                sx={{ color: "white", background: "rgba(255,255,255,0.2)" }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                sx={{ color: "white", background: "rgba(255,255,255,0.2)" }}
              >
                <EmailIcon />
              </IconButton>
            </Box>

            <Box sx={{ mt: 4, width: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationIcon sx={{ mr: 1, fontSize: "20px" }} />
                <Typography variant="body2">San Francisco, CA</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PhoneIcon sx={{ mr: 1, fontSize: "20px" }} />
                <Typography variant="body2">
                  {profile.phoneNumber || "+1 (234) 567-8900"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Main content area */}
          <Box sx={{ width: { xs: "100%", md: "65%" }, p: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography variant="h4" fontWeight="bold" color="primary">
                Profile Settings
              </Typography>

              {!isEdit ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => setIsEdit(true)}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      boxShadow: "0 4px 10px rgba(102, 126, 234, 0.4)",
                    }}
                  >
                    Edit Profile
                  </Button>
                </motion.div>
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<CloseIcon />}
                      onClick={() => setIsEdit(false)}
                      sx={{ borderRadius: 2, px: 3, py: 1 }}
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<CheckIcon />}
                      onClick={handleSave}
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        background:
                          "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                        boxShadow: "0 4px 10px rgba(79, 172, 254, 0.4)",
                      }}
                    >
                      Save Changes
                    </Button>
                  </motion.div>
                </Box>
              )}
            </Box>

            <AnimatePresence mode="wait">
              {isEdit ? (
                <motion.div
                  key="edit-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{ mb: 3, textAlign: "center" }}>
                    <IconButton
                      component="label"
                      sx={{
                        border: "2px dashed",
                        borderColor: "primary.main",
                        p: 1,
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    >
                      <CameraIcon
                        sx={{ color: "primary.main", fontSize: "28px" }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        name="profileFile"
                        onChange={handleChange}
                      />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: "text.secondary" }}
                    >
                      Click to change photo
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 3,
                    }}
                  >
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      label="Email"
                      value={profile.email}
                      fullWidth
                      disabled
                      sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      label="Mobile Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      fullWidth
                      sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  key="profile-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 3,
                      mb: 4,
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        background: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        First Name
                      </Typography>
                      <Typography variant="h6" fontWeight="500">
                        {formData.firstName}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        background: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Last Name
                      </Typography>
                      <Typography variant="h6" fontWeight="500">
                        {formData.lastName}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        background: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: 2,
                        gridColumn: "1 / -1",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Email Address
                      </Typography>
                      <Typography variant="h6" fontWeight="500">
                        {profile.email}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        background: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: 2,
                        gridColumn: "1 / -1",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Phone Number
                      </Typography>
                      <Typography variant="h6" fontWeight="500">
                        {formData.phoneNumber || "Not provided"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      p: 3,
                      background: alpha(theme.palette.primary.main, 0.03),
                      borderRadius: 3,
                      border: "1px dashed",
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="h6" fontWeight="500" sx={{ mb: 2 }}>
                      Additional Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your profile is 65% complete. Add more information to make
                      your profile stand out to others.
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default ProfilePage;
