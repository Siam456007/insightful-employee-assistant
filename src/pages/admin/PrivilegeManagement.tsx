import React, { useState } from "react";
import { useRBAC } from "@/context/RBACContext";
import { Privilege } from "@/types/rbac";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

const PrivilegeManagement = () => {
  const { privileges, addPrivilege, updatePrivilege, deletePrivilege } =
    useRBAC();

  const [isAdding, setIsAdding] = useState(false);
  const [editingPrivilegeId, setEditingPrivilegeId] = useState<string | null>(
    null
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [key, setKey] = useState("");

  const resetForm = () => {
    setName("");
    setDescription("");
    setKey("");
    setIsAdding(false);
    setEditingPrivilegeId(null);
  };

  const handleAddPrivilege = () => {
    if (!name.trim() || !key.trim()) {
      toast({
        title: "Error",
        description: "Name and key are required",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicate key
    if (privileges.some((p) => p.key === key.trim())) {
      toast({
        title: "Error",
        description: "Privilege key must be unique",
        variant: "destructive",
      });
      return;
    }

    const id = addPrivilege({
      name,
      description,
      key,
    });

    toast({
      title: "Success",
      description: `Privilege "${name}" has been created`,
    });

    resetForm();
  };

  const handleUpdatePrivilege = () => {
    if (!editingPrivilegeId) return;

    if (!name.trim() || !key.trim()) {
      toast({
        title: "Error",
        description: "Name and key are required",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicate key (excluding the current privilege)
    const currentPrivilege = privileges.find(
      (p) => p.id === editingPrivilegeId
    );
    if (
      key !== currentPrivilege?.key &&
      privileges.some((p) => p.key === key.trim())
    ) {
      toast({
        title: "Error",
        description: "Privilege key must be unique",
        variant: "destructive",
      });
      return;
    }

    updatePrivilege(editingPrivilegeId, {
      name,
      description,
      key,
    });

    toast({
      title: "Success",
      description: `Privilege "${name}" has been updated`,
    });

    resetForm();
  };

  const handleDeletePrivilege = (privilegeId: string) => {
    const privilege = privileges.find((p) => p.id === privilegeId);
    if (!privilege) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete the privilege "${privilege.name}"?`
    );
    if (!confirmed) return;

    const success = deletePrivilege(privilegeId);

    if (success) {
      toast({
        title: "Success",
        description: `Privilege "${privilege.name}" has been deleted`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete privilege",
        variant: "destructive",
      });
    }
  };

  const handleEditPrivilege = (privilege: Privilege) => {
    setEditingPrivilegeId(privilege.id);
    setName(privilege.name);
    setDescription(privilege.description);
    setKey(privilege.key);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Privilege Management</h2>
        {!isAdding && !editingPrivilegeId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus size={16} className="mr-2" /> Add New Privilege
          </Button>
        )}
      </div>

      {/* Add/Edit Privilege Form */}
      {(isAdding || editingPrivilegeId) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingPrivilegeId ? "Edit Privilege" : "Add New Privilege"}
            </CardTitle>
            <CardDescription>
              {editingPrivilegeId
                ? "Update privilege details"
                : "Create a new privilege"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium block mb-1"
                >
                  Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter privilege name"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-medium block mb-1"
                >
                  Description
                </label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter privilege description"
                />
              </div>

              <div>
                <label htmlFor="key" className="text-sm font-medium block mb-1">
                  Key
                </label>
                <Input
                  id="key"
                  value={key}
                  onChange={(e) =>
                    setKey(e.target.value.replace(/\s+/g, "_").toLowerCase())
                  }
                  placeholder="enter_privilege_key"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Unique identifier used in code (no spaces, lowercase with
                  underscores)
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              <X size={16} className="mr-2" /> Cancel
            </Button>
            <Button
              onClick={
                editingPrivilegeId ? handleUpdatePrivilege : handleAddPrivilege
              }
            >
              <Save size={16} className="mr-2" />{" "}
              {editingPrivilegeId ? "Update Privilege" : "Create Privilege"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Privileges Table */}
      <Card>
        <CardHeader>
          <CardTitle>Privileges</CardTitle>
          <CardDescription>Manage system privileges</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Key</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {privileges.map((privilege) => (
                <TableRow key={privilege.id}>
                  <TableCell className="font-medium">
                    {privilege.name}
                  </TableCell>
                  <TableCell>{privilege.description}</TableCell>
                  <TableCell>
                    <code className="px-2 py-1 bg-muted rounded text-xs">
                      {privilege.key}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditPrivilege(privilege)}
                        disabled={isAdding || !!editingPrivilegeId}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeletePrivilege(privilege.id)}
                        disabled={isAdding || !!editingPrivilegeId}
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
    </div>
  );
};

export default PrivilegeManagement;
