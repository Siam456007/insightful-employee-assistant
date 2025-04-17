
import { Privilege, Role, UserGroup, RBACUser } from '@/types/rbac';

// Mock initial data
export const initialPrivileges: Privilege[] = [
  {
    id: "priv_1",
    name: "View Dashboard",
    description: "Can view the main dashboard",
    key: "view_dashboard",
  },
  {
    id: "priv_2",
    name: "Edit Content",
    description: "Can edit content",
    key: "edit_content",
  },
  {
    id: "priv_3",
    name: "Delete Content",
    description: "Can delete content",
    key: "delete_content",
  },
  {
    id: "priv_4",
    name: "Manage Users",
    description: "Can manage users",
    key: "manage_users",
  },
];

export const initialRoles: Role[] = [
  {
    id: "role_1",
    name: "Admin",
    description: "Full system access",
    privileges: ["priv_1", "priv_2", "priv_3", "priv_4"],
  },
  {
    id: "role_2",
    name: "Editor",
    description: "Can edit and view content",
    privileges: ["priv_1", "priv_2"],
  },
  {
    id: "role_3",
    name: "Viewer",
    description: "Can view content only",
    privileges: ["priv_1"],
  },
];

export const initialGroups: UserGroup[] = [
  {
    id: "group_1",
    name: "IT Department",
    description: "IT staff members",
    roles: ["role_1"],
    members: ["user_1"],
  },
  {
    id: "group_2",
    name: "Content Team",
    description: "Content creators and editors",
    roles: ["role_2"],
    members: ["user_2"],
  },
];

export const initialUsers: RBACUser[] = [
  {
    id: "user_1",
    name: "John Admin",
    email: "john@example.com",
    groups: ["group_1"],
  },
  {
    id: "user_2",
    name: "Jane Editor",
    email: "jane@example.com",
    groups: ["group_2"],
  },
  {
    id: "user_3",
    name: "Bob Viewer",
    email: "bob@example.com",
    groups: [],
    directRoles: ["role_3"],
  },
];
