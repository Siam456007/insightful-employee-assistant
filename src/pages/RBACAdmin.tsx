
import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useRBAC } from "@/context/RBACContext";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";

// Create placeholder components for the RBAC admin sections
const UsersManagement = () => {
  const { users, groups, deleteUser } = useRBAC();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Users Management</h2>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Groups</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  {user.groups.map((groupId) => {
                    const group = groups.find((g) => g.id === groupId);
                    return group ? (
                      <span key={groupId} className="inline-block bg-secondary rounded-full px-2 py-1 text-xs mr-1">
                        {group.name}
                      </span>
                    ) : null;
                  })}
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="sm" className="h-8 text-blue-600">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-red-600" onClick={() => deleteUser(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RolesManagement = () => {
  const { roles, privileges } = useRBAC();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Roles Management</h2>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Privileges</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-t">
                <td className="px-4 py-3">{role.name}</td>
                <td className="px-4 py-3">{role.description}</td>
                <td className="px-4 py-3">
                  {role.privileges.map((privId) => {
                    const priv = privileges.find((p) => p.id === privId);
                    return priv ? (
                      <span key={privId} className="inline-block bg-secondary rounded-full px-2 py-1 text-xs mr-1">
                        {priv.name}
                      </span>
                    ) : null;
                  })}
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="sm" className="h-8 text-blue-600">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-red-600">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GroupsManagement = () => {
  const { groups, roles } = useRBAC();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Groups Management</h2>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Roles</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id} className="border-t">
                <td className="px-4 py-3">{group.name}</td>
                <td className="px-4 py-3">{group.description}</td>
                <td className="px-4 py-3">
                  {group.roles.map((roleId) => {
                    const role = roles.find((r) => r.id === roleId);
                    return role ? (
                      <span key={roleId} className="inline-block bg-secondary rounded-full px-2 py-1 text-xs mr-1">
                        {role.name}
                      </span>
                    ) : null;
                  })}
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="sm" className="h-8 text-blue-600">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-red-600">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PrivilegesManagement = () => {
  const { privileges } = useRBAC();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Privileges Management</h2>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Key</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {privileges.map((privilege) => (
              <tr key={privilege.id} className="border-t">
                <td className="px-4 py-3">{privilege.name}</td>
                <td className="px-4 py-3">{privilege.description}</td>
                <td className="px-4 py-3">
                  <code className="bg-secondary px-1 py-0.5 rounded">{privilege.key}</code>
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="sm" className="h-8 text-blue-600">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-red-600">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RBACAdmin = () => {
  const navigate = useNavigate();
  const { setActiveView } = useAppContext();
  const { hasPrivilege } = useRBAC();
  
  const currentUserId = "user_1"; // For demo purposes, using the admin user
  
  if (!hasPrivilege(currentUserId, "manage_users")) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="mb-4">You don't have permission to access this page.</p>
        <Button onClick={() => {
          setActiveView("home");
          navigate("/");
        }}>
          Return to Home
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => {
            setActiveView("home");
            navigate("/");
          }}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">RBAC Administration</h1>
      </div>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="users" asChild>
            <NavLink to="/rbac-admin" end>Users</NavLink>
          </TabsTrigger>
          <TabsTrigger value="groups" asChild>
            <NavLink to="/rbac-admin/groups">Groups</NavLink>
          </TabsTrigger>
          <TabsTrigger value="roles" asChild>
            <NavLink to="/rbac-admin/roles">Roles</NavLink>
          </TabsTrigger>
          <TabsTrigger value="privileges" asChild>
            <NavLink to="/rbac-admin/privileges">Privileges</NavLink>
          </TabsTrigger>
        </TabsList>
        
        <Routes>
          <Route path="/" element={<UsersManagement />} />
          <Route path="/groups" element={<GroupsManagement />} />
          <Route path="/roles" element={<RolesManagement />} />
          <Route path="/privileges" element={<PrivilegesManagement />} />
        </Routes>
      </Tabs>
    </div>
  );
};

export default RBACAdmin;
