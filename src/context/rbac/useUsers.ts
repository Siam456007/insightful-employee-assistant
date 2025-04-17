
import { useState, useCallback } from 'react';
import { RBACUser } from '@/types/rbac';
import { initialUsers } from './initialData';
import { generateId } from './utils';

export const useUsers = () => {
  const [users, setUsers] = useState<RBACUser[]>(initialUsers);

  // User Management
  const addUser = useCallback((user: Omit<RBACUser, "id">): string => {
    const id = generateId("user");
    setUsers((prevUsers) => [...prevUsers, { ...user, id }]);
    return id;
  }, []);

  const updateUser = useCallback(
    (id: string, userData: Partial<Omit<RBACUser, "id">>): boolean => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, ...userData } : user))
      );
      return true;
    },
    []
  );

  const deleteUser = useCallback((id: string): boolean => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    return true;
  }, []);

  return {
    users,
    setUsers,
    addUser,
    updateUser,
    deleteUser,
  };
};
