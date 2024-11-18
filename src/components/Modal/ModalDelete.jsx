import css from "./ModalDelete.module.css";

const ModalDelete = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <h3>{message}</h3>
        <div className={css.modalActions}>
          <button onClick={onConfirm} className={css.modalButton}>
            Delete
          </button>
          <button onClick={onCancel} className={css.modalButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
