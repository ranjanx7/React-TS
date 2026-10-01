import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer, Avatar, Dropdown, Modal, Spin } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAuthStore } from "../store/auth-store";
import { useUsersStore } from "../store/users-store";
import DeleteUserModal from "../components/DeleteUserModal";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

const UserManagement = () => {
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, logout } = useAuthStore();
  const setEditingUser = useUsersStore((state) => state.setEditingUser);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading for 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsLogoutModalOpen(false);
  };

  const showLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: showLogoutModal,
    },
  ];

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setEditingUser(null);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsDrawerOpen(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setIsDrawerOpen(true);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm">
          <Spin size="large" />
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      )}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <nav className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 -mt-0.5">
                  <TeamOutlined className="text-white text-lg" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                  User Management Module
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <Button className="flex items-center gap-2 h-10 px-4 rounded-xl border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                    <Avatar
                      size="small"
                      icon={<UserOutlined />}
                      className="bg-gradient-to-br from-blue-500 to-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {currentUser?.name}
                    </span>
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>
        </nav>

        <div className="mx-auto max-w-7xl p-4 md:p-6">
          <section className="w-[90%] mx-auto rounded-2xl bg-white p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
            <UserTable
              onDeleteClick={setDeleteUserId}
              onEditClick={handleEditUser}
              onAddClick={handleAddUser}
            />
          </section>
        </div>

        <Drawer
          title={false}
          placement="right"
          onClose={handleDrawerClose}
          open={isDrawerOpen}
          width={480}
          className="user-drawer"
        >
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {useUsersStore((state) => state.editingUser)
                  ? "Edit User"
                  : "Add New User"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Fill in the details below
              </p>
            </div>
            <div className="flex-1 overflow-y-auto">
              <UserForm onClose={handleDrawerClose} />
            </div>
          </div>
        </Drawer>

        <DeleteUserModal
          userId={deleteUserId}
          onClose={() => setDeleteUserId(null)}
        />

        <Modal
          title="Logout"
          open={isLogoutModalOpen}
          onOk={handleLogout}
          onCancel={() => setIsLogoutModalOpen(false)}
          okText="Confirm"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure to logout?</p>
        </Modal>
      </div>
    </>
  );
};

export default UserManagement;
