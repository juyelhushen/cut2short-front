import React from "react";
import {
  Dialog,
  IconButton,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardActionArea,
  alpha,
} from "@mui/material";
import {
  InsertLink,
  QrCode2,
  Dns,
  Close,
  ArrowForward,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateDialog = ({ open, onClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const options = [
    {
      title: "Shorten a link",
      description: "Create shortened URLs for sharing",
      icon: <InsertLink sx={{ fontSize: 32 }} />,
      color: theme.palette.primary.main,
      path: "/dashboard/links/create",
    },
    {
      title: "Create a QR Code",
      description: "Generate QR codes for your links",
      icon: <QrCode2 sx={{ fontSize: 32 }} />,
      color: theme.palette.warning.main,
      path: "/dashboard/qrcodes/create",
    },
    // {
    //   title: "Build a landing page",
    //   description: "Create custom landing pages",
    //   icon: <Dns sx={{ fontSize: 32 }} />,
    //   color: theme.palette.secondary.main,
    //   path: "/dashboard/landingpage/create",
    // },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 4,
          overflow: "hidden",
          background: theme.palette.background.default,
        },
      }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          position: "relative",
          background: "white",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Typography variant="h4" fontWeight="700" color="text.primary">
            Create New
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Options Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {options.map((opt, index) => (
            <motion.div
              key={opt.title}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: alpha(opt.color, 0.5),
                    boxShadow: `0 8px 24px ${alpha(opt.color, 0.15)}`,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleNavigate(opt.path)}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    {/* Icon */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          backgroundColor: alpha(opt.color, 0.1),
                          color: opt.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {opt.icon}
                      </Box>
                      <ArrowForward
                        sx={{
                          fontSize: 20,
                          color: "text.secondary",
                          opacity: 0.7,
                        }}
                      />
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      gutterBottom
                      color="text.primary"
                    >
                      {opt.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {opt.description}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </motion.div>
          ))}
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Choose an option to get started
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CreateDialog;