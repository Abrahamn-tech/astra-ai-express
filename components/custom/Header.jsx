"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { ActionContext } from "@/context/ActionContext";
import Link from "next/link";
import SignInDialog from "@/components/custom/SignInDialog";
import { Download, Rocket, ChevronLeft, Home, FolderOpen } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { userDetail, setUserDetail, logout } = useContext(UserDetailContext);
  const { setAction, isLoading } = useContext(ActionContext);
  const [openDialog, setOpenDialog] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const isWorkspace = path?.includes("workspace");

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const onActionBtn = (actionType) => {
    setAction({
      actionType: actionType,
      timeStamp: Date.now(),
    });
  };

  return (
    <>
      <div className="p-4 flex justify-between items-center">
        {/* Logo + Text - Hide on workspace */}
        {!isWorkspace && (
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <Image src="/logo.png" alt="Astra Logo" width={30} height={30} />
            <div className="flex flex-col">
              <span className="font-semibold">Astra AI</span>
              <span className="text-xs font-normal text-white-400 -mt-1">
                formerly known as MERN AI
              </span>
            </div>
          </Link>
        )}

        {/* Back to Home Button - Show only on workspace */}
        {isWorkspace && (
          <Button
            variant="outline"
            onClick={handleBackToHome}
            className="flex items-center gap-2 border border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 transition-all duration-300 shadow-lg hover:shadow-cyan-400/20 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </Button>
        )}

        {/* If user not logged in → show auth buttons */}
        {!userDetail?.name && !isWorkspace && (
          <div className="flex gap-3">
            <Link href="/auth">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:border-white hover:text-white cursor-pointer"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button
                className="text-white cursor-pointer"
                style={{
                  background: "linear-gradient(90deg, #3b82f6 0%, #1e40af 100%)",
                }}
              >
                Get Started
              </Button>
            </Link>
          </div>
        )}

        {/* If user is logged in → show navigation and action buttons */}
        {userDetail?.name && (
          <>
            {/* Navigation Links - Hide on workspace */}
            {!isWorkspace && (
              <div className="hidden md:flex items-center gap-4 mr-6">
                <Link href="/workspaces" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  Workspaces
                </Link>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </div>
            )}

            {/* Export & Deploy buttons - only show on workspace pages */}
            {isWorkspace && (
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={() => onActionBtn("export")}
                  className="flex items-center gap-2 cursor-pointer border border-gray-700 text-gray-300 hover:border-emerald-500 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 group"
                  disabled={isLoading}
                >
                  <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Export</span>
                </Button>
                <Button
                  onClick={() => onActionBtn("deploy")}
                  className="text-white flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 group"
                  style={{
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #1e40af 50%, #1e3a8a 100%)",
                  }}
                  disabled={isLoading}
                >
                  <Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span className="font-medium">Deploy</span>
                </Button>
              </div>
            )}

            {/* Profile dropdown - Icon only on workspace, full profile elsewhere */}
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image
                    src={userDetail?.picture || "/default-avatar.png"}
                    alt={userDetail?.name}
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                  {!isWorkspace && (
                    <span className="font-xs">{userDetail?.name}</span>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  {userDetail?.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>

      {/* SignInDialog */}
      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </>
  );
}

export default Header;
