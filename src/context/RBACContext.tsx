
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  RBACContextType,
  RBACUser,
  Role,
  Privilege,
  UserGroup,
} from "@/types/rbac";

// Mock initial data
const initialPrivileges: Privilege[] = [
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

const initialRoles: Role[] = [
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

const initialGroups: UserGroup[] = [
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

const initialUsers: RBACUser[] = [
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

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export const RBACProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set up state
  const [users, setUsers] = useState<RBACUser[]>(initialUsers);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [privileges, setPrivileges] = useState<Privilege[]>(initialPrivileges);
  const [groups, setGroups] = useState<UserGroup[]>(initialGroups);

  // Try to load data from localStorage on component mount
  useEffect(() => {
    const loadedUsers = localStorage.getItem("rbac_users");
    const loadedRoles = localStorage.getItem("rbac_roles");
    const loadedPrivileges = localStorage.getItem("rbac_privileges");
    const loadedGroups = localStorage.getItem("rbac_groups");

    if (loadedUsers) setUsers(JSON.parse(loadedUsers));
    if (loadedRoles) setRoles(JSON.parse(loadedRoles));
    if (loadedPrivileges) setPrivileges(JSON.parse(loadedPrivileges));
    if (loadedGroups) setGroups(JSON.parse(loadedGroups));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("rbac_users", JSON.stringify(users));
    localStorage.setItem("rbac_roles", JSON.stringify(roles));
    localStorage.setItem("rbac_privileges", JSON.stringify(privileges));
    localStorage.setItem("rbac_groups", JSON.stringify(groups));
  }, [users, roles, privileges, groups]);

  // Generate a unique ID
  const generateId = (prefix: string): string => {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // User Management
  const addUser = (user: Omit<RBACUser, "id">): string => {
    const id = generateId("user");
    setUsers([...users, { ...user, id }]);
    return id;
  };

  const updateUser = (
    id: string,
    userData: Partial<Omit<RBACUser, "id">>
  ): boolean => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...userData } : user
    );
    setUsers(updatedUsers);
    return true;
  };

  const deleteUser = (id: string): boolean => {
    setUsers(users.filter((user) => user.id !== id));
    
    // Remove user from all groups
    setGroups(
      groups.map((group) => ({
        ...group,
        members: group.members.filter((uid) => uid !== id),
      }))
    );
    
    return true;
  };

  // Role Management
  const addRole = (role: Omit<Role, "id">): string => {
    const id = generateId("role");
    setRoles([...roles, { ...role, id }]);
    return id;
  };

  const updateRole = (
    id: string,
    roleData: Partial<Omit<Role, "id">>
  ): boolean => {
    const updatedRoles = roles.map((role) =>
      role.id === id ? { ...role, ...roleData } : role
    );
    setRoles(updatedRoles);
    return true;
  };

  const deleteRole = (id: string): boolean => {
    // Check if role is assigned to any group or user
    const isAssignedToGroup = groups.some((group) => group.roles.includes(id));
    const isAssignedToUser = users.some((user) => 
      user.directRoles && user.directRoles.includes(id)
    );

    if (isAssignedToGroup || isAssignedToUser) {
      return false;
    }

    setRoles(roles.filter((role) => role.id !== id));
    return true;
  };

  // Privilege Management
  const addPrivilege = (privilege: Omit<Privilege, "id">): string => {
    const id = generateId("priv");
    setPrivileges([...privileges, { ...privilege, id }]);
    return id;
  };

  const updatePrivilege = (
    id: string,
    privilegeData: Partial<Omit<Privilege, "id">>
  ): boolean => {
    const updatedPrivileges = privileges.map((privilege) =>
      privilege.id === id ? { ...privilege, ...privilegeData } : privilege
    );
    setPrivileges(updatedPrivileges);
    return true;
  };

  const deletePrivilege = (id: string): boolean => {
    // Check if privilege is assigned to any role
    const isAssignedToRole = roles.some((role) =>
      role.privileges.includes(id)
    );

    if (isAssignedToRole) {
      return false;
    }

    setPrivileges(privileges.filter((privilege) => privilege.id !== id));
    return true;
  };

  // Group Management
  const addGroup = (group: Omit<UserGroup, "id">): string => {
    const id = generateId("group");
    setGroups([...groups, { ...group, id }]);
    return id;
  };

  const updateGroup = (
    id: string,
    groupData: Partial<Omit<UserGroup, "id">>
  ): boolean => {
    const updatedGroups = groups.map((group) =>
      group.id === id ? { ...group, ...groupData } : group
    );
    setGroups(updatedGroups);
    return true;
  };

  const deleteGroup = (id: string): boolean => {
    // Remove group from users
    setUsers(
      users.map((user) => ({
        ...user,
        groups: user.groups.filter((gid) => gid !== id),
      }))
    );
    
    setGroups(groups.filter((group) => group.id !== id));
    return true;
  };

  // Assignment Methods
  const assignUserToGroup = (userId: string, groupId: string): boolean => {
    const groupIndex = groups.findIndex((g) => g.id === groupId);
    const userIndex = users.findIndex((u) => u.id === userId);
    
    if (groupIndex === -1 || userIndex === -1) {
      return false;
    }
    
    const group = groups[groupIndex];
    
    if (!group.members.includes(userId)) {
      const updatedGroups = [...groups];
      updatedGroups[groupIndex] = {
        ...group,
        members: [...group.members, userId],
      };
      setGroups(updatedGroups);
    }
    
    const user = users[userIndex];
    
    if (!user.groups.includes(groupId)) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = {
        ...user,
        groups: [...user.groups, groupId],
      };
      setUsers(updatedUsers);
    }
    
    return true;
  };

  const removeUserFromGroup = (userId: string, groupId: string): boolean => {
    const groupIndex = groups.findIndex((g) => g.id === groupId);
    const userIndex = users.findIndex((u) => u.id === userId);
    
    if (groupIndex === -1 || userIndex === -1) {
      return false;
    }
    
    const group = groups[groupIndex];
    const updatedGroups = [...groups];
    updatedGroups[groupIndex] = {
      ...group,
      members: group.members.filter((id) => id !== userId),
    };
    setGroups(updatedGroups);
    
    const user = users[userIndex];
    const updatedUsers = [...users];
    updatedUsers[userIndex] = {
      ...user,
      groups: user.groups.filter((id) => id !== groupId),
    };
    setUsers(updatedUsers);
    
    return true;
  };

  const assignRoleToGroup = (roleId: string, groupId: string): boolean => {
    const groupIndex = groups.findIndex((g) => g.id === groupId);
    const roleExists = roles.some((r) => r.id === roleId);
    
    if (groupIndex === -1 || !roleExists) {
      return false;
    }
    
    const group = groups[groupIndex];
    
    if (!group.roles.includes(roleId)) {
      const updatedGroups = [...groups];
      updatedGroups[groupIndex] = {
        ...group,
        roles: [...group.roles, roleId],
      };
      setGroups(updatedGroups);
    }
    
    return true;
  };

  const removeRoleFromGroup = (roleId: string, groupId: string): boolean => {
    const groupIndex = groups.findIndex((g) => g.id === groupId);
    
    if (groupIndex === -1) {
      return false;
    }
    
    const group = groups[groupIndex];
    const updatedGroups = [...groups];
    updatedGroups[groupIndex] = {
      ...group,
      roles: group.roles.filter((id) => id !== roleId),
    };
    setGroups(updatedGroups);
    
    return true;
  };

  const assignPrivilegeToRole = (privilegeId: string, roleId: string): boolean => {
    const roleIndex = roles.findIndex((r) => r.id === roleId);
    const privilegeExists = privileges.some((p) => p.id === privilegeId);
    
    if (roleIndex === -1 || !privilegeExists) {
      return false;
    }
    
    const role = roles[roleIndex];
    
    if (!role.privileges.includes(privilegeId)) {
      const updatedRoles = [...roles];
      updatedRoles[roleIndex] = {
        ...role,
        privileges: [...role.privileges, privilegeId],
      };
      setRoles(updatedRoles);
    }
    
    return true;
  };

  const removePrivilegeFromRole = (privilegeId: string, roleId: string): boolean => {
    const roleIndex = roles.findIndex((r) => r.id === roleId);
    
    if (roleIndex === -1) {
      return false;
    }
    
    const role = roles[roleIndex];
    const updatedRoles = [...roles];
    updatedRoles[roleIndex] = {
      ...role,
      privileges: role.privileges.filter((id) => id !== privilegeId),
    };
    setRoles(updatedRoles);
    
    return true;
  };

  // Utility Methods
  const getUserRoles = (userId: string): Role[] => {
    const user = users.find((u) => u.id === userId);
    if (!user) return [];
    
    // Get roles from user groups
    const userGroups = groups.filter((g) => user.groups.includes(g.id));
    const groupRoleIds = userGroups.flatMap((g) => g.roles);
    
    // Get direct roles
    const directRoleIds = user.directRoles || [];
    
    // Combine and deduplicate roles
    const allRoleIds = [...new Set([...groupRoleIds, ...directRoleIds])];
    
    return roles.filter((role) => allRoleIds.includes(role.id));
  };

  const getUserPrivileges = (userId: string): Privilege[] => {
    const userRoles = getUserRoles(userId);
    
    // Get all privilege IDs from all roles
    const privilegeIds = userRoles.flatMap((role) => role.privileges);
    
    // Deduplicate privilege IDs
    const uniquePrivilegeIds = [...new Set(privilegeIds)];
    
    return privileges.filter((privilege) => 
      uniquePrivilegeIds.includes(privilege.id)
    );
  };

  const hasPrivilege = (userId: string, privilegeKey: string): boolean => {
    const userPrivileges = getUserPrivileges(userId);
    return userPrivileges.some((p) => p.key === privilegeKey);
  };

  const value: RBACContextType = {
    users,
    roles,
    privileges,
    groups,
    addUser,
    updateUser,
    deleteUser,
    addRole,
    updateRole,
    deleteRole,
    addPrivilege,
    updatePrivilege,
    deletePrivilege,
    addGroup,
    updateGroup,
    deleteGroup,
    assignUserToGroup,
    removeUserFromGroup,
    assignRoleToGroup,
    removeRoleFromGroup,
    assignPrivilegeToRole,
    removePrivilegeFromRole,
    hasPrivilege,
    getUserRoles,
    getUserPrivileges,
  };

  return <RBACContext.Provider value={value}>{children}</RBACContext.Provider>;
};

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (context === undefined) {
    throw new Error("useRBAC must be used within a RBACProvider");
  }
  return context;
};
