
import React, { useState } from "react";
import { useRBAC } from "@/context/RBACContext";
import { RBACUser } from "@/types/rbac";
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
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash, Plus, Save, X, Shield } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const UserManagement = () => {
  const {
    users,
    groups,
    roles,
    addUser,
    updateUser,
    deleteUser,
    getUserRoles,
    getUserPrivileges,
  } = useRBAC();

  const [isAdding, setIsAdding] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("details");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedDirectRoles, setSelectedDirectRoles] = useState<string[]>([]);

  const [selectedUserForDetails, setSelectedUserForDetails] = useState<
    string | null
  >(null);

  const resetForm = () => {
    setName("");
    setEmail("");
    setSelectedGroups([]);
    setSelectedDirectRoles([]);
    setIsAdding(false);
    setEditingUserId(null);
    setActiveTab("details");
  };

  const handleAddUser = () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    const id = addUser({
      name,
      email,
      groups: selectedGroups,
      directRoles:
        selectedDirectRoles.length > 0 ? selectedDirectRoles : undefined,
    });

    toast({
      title: "Success",
      description: `User "${name}" has been created`,
    });

    resetForm();
  };

  const handleUpdateUser = () => {
    if (!editingUserId) return;

    if (!name.trim() || !email.trim()) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    updateUser(editingUserId, {
      name,
      email,
      groups: selectedGroups,
      directRoles:
        selectedDirectRoles.length > 0 ? selectedDirectRoles : undefined,
    });

    toast({
      title: "Success",
      description: `User "${name}" has been updated`,
    });

    resetForm();
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete the user "${user.name}"?`
    );
    if (!confirmed) return;

    const success = deleteUser(userId);

    if (success) {
      toast({
        title: "Success",
        description: `User "${user.name}" has been deleted`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  const handleEditUser = (user: RBACUser) => {
    setEditingUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setSelectedGroups([...user.groups]);
    setSelectedDirectRoles(user.directRoles ? [...user.directRoles] : []);
  };

  const handleToggleGroup = (groupId: string) => {
    setSelectedGroups((prev) => {
      if (prev.includes(groupId)) {
        return prev.filter((id) => id !== groupId);
      } else {
        return [...prev, groupId];
      }
    });
  };

  const handleToggleDirectRole = (roleId: string) => {
    setSelectedDirectRoles((prev) => {
      if (prev.includes(roleId)) {
        return prev.filter((id) => id !== roleId);
      } else {
        return [...prev, roleId];
      }
    });
  };

  const handleViewUserDetails = (userId: string) => {
    setSelectedUserForDetails(userId);
  };

  const closeUserDetails = () => {
    setSelectedUserForDetails(null);
  };

  const getUserGroupNames = (user: RBACUser) => {
    return user.groups
      .map((groupId) => groups.find((g) => g.id === groupId)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        {!isAdding && !editingUserId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus size={16} className="mr-2" /> Add New User
          </Button>
        )}
      </div>

      {/* Add/Edit User Form */}
      {(isAdding || editingUserId) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingUserId ? "Edit User" : "Add New User"}
            </CardTitle>
            <CardDescription>
              {editingUserId
                ? "Update user details and group assignments"
                : "Create a new user"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="details">User Details</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
                <TabsTrigger value="direct-roles">Direct Roles</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium block mb-1"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter user's full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium block mb-1"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter user's email address"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="groups">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Assign to Groups</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Users inherit roles and privileges from their groups
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {groups.map((group) => (
                      <div
                        key={group.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`group-${group.id}`}
                          checked={selectedGroups.includes(group.id)}
                          onCheckedChange={() => handleToggleGroup(group.id)}
                        />
                        <label
                          htmlFor={`group-${group.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {group.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="direct-roles">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Assign Direct Roles</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    These roles are assigned directly to the user, in addition
                    to roles from groups
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`role-${role.id}`}
                          checked={selectedDirectRoles.includes(role.id)}
                          onCheckedChange={() =>
                            handleToggleDirectRole(role.id)
                          }
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
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              <X size={16} className="mr-2" /> Cancel
            </Button>
            <Button onClick={editingUserId ? handleUpdateUser : handleAddUser}>
              <Save size={16} className="mr-2" />{" "}
              {editingUserId ? "Update User" : "Create User"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* User Details View */}
      {selectedUserForDetails && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>User Details</CardTitle>
              <CardDescription>
                Roles and privileges for the selected user
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={closeUserDetails}>
              <X size={16} className="mr-2" /> Close
            </Button>
          </CardHeader>
          <CardContent>
            {(() => {
              const user = users.find((u) => u.id === selectedUserForDetails);
              if (!user) return <p>User not found</p>;

              const userRoles = getUserRoles(user.id);
              const userPrivileges = getUserPrivileges(user.id);

              return (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Group Memberships
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {user.groups.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Not a member of any groups
                        </p>
                      ) : (
                        user.groups.map((groupId) => {
                          const group = groups.find((g) => g.id === groupId);
                          return group ? (
                            <Badge key={groupId} variant="outline">
                              {group.name}
                            </Badge>
                          ) : null;
                        })
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Roles</h4>
                    <div className="flex flex-wrap gap-2">
                      {userRoles.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No roles assigned
                        </p>
                      ) : (
                        userRoles.map((role) => (
                          <Badge
                            key={role.id}
                            className="bg-primary/20 text-primary border-primary/20"
                          >
                            {role.name}
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Privileges</h4>
                    <div className="flex flex-wrap gap-2">
                      {userPrivileges.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No privileges available
                        </p>
                      ) : (
                        userPrivileges.map((privilege) => (
                          <Badge key={privilege.id} variant="secondary">
                            {privilege.name}
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage users and their group assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Groups</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead className="w-[160px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getUserGroupNames(user) || "None"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => handleViewUserDetails(user.id)}
                    >
                      <Shield size={12} className="mr-1" /> View Roles &
                      Privileges
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditUser(user)}
                        disabled={isAdding || !!editingUserId}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={isAdding || !!editingUserId}
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

export default UserManagement;
