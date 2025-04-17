
import { useState, useCallback } from 'react';
import { UserGroup } from '@/types/rbac';
import { initialGroups } from './initialData';
import { generateId } from './utils';

export const useGroups = () => {
  const [groups, setGroups] = useState<UserGroup[]>(initialGroups);

  // Group Management
  const addGroup = useCallback((group: Omit<UserGroup, "id">): string => {
    const id = generateId("group");
    setGroups((prevGroups) => [...prevGroups, { ...group, id }]);
    return id;
  }, []);

  const updateGroup = useCallback(
    (id: string, groupData: Partial<Omit<UserGroup, "id">>): boolean => {
      setGroups((prevGroups) =>
        prevGroups.map((group) => (group.id === id ? { ...group, ...groupData } : group))
      );
      return true;
    },
    []
  );

  const deleteGroup = useCallback((id: string): boolean => {
    setGroups((prevGroups) => prevGroups.filter((group) => group.id !== id));
    return true;
  }, []);

  const assignUserToGroup = useCallback((userId: string, groupId: string): boolean => {
    const groupIndex = groups.findIndex((g) => g.id === groupId);
    
    if (groupIndex === -1) {
      return false;
    }
    
    const group = groups[groupIndex];
    
    if (!group.members.includes(userId)) {
      setGroups((prevGroups) => {
        const updatedGroups = [...prevGroups];
        updatedGroups[groupIndex] = {
          ...group,
          members: [...group.members, userId],
        };
        return updatedGroups;
      });
    }
    
    return true;
  }, [groups]);

  const removeUserFromGroup = useCallback((userId: string, groupId: string): boolean => {
    const groupIndex = groups.findIndex((g) => g.id === groupId);
    
    if (groupIndex === -1) {
      return false;
    }
    
    setGroups((prevGroups) => {
      const updatedGroups = [...prevGroups];
      const group = prevGroups[groupIndex];
      updatedGroups[groupIndex] = {
        ...group,
        members: group.members.filter((id) => id !== userId),
      };
      return updatedGroups;
    });
    
    return true;
  }, [groups]);

  const assignRoleToGroup = useCallback((roleId: string, groupId: string): boolean => {
    const groupIndex = groups.findIndex((g) => g.id === groupId);
    
    if (groupIndex === -1) {
      return false;
    }
    
    const group = groups[groupIndex];
    
    if (!group.roles.includes(roleId)) {
      setGroups((prevGroups) => {
        const updatedGroups = [...prevGroups];
        updatedGroups[groupIndex] = {
          ...group,
          roles: [...group.roles, roleId],
        };
        return updatedGroups;
      });
    }
    
    return true;
  }, [groups]);

  const removeRoleFromGroup = useCallback((roleId: string, groupId: string): boolean => {
    const groupIndex = groups.findIndex((g) => g.id === groupId);
    
    if (groupIndex === -1) {
      return false;
    }
    
    setGroups((prevGroups) => {
      const updatedGroups = [...prevGroups];
      const group = prevGroups[groupIndex];
      updatedGroups[groupIndex] = {
        ...group,
        roles: group.roles.filter((id) => id !== roleId),
      };
      return updatedGroups;
    });
    
    return true;
  }, [groups]);

  return {
    groups,
    setGroups,
    addGroup,
    updateGroup,
    deleteGroup,
    assignUserToGroup,
    removeUserFromGroup,
    assignRoleToGroup,
    removeRoleFromGroup,
  };
};
