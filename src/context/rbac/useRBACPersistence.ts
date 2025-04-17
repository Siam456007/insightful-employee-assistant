
import { useEffect } from 'react';
import { RBACUser, Role, Privilege, UserGroup } from '@/types/rbac';

export const useRBACPersistence = (
  users: RBACUser[],
  roles: Role[],
  privileges: Privilege[],
  groups: UserGroup[],
  setUsers: (users: RBACUser[]) => void,
  setRoles: (roles: Role[]) => void,
  setPrivileges: (privileges: Privilege[]) => void,
  setGroups: (groups: UserGroup[]) => void
) => {
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
  }, [setUsers, setRoles, setPrivileges, setGroups]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("rbac_users", JSON.stringify(users));
    localStorage.setItem("rbac_roles", JSON.stringify(roles));
    localStorage.setItem("rbac_privileges", JSON.stringify(privileges));
    localStorage.setItem("rbac_groups", JSON.stringify(groups));
  }, [users, roles, privileges, groups]);
};
