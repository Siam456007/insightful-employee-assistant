
import { useState, useCallback } from 'react';
import { Privilege } from '@/types/rbac';
import { initialPrivileges } from './initialData';
import { generateId } from './utils';

export const usePrivileges = () => {
  const [privileges, setPrivileges] = useState<Privilege[]>(initialPrivileges);

  // Privilege Management
  const addPrivilege = useCallback((privilege: Omit<Privilege, "id">): string => {
    const id = generateId("priv");
    setPrivileges((prevPrivileges) => [...prevPrivileges, { ...privilege, id }]);
    return id;
  }, []);

  const updatePrivilege = useCallback(
    (id: string, privilegeData: Partial<Omit<Privilege, "id">>): boolean => {
      setPrivileges((prevPrivileges) =>
        prevPrivileges.map((privilege) => 
          privilege.id === id ? { ...privilege, ...privilegeData } : privilege
        )
      );
      return true;
    },
    []
  );

  const deletePrivilege = useCallback((id: string): boolean => {
    setPrivileges((prevPrivileges) => 
      prevPrivileges.filter((privilege) => privilege.id !== id)
    );
    return true;
  }, []);

  return {
    privileges,
    setPrivileges,
    addPrivilege,
    updatePrivilege,
    deletePrivilege,
  };
};
