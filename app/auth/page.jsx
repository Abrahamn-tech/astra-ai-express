"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { User, Lock, Loader2, Chrome, ArrowRight, Sparkles, Zap, Shield, Code2 } from "lucide-react";
import axios from "axios";
import Link from "next/link";

export default function AuthPage() {
  const { setUserDetail } = React.useContext(UserDetailContext);
  const CreateUser = useAction(api.users.CreateUser);
  const GoogleLogin = useAction(api.users.GoogleLogin);
  const LoginWithUsername = useAction(api.users.LoginWithUsername);
  const router = useRouter();

  const [tab, setTab] = useState("signin");
  const [authMethod, setAuthMethod] = useState("google");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check for pending prompt on component mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const pendingPrompt = sessionStorage.getItem("pendingPrompt");
      if (pendingPrompt) {
        console.log("Found pending prompt:", pendingPrompt);
      }
    }
  }, []);

  const DEFAULT_USER_IMAGE = "/user.jpg";

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const user = userInfo.data;

        const userId = await GoogleLogin({
          name: user?.name,
          email: user?.email,
          picture: user?.picture || DEFAULT_USER_IMAGE,
          uid: uuidv4(),
        });

        const userWithId = {
          ...user,
          picture: user?.picture || DEFAULT_USER_IMAGE,
          _id: userId,
        };

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userWithId));
        }

        setUserDetail(userWithId);
        
        // Check for pending prompt and redirect accordingly
        if (typeof window !== "undefined") {
          const pendingPrompt = sessionStorage.getItem("pendingPrompt");
          if (pendingPrompt) {
            // Clear the pending prompt
            sessionStorage.removeItem("pendingPrompt");
            // Create workspace with the pending prompt
            router.push(`/workspace?prompt=${encodeURIComponent(pendingPrompt)}`);
          } else {
            router.push("/workspaces");
          }
        } else {
          router.push("/workspaces");
        }
      } catch (err) {
        console.error("Google login error:", err);
        setError(err.message || "Google sign-in failed");
      } finally {
        setLoading(false);
      }
    },
    onError: (errorResponse) => {
      setError("Google sign-in failed");
      console.log(errorResponse);
    },
  });

  const handleUsernameAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (tab === "signup") {
      if (!username || !password || !name) {
        setError("Please fill in all fields");
        return;
      }

      if (username.length < 3) {
        setError("Username must be at least 3 characters");
        return;
      }

      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        setError("Username can only contain letters, numbers, and underscores");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      try {
        setLoading(true);
        const generatedEmail = `${username}@astra-local.app`;

        const createdUser = await CreateUser({
          name,
          email: generatedEmail,
          username,
          picture: DEFAULT_USER_IMAGE,
          uid: uuidv4(),
          password,
          authMethod: "username",
        });

        const userWithId = {
          name,
          email: generatedEmail,
          username,
          picture: DEFAULT_USER_IMAGE,
          _id: createdUser,
        };

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userWithId));
        }

        setUserDetail(userWithId);
        
        // Check for pending prompt and redirect accordingly
        if (typeof window !== "undefined") {
          const pendingPrompt = sessionStorage.getItem("pendingPrompt");
          if (pendingPrompt) {
            // Clear the pending prompt
            sessionStorage.removeItem("pendingPrompt");
            // Create workspace with the pending prompt
            router.push(`/workspace?prompt=${encodeURIComponent(pendingPrompt)}`);
          } else {
            router.push("/workspaces");
          }
        } else {
          router.push("/workspaces");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      if (!username || !password) {
        setError("Please fill in all fields");
        return;
      }

      try {
        setLoading(true);
        const user = await LoginWithUsername({ username, password });

        const userWithPicture = {
          ...user,
          picture: user.picture || DEFAULT_USER_IMAGE,
        };

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userWithPicture));
        }

        setUserDetail(userWithPicture);
        
        // Check for pending prompt and redirect accordingly
        if (typeof window !== "undefined") {
          const pendingPrompt = sessionStorage.getItem("pendingPrompt");
          if (pendingPrompt) {
            // Clear the pending prompt
            sessionStorage.removeItem("pendingPrompt");
            // Create workspace with the pending prompt
            router.push(`/workspace?prompt=${encodeURIComponent(pendingPrompt)}`);
          } else {
            router.push("/workspaces");
          }
        } else {
          router.push("/workspaces");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(5, 8, 25)"
        gradientBackgroundEnd="rgb(10, 15, 40)"
        firstColor="59, 130, 246"
        secondColor="139, 92, 246"
        thirdColor="34, 211, 238"
        fourthColor="124, 58, 237"
        fifthColor="56, 189, 248"
        pointerColor="103, 232, 249"
        size="80%"
        blendingValue="hard-light"
        interactive={true}
        containerClassName="fixed inset-0 -z-10"
      />

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Features */}
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Welcome to Astra AI
              </h1>
              <p className="text-xl text-gray-300">
                Transform your ideas into production-ready applications with the power of AI
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Sparkles className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">AI-Powered Code Generation</h3>
                  <p className="text-gray-400">Generate complete applications from natural language descriptions</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Real-time Development</h3>
                  <p className="text-gray-400">Live preview and instant code editing with Sandpack</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Shield className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Secure & Reliable</h3>
                  <p className="text-gray-400">Enterprise-grade security with OAuth authentication</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Code2 className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">GitHub Integration</h3>
                  <p className="text-gray-400">Seamlessly push your projects to GitHub repositories</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link href="/auth" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {tab === "signin" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-400">
                {tab === "signin" 
                  ? "Sign in to continue building amazing apps" 
                  : "Start your journey with AI-powered development"
                }
              </p>
            </div>

            {/* Tab Selection */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setTab("signin")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  tab === "signin"
                    ? "bg-blue-500 text-white border-2 border-blue-500"
                    : "bg-gray-900 text-gray-400 border-2 border-gray-800 hover:border-gray-700"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab("signup")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  tab === "signup"
                    ? "bg-purple-500 text-white border-2 border-purple-500"
                    : "bg-gray-900 text-gray-400 border-2 border-gray-800 hover:border-gray-700"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Auth Method Selection */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setAuthMethod("google")}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
                  authMethod === "google"
                    ? "bg-gray-900 text-white border-2 border-blue-500"
                    : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Chrome className="h-4 w-4" />
                  Google
                </div>
              </button>
              <button
                onClick={() => setAuthMethod("username")}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
                  authMethod === "username"
                    ? "bg-gray-900 text-white border-2 border-purple-500"
                    : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <User className="h-4 w-4" />
                  Username
                </div>
              </button>
            </div>

            {/* Google Auth */}
            {authMethod === "google" && (
              <div className="space-y-4">
                <Button
                  onClick={() => googleLogin()}
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <div className="flex items-center gap-3">
                      <Chrome className="h-5 w-5" />
                      Continue with Google
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </Button>
              </div>
            )}

            {/* Username Auth */}
            {authMethod === "username" && (
              <form onSubmit={handleUsernameAuth} className="space-y-4">
                {tab === "signup" && (
                  <>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        disabled={loading}
                      />
                    </div>
                  </>
                )}
                
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    disabled={loading}
                  />
                </div>
                
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : tab === "signup" ? (
                    "Create Account"
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-xs text-center text-gray-500">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
