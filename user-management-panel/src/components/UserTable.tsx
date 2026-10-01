import { Button, Empty, Table, Input, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useUsersStore } from "../store/users-store";
import type { User } from "../types/user";

interface UserTableProps {
  onDeleteClick: (userId: number) => void;
  onEditClick: (user: User) => void;
  onAddClick: () => void;
}

const UserTable = ({
  onDeleteClick,
  onEditClick,
  onAddClick,
}: UserTableProps) => {
  const users = useUsersStore((state) => state.users);
  const [searchText, setSearchText] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()),
  );

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 80,
      align: "center",
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      width: 200,
      render: (skills?: string[]) =>
        Array.isArray(skills) && skills.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 3).map((skill) => (
              <Tag key={skill} className="text-xs">
                {skill}
              </Tag>
            ))}
            {skills.length > 3 && (
              <Tag className="text-xs">+{skills.length - 3}</Tag>
            )}
          </div>
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: 100,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      align: "center",
      render: (_value, record) => (
        <div className="flex gap-2 justify-center">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEditClick(record)}
            className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDeleteClick(record.id)}
            className="hover:bg-red-50"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <Input
          placeholder="Search by name or email"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          size="large"
          className="max-w-md"
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddClick}
          size="large"
          className="h-11 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
        >
          Add User
        </Button>
      </div>
      <Table<User>
        rowKey="id"
        columns={columns}
        dataSource={filteredUsers}
        locale={{
          emptyText: (
            <Empty
              description={
                searchText ? "No matching users found" : "No users found"
              }
            />
          ),
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} users`,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        className="custom-table"
      />
    </div>
  );
};

export default UserTable;
