
import { useCallback } from 'react';
import { Role, Privilege, RBACUser, UserGroup } from '@/types/rbac';

export const useRBACUtils = (
  users: RBACUser[],
  roles: Role[],
  privileges: Privilege[],
  groups: UserGroup[]
) => {
  // Utility Methods
  const getUserRoles = useCallback((userId: string): Role[] => {
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
  }, [users, groups, roles]);

  const getUserPrivileges = useCallback((userId: string): Privilege[] => {
    const userRoles = getUserRoles(userId);
    
    // Get all privilege IDs from all roles
    const privilegeIds = userRoles.flatMap((role) => role.privileges);
    
    // Deduplicate privilege IDs
    const uniquePrivilegeIds = [...new Set(privilegeIds)];
    
    return privileges.filter((privilege) => 
      uniquePrivilegeIds.includes(privilege.id)
    );
  }, [getUserRoles, privileges]);

  const hasPrivilege = useCallback((userId: string, privilegeKey: string): boolean => {
    const userPrivileges = getUserPrivileges(userId);
    return userPrivileges.some((p) => p.key === privilegeKey);
  }, [getUserPrivileges]);

  return {
    getUserRoles,
    getUserPrivileges,
    hasPrivilege,
  };
};
