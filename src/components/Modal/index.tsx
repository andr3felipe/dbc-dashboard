import Modal from "react-modal";
import { Button } from "../../components/Button";
import * as S from "./styles";

Modal.setAppElement("#root");

export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <S.Container>
      <S.StyledModal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Delete Confirmation"
      >
        <h2>Tem certeza que deseja deletar?</h2>
        <Button onClick={onConfirm} color={""} background={""}>
          Confirmar
        </Button>
        <Button onClick={onClose} color={""} background={""}>
          Cancelar
        </Button>
      </S.StyledModal>
    </S.Container>
  );
};
