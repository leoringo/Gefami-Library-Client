import React, { type ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

type PopupType = "error" | "success" | "action";

interface PopupDialogProps {
  open: boolean;
  type: PopupType;
  title: string;
  description: string | ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
}

const iconMap = {
  error: <ErrorOutlineIcon color="error" fontSize="large" />,
  success: <CheckCircleOutlineIcon color="success" fontSize="large" />,
  action: <HelpOutlineIcon color="primary" fontSize="large" />,
};

const PopupDialog: React.FC<PopupDialogProps> = ({
  open,
  type,
  title,
  description,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box display="flex" justifyContent="center" mt={2}>
        {iconMap[type]}
      </Box>
      <DialogTitle textAlign="center">{title}</DialogTitle>
      <DialogContent>
        <Typography textAlign="center">{description}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        {type === "action" ? (
          <>
            <Button onClick={onClose} color="inherit" variant="outlined">
              No
            </Button>
            <Button onClick={onConfirm} color="primary" variant="contained">
              Yes
            </Button>
          </>
        ) : (
          <Button onClick={onClose} variant="contained">
            Okay
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PopupDialog;
