
export interface Privilege {
  id: string;
  name: string;
  description: string;
  key: string; // Unique identifier used in code, e.g., "can_edit_users"
}

export interface Role {
  id: string;
  name: string;
  description: string;
  privileges: string[]; // Array of privilege IDs
}

export interface RBACUser {
  id: string;
  name: string;
  email: string;
  groups: string[]; // Array of group IDs
  directRoles?: string[]; // Optional array of role IDs assigned directly to the user
}

export interface UserGroup {
  id: string;
  name: string;
  description: string;
  roles: string[]; // Array of role IDs
  members: string[]; // Array of user IDs
}

export interface RBACState {
  users: RBACUser[];
  roles: Role[];
  privileges: Privilege[];
  groups: UserGroup[];
}

export interface RBACContextType extends RBACState {
  // User Management
  addUser: (user: Omit<RBACUser, "id">) => string;
  updateUser: (id: string, user: Partial<Omit<RBACUser, "id">>) => boolean;
  deleteUser: (id: string) => boolean;
  
  // Role Management
  addRole: (role: Omit<Role, "id">) => string;
  updateRole: (id: string, role: Partial<Omit<Role, "id">>) => boolean;
  deleteRole: (id: string) => boolean;
  
  // Privilege Management
  addPrivilege: (privilege: Omit<Privilege, "id">) => string;
  updatePrivilege: (id: string, privilege: Partial<Omit<Privilege, "id">>) => boolean;
  deletePrivilege: (id: string) => boolean;
  
  // Group Management
  addGroup: (group: Omit<UserGroup, "id">) => string;
  updateGroup: (id: string, group: Partial<Omit<UserGroup, "id">>) => boolean;
  deleteGroup: (id: string) => boolean;
  
  // Assignment Methods
  assignUserToGroup: (userId: string, groupId: string) => boolean;
  removeUserFromGroup: (userId: string, groupId: string) => boolean;
  assignRoleToGroup: (roleId: string, groupId: string) => boolean;
  removeRoleFromGroup: (roleId: string, groupId: string) => boolean;
  assignPrivilegeToRole: (privilegeId: string, roleId: string) => boolean;
  removePrivilegeFromRole: (privilegeId: string, roleId: string) => boolean;
  
  // Utility Methods
  hasPrivilege: (userId: string, privilegeKey: string) => boolean;
  getUserRoles: (userId: string) => Role[];
  getUserPrivileges: (userId: string) => Privilege[];
}
