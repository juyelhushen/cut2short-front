import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Chip,
  Tabs,
  Tab,
  alpha,
  useTheme
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useProfile } from "/src/hooks/useProfile";
import useConfirmation from "/src/hooks/useConfirmation";
import { updateProfie } from "/src/services/UserService";
import {
  Edit as EditIcon,
  CameraAlt as CameraIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Work as WorkIcon,
  Language as LanguageIcon,
  Link as LinkIcon,
  School as SchoolIcon,
  Favorite as FavoriteIcon,
  Star as StarIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon
} from "@mui/icons-material";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const avatarVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const ProfilePage = () => {
  const { profile, LoadingComponent, withLoading } = useProfile();
  const { openDialog, ConfirmationDialog } = useConfirmation();
  const [isEdit, setIsEdit] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  // Sample extended user data (in a real app, this would come from your API)
  const [userData, setUserData] = useState({
    location: "San Francisco, CA",
    joinDate: "January 2022",
    occupation: "Software Engineer",
    education: "Stanford University",
    languages: ["English", "Spanish"],
    interests: ["Technology", "Photography", "Travel", "Music"],
    skills: ["React", "Node.js", "UI/UX Design", "TypeScript"],
    website: "https://johndoe.com",
    twitter: "johndoe",
    linkedin: "johndoe",
    instagram: "johndoe",
    bio: "Passionate about creating beautiful and functional user experiences. Love to travel and explore new technologies."
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profileFile: null as File | null,
    profilePreview: "",
    location: "",
    occupation: "",
    education: "",
    website: "",
    bio: "",
    twitter: "",
    linkedin: "",
    instagram: ""
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
        location: userData.location,
        occupation: userData.occupation,
        education: userData.education,
        website: userData.website,
        bio: userData.bio,
        twitter: userData.twitter,
        linkedin: userData.linkedin,
        instagram: userData.instagram
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

            // Update user data with the new information
            setUserData({
              ...userData,
              location: formData.location,
              occupation: formData.occupation,
              education: formData.education,
              website: formData.website,
              bio: formData.bio
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!profile) return <LoadingComponent />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        p: 2,
        pt: 4
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "1000px" }}
      >
        <Paper
          sx={{
            width: "100%",
            p: { xs: 2, sm: 3 },
            borderRadius: 4,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <LoadingComponent />
          <ConfirmationDialog />

          {/* Profile Header */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", mb: 4 }}>
            <Box sx={{ position: "relative", mr: { md: 4 }, mb: { xs: 2, md: 0 } }}>
              <motion.div
                variants={avatarVariants}
                initial="hidden"
                animate="visible"
              >
                <Avatar
                  src={formData.profilePreview}
                  alt="Profile Picture"
                  sx={{
                    width: 120,
                    height: 120,
                    border: "3px solid #8b5cf6",
                    boxShadow: "0 8px 16px rgba(139, 92, 246, 0.2)",
                  }}
                />
              </motion.div>
              {isEdit && (
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  <CameraIcon />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    name="profileFile"
                    onChange={handleChange}
                  />
                </IconButton>
              )}
            </Box>

            <Box sx={{ textAlign: { xs: "center", md: "left" }, flexGrow: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #8b5cf6, #ec4899)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {profile.name}
              </Typography>
              
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, mt: 1, flexWrap: 'wrap' }}>
                <Chip 
                  icon={<WorkIcon />} 
                  label={userData.occupation} 
                  size="small" 
                  variant="outlined" 
                  sx={{ mr: 1, mb: 1 }} 
                />
                <Chip 
                  icon={<LocationIcon />} 
                  label={userData.location} 
                  size="small" 
                  variant="outlined" 
                  sx={{ mr: 1, mb: 1 }} 
                />
                <Chip 
                  icon={<CalendarIcon />} 
                  label={`Joined ${userData.joinDate}`} 
                  size="small" 
                  variant="outlined" 
                  sx={{ mb: 1 }} 
                />
              </Box>
            </Box>

            <Box sx={{ mt: { xs: 2, md: 0 } }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={isEdit ? "outlined" : "contained"}
                  color="primary"
                  onClick={() => setIsEdit(!isEdit)}
                  startIcon={isEdit ? <CloseIcon /> : <EditIcon />}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1,
                    fontWeight: "bold",
                    boxShadow: isEdit ? "none" : "0 4px 12px rgba(139, 92, 246, 0.3)",
                  }}
                >
                  {isEdit ? "Cancel" : "Edit Profile"}
                </Button>
              </motion.div>
            </Box>
          </Box>

          <AnimatePresence mode="wait">
            {isEdit ? (
              <motion.div
                key="edit-form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 3 }}>
                  <motion.div variants={itemVariants}>
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
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
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
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <TextField
                      label="Mobile Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <TextField
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <TextField
                      label="Occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <WorkIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <TextField
                      label="Education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SchoolIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} style={{ gridColumn: '1 / -1' }}>
                    <TextField
                      label="Website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LinkIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} style={{ gridColumn: '1 / -1' }}>
                    <TextField
                      label="Bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} style={{ gridColumn: '1 / -1' }}>
                    <Typography variant="h6" sx={{ mb: 2, mt: 1 }}>Social Media</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 2 }}>
                      <TextField
                        label="Twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <TwitterIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        label="LinkedIn"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LinkedInIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        label="Instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <InstagramIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </motion.div>
                </Box>

                <motion.div variants={itemVariants}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "center",
                      mt: 4,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                      startIcon={<CheckIcon />}
                      sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        fontWeight: "bold",
                      }}
                      size="large"
                    >
                      Save Changes
                    </Button>
                  </Box>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="profile-view"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                    <Tab label="Overview" />
                    <Tab label="Skills & Interests" />
                    <Tab label="Social" />
                  </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { md: '2fr 1fr' }, gap: 4 }}>
                    <Box>
                      <Typography variant="h6" sx={{ mb: 2 }}>About Me</Typography>
                      <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                        {userData.bio}
                      </Typography>
                      
                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <EmailIcon sx={{ mr: 2, color: "primary.main" }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary">Email</Typography>
                            <Typography variant="body1">{profile.email}</Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <PhoneIcon sx={{ mr: 2, color: "primary.main" }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary">Phone</Typography>
                            <Typography variant="body1">{profile.phoneNumber || "Not provided"}</Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <LocationIcon sx={{ mr: 2, color: "primary.main" }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary">Location</Typography>
                            <Typography variant="body1">{userData.location}</Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <WorkIcon sx={{ mr: 2, color: "primary.main" }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary">Occupation</Typography>
                            <Typography variant="body1">{userData.occupation}</Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <SchoolIcon sx={{ mr: 2, color: "primary.main" }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary">Education</Typography>
                            <Typography variant="body1">{userData.education}</Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <LanguageIcon sx={{ mr: 2, color: "primary.main" }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary">Languages</Typography>
                            <Typography variant="body1">{userData.languages.join(", ")}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box>
                      <Typography variant="h6" sx={{ mb: 2 }}>Stats</Typography>
                      <Paper sx={{ p: 3, borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                          <Box>
                            <Typography variant="h5" color="primary" fontWeight="bold">42</Typography>
                            <Typography variant="body2">Projects</Typography>
                          </Box>
                          <Box>
                            <Typography variant="h5" color="primary" fontWeight="bold">128</Typography>
                            <Typography variant="body2">Connections</Typography>
                          </Box>
                          <Box>
                            <Typography variant="h5" color="primary" fontWeight="bold">16</Typography>
                            <Typography variant="body2">Reviews</Typography>
                          </Box>
                        </Box>
                      </Paper>

                      <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Website</Typography>
                        <Chip 
                          icon={<LinkIcon />} 
                          label={userData.website} 
                          variant="outlined" 
                          onClick={() => window.open(userData.website, '_blank')}
                          sx={{ cursor: 'pointer' }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 4 }}>
                    <Box>
                      <Typography variant="h6" sx={{ mb: 2 }}>Skills</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {userData.skills.map((skill, index) => (
                          <Chip 
                            key={index} 
                            icon={<StarIcon />} 
                            label={skill} 
                            color="primary" 
                            variant="outlined" 
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box>
                      <Typography variant="h6" sx={{ mb: 2 }}>Interests</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {userData.interests.map((interest, index) => (
                          <Chip 
                            key={index} 
                            icon={<FavoriteIcon />} 
                            label={interest} 
                            color="secondary" 
                            variant="outlined" 
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Social Connections</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }}>
                    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: 3 }}>
                      <TwitterIcon sx={{ mr: 2, color: "#1DA1F2", fontSize: 32 }} />
                      <Box>
                        <Typography variant="body1">Twitter</Typography>
                        <Typography variant="body2" color="text.secondary">@{userData.twitter}</Typography>
                      </Box>
                    </Paper>

                    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: 3 }}>
                      <LinkedInIcon sx={{ mr: 2, color: "#0077B5", fontSize: 32 }} />
                      <Box>
                        <Typography variant="body1">LinkedIn</Typography>
                        <Typography variant="body2" color="text.secondary">/{userData.linkedin}</Typography>
                      </Box>
                    </Paper>

                    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: 3 }}>
                      <InstagramIcon sx={{ mr: 2, color: "#E1306C", fontSize: 32 }} />
                      <Box>
                        <Typography variant="body1">Instagram</Typography>
                        <Typography variant="body2" color="text.secondary">@{userData.instagram}</Typography>
                      </Box>
                    </Paper>
                  </Box>
                </TabPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ProfilePage;