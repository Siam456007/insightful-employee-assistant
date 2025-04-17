
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <div className="flex items-center gap-2 px-6 py-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-assistant to-assistant-lighter flex items-center justify-center">
          <span className="text-white font-semibold">IA</span>
        </div>
        <h1 className="font-bold text-xl text-assistant">InSight Assistant</h1>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} InSight Assistant. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;
