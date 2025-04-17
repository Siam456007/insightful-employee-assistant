import React, { useState } from "react";
import { useRBAC } from "@/context/RBACContext";
import { Role, Privilege } from "@/types/rbac";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Plus, Save, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConfirmDialog from "@/components/ui/confirm-dialog";

const RoleManagement = () => {
  const {
    roles,
    privileges,
    addRole,
    updateRole,
    deleteRole,
    assignPrivilegeToRole,
    removePrivilegeFromRole,
  } = useRBAC();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");
  const [newRolePrivileges, setNewRolePrivileges] = useState<string[]>([]);

  const resetForm = () => {
    setNewRoleName("");
    setNewRoleDescription("");
    setNewRolePrivileges([]);
    setEditingRoleId(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (role: Role) => {
    setEditingRoleId(role.id);
    setNewRoleName(role.name);
    setNewRoleDescription(role.description);
    setNewRolePrivileges([...role.privileges]);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => {
      resetForm();
    }, 300);
  };

  const openDeleteDialog = (role: Role) => {
    setRoleToDelete(role);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setRoleToDelete(null);
  };

  const handleAddRole = () => {
    if (!newRoleName.trim()) {
      toast({
        title: "Error",
        description: "Role name is required",
        variant: "destructive",
      });
      return;
    }

    const id = addRole({
      name: newRoleName,
      description: newRoleDescription,
      privileges: newRolePrivileges,
    });

    toast({
      title: "Success",
      description: `Role "${newRoleName}" has been created`,
    });

    closeDialog();
  };

  const handleUpdateRole = () => {
    if (!editingRoleId) return;

    if (!newRoleName.trim()) {
      toast({
        title: "Error",
        description: "Role name is required",
        variant: "destructive",
      });
      return;
    }

    updateRole(editingRoleId, {
      name: newRoleName,
      description: newRoleDescription,
      privileges: newRolePrivileges,
    });

    toast({
      title: "Success",
      description: `Role "${newRoleName}" has been updated`,
    });

    closeDialog();
  };

  const handleDeleteRole = () => {
    if (!roleToDelete) return;

    const success = deleteRole(roleToDelete.id);

    if (success) {
      toast({
        title: "Success",
        description: `Role "${roleToDelete.name}" has been deleted`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete role",
        variant: "destructive",
      });
    }

    closeDeleteDialog();
  };

  const handleTogglePrivilege = (privilegeId: string) => {
    setNewRolePrivileges((prev) => {
      if (prev.includes(privilegeId)) {
        return prev.filter((id) => id !== privilegeId);
      } else {
        return [...prev, privilegeId];
      }
    });
  };

  const isPrivilegeAssigned = (role: Role, privilegeId: string): boolean => {
    return role.privileges.includes(privilegeId);
  };

  const handleToggleRolePrivilege = (roleId: string, privilegeId: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return;

    if (isPrivilegeAssigned(role, privilegeId)) {
      removePrivilegeFromRole(privilegeId, roleId);
    } else {
      assignPrivilegeToRole(privilegeId, roleId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <Button onClick={openAddDialog}>
          <Plus size={16} className="mr-2" /> Add New Role
        </Button>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
          <CardDescription>
            Manage roles and their assigned privileges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Privileges</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {role.privileges.map((privId) => {
                        const privilege = privileges.find(
                          (p) => p.id === privId
                        );
                        return privilege ? (
                          <span
                            key={privId}
                            className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                          >
                            {privilege.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(role)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(role)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Role Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingRoleId ? "Edit Role" : "Add New Role"}
            </DialogTitle>
            <DialogDescription>
              {editingRoleId
                ? "Update role details and permissions"
                : "Create a new role with specific permissions"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="roleName" className="text-sm font-medium">
                Role Name
              </label>
              <Input
                id="roleName"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="Enter role name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="roleDescription" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="roleDescription"
                value={newRoleDescription}
                onChange={(e) => setNewRoleDescription(e.target.value)}
                placeholder="Enter role description"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">Privileges</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[200px] overflow-y-auto p-2">
                {privileges.map((privilege) => (
                  <div
                    key={privilege.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`privilege-${privilege.id}`}
                      checked={newRolePrivileges.includes(privilege.id)}
                      onCheckedChange={() =>
                        handleTogglePrivilege(privilege.id)
                      }
                    />
                    <label
                      htmlFor={`privilege-${privilege.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {privilege.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button onClick={editingRoleId ? handleUpdateRole : handleAddRole}>
              {editingRoleId ? "Update Role" : "Create Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteRole}
        title="Delete Role"
        description={
          roleToDelete
            ? `Are you sure you want to delete the role "${roleToDelete.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this role? This action cannot be undone."
        }
      />
    </div>
  );
};

export default RoleManagement;
