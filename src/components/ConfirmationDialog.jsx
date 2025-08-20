// src/components/ConfirmationDialog.jsx
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
  Box,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon: Icon = DeleteOutlineIcon,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      TransitionComponent={Transition}
      PaperProps={{
        component: motion.div,
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { type: "spring", damping: 25, stiffness: 500 },
      }}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          overflow: "visible",
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: -20,
            left: "50%",
            transform: "translateX(-50%)",
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(139, 92, 246, 0.3)",
          },
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            position: "absolute",
            top: -20,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Icon
            sx={{
              fontSize: 32,
              color: "white",
              backgroundColor: "transparent",
              borderRadius: "50%",
              padding: 1,
            }}
          />
        </motion.div>
      </Box>

      <DialogTitle
        sx={{
          textAlign: "center",
          pt: 7,
          pb: 2,
          fontSize: "1.5rem",
          fontWeight: 700,
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {title}
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={onCancel}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          color: "#94a3b8",
          backgroundColor: "#f1f5f9",
          "&:hover": {
            backgroundColor: "#e2e8f0",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ py: 0, px: 3 }}>
        <DialogContentText
          sx={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "1rem",
            lineHeight: 1.6,
            mb: 2,
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, justifyContent: "center", gap: 2 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderRadius: "12px",
            px: 3,
            py: 1,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#64748b",
            borderColor: "#cbd5e1",
            "&:hover": {
              borderColor: "#94a3b8",
              backgroundColor: "#f8fafc",
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            borderRadius: "12px",
            px: 3,
            py: 1,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            background: "linear-gradient(90deg, #4B5EFC 0%, #8F6ED5 100%)",
            boxShadow: "0 4px 6px rgba(79, 70, 229, 0.2)",
            "&:hover": {
              background: "linear-gradient(90deg, #3D4EDA 0%, #7A50C0 100%)",
              boxShadow: "0 6px 8px rgba(79, 70, 229, 0.3)",
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;