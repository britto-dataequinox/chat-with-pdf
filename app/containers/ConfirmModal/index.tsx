import React from "react";
import { Box, Typography, Modal, Card, CardContent } from "@mui/material";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="confirmation-modal">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        p={2}
      >
        <Card sx={{ maxWidth: 400, width: "100%" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button variant="default" color="primary" onClick={onConfirm}>
                {confirmText}
              </Button>
              <Button variant="outline" color="secondary" onClick={onClose}>
                {cancelText}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
