
import { useState, useCallback } from 'react';
import { Role } from '@/types/rbac';
import { initialRoles } from './initialData';
import { generateId } from './utils';

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);

  // Role Management
  const addRole = useCallback((role: Omit<Role, "id">): string => {
    const id = generateId("role");
    setRoles((prevRoles) => [...prevRoles, { ...role, id }]);
    return id;
  }, []);

  const updateRole = useCallback(
    (id: string, roleData: Partial<Omit<Role, "id">>): boolean => {
      setRoles((prevRoles) =>
        prevRoles.map((role) => (role.id === id ? { ...role, ...roleData } : role))
      );
      return true;
    },
    []
  );

  const deleteRole = useCallback((id: string): boolean => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
    return true;
  }, []);

  const assignPrivilegeToRole = useCallback((privilegeId: string, roleId: string): boolean => {
    const roleIndex = roles.findIndex((r) => r.id === roleId);
    
    if (roleIndex === -1) {
      return false;
    }
    
    const role = roles[roleIndex];
    
    if (!role.privileges.includes(privilegeId)) {
      setRoles((prevRoles) => {
        const updatedRoles = [...prevRoles];
        updatedRoles[roleIndex] = {
          ...role,
          privileges: [...role.privileges, privilegeId],
        };
        return updatedRoles;
      });
    }
    
    return true;
  }, [roles]);

  const removePrivilegeFromRole = useCallback((privilegeId: string, roleId: string): boolean => {
    const roleIndex = roles.findIndex((r) => r.id === roleId);
    
    if (roleIndex === -1) {
      return false;
    }
    
    setRoles((prevRoles) => {
      const updatedRoles = [...prevRoles];
      const role = prevRoles[roleIndex];
      updatedRoles[roleIndex] = {
        ...role,
        privileges: role.privileges.filter((id) => id !== privilegeId),
      };
      return updatedRoles;
    });
    
    return true;
  }, [roles]);

  return {
    roles,
    setRoles,
    addRole,
    updateRole,
    deleteRole,
    assignPrivilegeToRole,
    removePrivilegeFromRole,
  };
};
