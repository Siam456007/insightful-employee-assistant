import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleManagement from "./RoleManagement";
import PrivilegeManagement from "./PrivilegeManagement";
import GroupManagement from "./GroupManagement";
import UserManagement from "./UserManagement";
import { Shield, Users, User, Key } from "lucide-react";

const RBACAdmin = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Role-Based Access Control</h1>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger
              value="users"
              className="flex items-center justify-center gap-2"
            >
              <User size={16} />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger
              value="groups"
              className="flex items-center justify-center gap-2"
            >
              <Users size={16} />
              <span>Groups</span>
            </TabsTrigger>
            <TabsTrigger
              value="roles"
              className="flex items-center justify-center gap-2"
            >
              <Shield size={16} />
              <span>Roles</span>
            </TabsTrigger>
            <TabsTrigger
              value="privileges"
              className="flex items-center justify-center gap-2"
            >
              <Key size={16} />
              <span>Privileges</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="groups">
            <GroupManagement />
          </TabsContent>

          <TabsContent value="roles">
            <RoleManagement />
          </TabsContent>

          <TabsContent value="privileges">
            <PrivilegeManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RBACAdmin;
