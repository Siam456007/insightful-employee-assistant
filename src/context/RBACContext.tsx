
import React, { createContext, useContext } from "react";
import { RBACContextType } from "@/types/rbac";
import { useUsers } from "./rbac/useUsers";
import { useRoles } from "./rbac/useRoles";
import { usePrivileges } from "./rbac/usePrivileges";
import { useGroups } from "./rbac/useGroups";
import { useRBACUtils } from "./rbac/useRBACUtils";
import { useRBACPersistence } from "./rbac/useRBACPersistence";

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export const RBACProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use the hooks
  const { users, setUsers, addUser, updateUser, deleteUser } = useUsers();
  const { roles, setRoles, addRole, updateRole, deleteRole, assignPrivilegeToRole, removePrivilegeFromRole } = useRoles();
  const { privileges, setPrivileges, addPrivilege, updatePrivilege, deletePrivilege } = usePrivileges();
  const { 
    groups, 
    setGroups, 
    addGroup, 
    updateGroup, 
    deleteGroup, 
    assignUserToGroup, 
    removeUserFromGroup, 
    assignRoleToGroup, 
    removeRoleFromGroup 
  } = useGroups();

  // Utility methods
  const { getUserRoles, getUserPrivileges, hasPrivilege } = useRBACUtils(users, roles, privileges, groups);

  // Set up persistence
  useRBACPersistence(users, roles, privileges, groups, setUsers, setRoles, setPrivileges, setGroups);

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
