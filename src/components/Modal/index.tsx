import * as React from "react";
import * as S from "./styles";
import Box from "@mui/material/Box";
import MaterialModal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "400px",
  width: "calc(100% - 1rem)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  m: "0 auto",
  borderRadius: 3,
};

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: () => void;
}

export function Modal({ children, open, setOpen }: ModalProps) {
  return (
    <div>
      <MaterialModal
        open={open}
        onClose={setOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {children} <S.CloseButton onClick={setOpen} />
        </Box>
      </MaterialModal>
    </div>
  );
}
