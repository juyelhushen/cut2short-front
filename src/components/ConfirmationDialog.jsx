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
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          overflow: "visible",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: -16,
            left: "50%",
            transform: "translateX(-50%)",
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "error.light",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(244, 67, 54, 0.3)",
          },
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            position: "absolute",
            top: -16,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Icon
            sx={{
              fontSize: 32,
              color: "error.main",
              backgroundColor: "background.paper",
              borderRadius: "50%",
              padding: 1,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
        </motion.div>
      </Box>

      <DialogTitle
        sx={{
          textAlign: "center",
          pt: 6,
          pb: 2,
          fontSize: "1.25rem",
          fontWeight: 600,
        }}
      >
        {title}
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={onCancel}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ py: 0 }}>
        <DialogContentText
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 2,
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderRadius: "8px",
            px: 3,
            py: 1,
            textTransform: "none",
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            borderRadius: "8px",
            px: 3,
            py: 1,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 2px 6px rgba(244, 67, 54, 0.4)",
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
