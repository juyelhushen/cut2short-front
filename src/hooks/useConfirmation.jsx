// src/hooks/useConfirmation.js
import { useState } from "react";
import ConfirmationDialog from "../components/ConfirmationDialog";

const useConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({});

  const openDialog = (title, message, onConfirm, options = {}) => {
    setIsOpen(true);
    setConfig({
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setIsOpen(false);
      },
      ...options,
    });
  };

  const ConfirmationDialogComponent = () => (
    <ConfirmationDialog
      open={isOpen}
      onConfirm={config.onConfirm}
      onCancel={() => setIsOpen(false)}
      title={config.title}
      message={config.message}
      confirmText={config.confirmText}
      cancelText={config.cancelText}
      icon={config.icon}
    />
  );

  return { openDialog, ConfirmationDialog: ConfirmationDialogComponent };
};

export default useConfirmation;
