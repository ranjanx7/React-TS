import { Modal, message } from "antd";
import { useUsersStore } from "../store/users-store";

interface DeleteUserModalProps {
  userId: number | null;
  onClose: () => void;
}

const DeleteUserModal = ({ userId, onClose }: DeleteUserModalProps) => {
  const deleteUser = useUsersStore((state) => state.deleteUser);
  const editingUser = useUsersStore((state) => state.editingUser);
  const setEditingUser = useUsersStore((state) => state.setEditingUser);

  const handleConfirm = () => {
    if (userId === null) return;

    deleteUser(userId);
    message.success("User deleted successfully");

    // If the deleted user was being edited, go back to create mode
    if (editingUser?.id === userId) {
      setEditingUser(null);
    }
    onClose();
  };

  return (
    <Modal
      title="Delete User"
      open={userId !== null}
      onCancel={onClose}
      onOk={handleConfirm}
      okText="Confirm"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
    >
      <p>Are you sure to delete this user?</p>
    </Modal>
  );
};

export default DeleteUserModal;
