
import React, { useState } from "react";
import { useRBAC } from "@/context/RBACContext";
import { UserGroup } from "@/types/rbac";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pencil,
  Trash,
  Plus,
  Save,
  X,
  UserPlus,
  UserMinus,
  Users,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const GroupManagement = () => {
  const {
    groups,
    roles,
    users,
    addGroup,
    updateGroup,
    deleteGroup,
    assignRoleToGroup,
    removeRoleFromGroup,
    assignUserToGroup,
    removeUserFromGroup,
  } = useRBAC();

  const [isAdding, setIsAdding] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("details");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setSelectedRoles([]);
    setSelectedUsers([]);
    setIsAdding(false);
    setEditingGroupId(null);
    setActiveTab("details");
  };

  const handleAddGroup = () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Group name is required",
        variant: "destructive",
      });
      return;
    }

    const id = addGroup({
      name,
      description,
      roles: selectedRoles,
      members: selectedUsers,
    });

    toast({
      title: "Success",
      description: `Group "${name}" has been created`,
    });

    resetForm();
  };

  const handleUpdateGroup = () => {
    if (!editingGroupId) return;

    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Group name is required",
        variant: "destructive",
      });
      return;
    }

    updateGroup(editingGroupId, {
      name,
      description,
      roles: selectedRoles,
      members: selectedUsers,
    });

    toast({
      title: "Success",
      description: `Group "${name}" has been updated`,
    });

    resetForm();
  };

  const handleDeleteGroup = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete the group "${group.name}"?`
    );
    if (!confirmed) return;

    const success = deleteGroup(groupId);

    if (success) {
      toast({
        title: "Success",
        description: `Group "${group.name}" has been deleted`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete group",
        variant: "destructive",
      });
    }
  };

  const handleEditGroup = (group: UserGroup) => {
    setEditingGroupId(group.id);
    setName(group.name);
    setDescription(group.description);
    setSelectedRoles([...group.roles]);
    setSelectedUsers([...group.members]);
  };

  const handleToggleRole = (roleId: string) => {
    setSelectedRoles((prev) => {
      if (prev.includes(roleId)) {
        return prev.filter((id) => id !== roleId);
      } else {
        return [...prev, roleId];
      }
    });
  };

  const handleToggleUser = (userId: string) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleToggleGroupRole = (groupId: string, roleId: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    if (group.roles.includes(roleId)) {
      removeRoleFromGroup(roleId, groupId);
    } else {
      assignRoleToGroup(roleId, groupId);
    }
  };

  const handleToggleGroupUser = (groupId: string, userId: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    if (group.members.includes(userId)) {
      removeUserFromGroup(userId, groupId);
    } else {
      assignUserToGroup(userId, groupId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Group Management</h2>
        {!isAdding && !editingGroupId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus size={16} className="mr-2" /> Add New Group
          </Button>
        )}
      </div>

      {/* Add/Edit Group Form */}
      {(isAdding || editingGroupId) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingGroupId ? "Edit Group" : "Add New Group"}
            </CardTitle>
            <CardDescription>
              {editingGroupId
                ? "Update group details, roles, and members"
                : "Create a new user group"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="roles">Roles</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium block mb-1"
                    >
                      Group Name
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter group name"
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
                      placeholder="Enter group description"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="roles">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Assign Roles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`role-${role.id}`}
                          checked={selectedRoles.includes(role.id)}
                          onCheckedChange={() => handleToggleRole(role.id)}
                        />
                        <label
                          htmlFor={`role-${role.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {role.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="users">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Assign Users</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`user-${user.id}`}
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => handleToggleUser(user.id)}
                        />
                        <label
                          htmlFor={`user-${user.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {user.name} ({user.email})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              <X size={16} className="mr-2" /> Cancel
            </Button>
            <Button
              onClick={editingGroupId ? handleUpdateGroup : handleAddGroup}
            >
              <Save size={16} className="mr-2" />{" "}
              {editingGroupId ? "Update Group" : "Create Group"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Groups Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Groups</CardTitle>
          <CardDescription>
            Manage groups, their roles, and members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Members</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>{group.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {group.roles.map((roleId) => {
                        const role = roles.find((r) => r.id === roleId);
                        return role ? (
                          <span
                            key={roleId}
                            className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                          >
                            {role.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users size={16} className="mr-2" />
                      <span>{group.members.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditGroup(group)}
                        disabled={isAdding || !!editingGroupId}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteGroup(group.id)}
                        disabled={isAdding || !!editingGroupId}
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

export default GroupManagement;
