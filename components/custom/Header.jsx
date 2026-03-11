"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { ActionContext } from "@/context/ActionContext";
import Link from "next/link";
import SignInDialog from "@/components/custom/SignInDialog";
import { Download, Rocket, Github, ChevronLeft, Loader2, Home, FolderOpen, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function Header() {
  const { userDetail, setUserDetail, logout } = useContext(UserDetailContext);
  const { action, setAction, isLoading, error, handleAction } =
    useContext(ActionContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [githubDialog, setGithubDialog] = useState(false);
  const [repoName, setRepoName] = useState("astra-ai-project");
  const [isPrivate, setIsPrivate] = useState(false);
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

  const handleGithubClick = async () => {
    // Check for token in cookie
    const cookies = document.cookie.split(";").find((c) => c.includes("github_token"));
    
    if (!cookies) {
      // Redirect to GitHub OAuth
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      const redirectUri = `${window.location.origin}/api/auth/github/callback`;
      const scope = "repo,user";
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    } else {
      // Show repo name dialog
      setGithubDialog(true);
    }
  };

  const handlePushToGithub = async () => {
    try {
      // Get workspace code (you need to provide this from your workspace state)
      const workspaceCode = {
        // This should come from your workspace component
        // Example: "package.json": JSON.stringify(packageJson),
        // "src/App.jsx": appCode,
      };

      await handleAction("pushToGithub", {
        repoName,
        isPrivate,
        commitMessage: "Initial commit from Astra AI",
        workspaceCode,
      });

      setGithubDialog(false);
      // Show success message
      alert("✅ Successfully pushed to GitHub!");
    } catch (err) {
      alert("❌ Error pushing to GitHub: " + err.message);
    }
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

            {/* Export, Deploy & GitHub buttons - only show on workspace pages */}
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
                <Button
                  onClick={handleGithubClick}
                  className="text-white flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 hover:scale-105 group"
                  style={{
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="font-medium">Pushing...</span>
                    </>
                  ) : (
                    <>
                      <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span className="font-medium">Push to GitHub</span>
                    </>
                  )}
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

      {/* GitHub Push Dialog */}
      <Dialog open={githubDialog} onOpenChange={setGithubDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Push to GitHub</DialogTitle>
            <DialogDescription>
              Configure your repository details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Repository Name</label>
              <Input
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="astra-ai-project"
                className="mt-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="private"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="private" className="text-sm font-medium">
                Make repository private
              </label>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setGithubDialog(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePushToGithub}
                disabled={isLoading}
                className="text-white"
                style={{
                  background:
                    "linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)",
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Pushing...
                  </>
                ) : (
                  "Push to GitHub"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* SignInDialog */}
      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </>
  );
}

export default Header;