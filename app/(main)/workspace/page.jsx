"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { MessagesContext } from "@/context/MessagesContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Loader2 } from "lucide-react";

function WorkspacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userDetail, isLoadingUser } = useContext(UserDetailContext);
  const { setMessages } = useContext(MessagesContext);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkSpace);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const prompt = searchParams.get("prompt");
    
    if (!prompt) {
      // If no prompt, redirect to workspaces
      router.push("/workspaces");
      return;
    }

    if (!userDetail || isLoadingUser) {
      return;
    }

    const createWorkspaceAndRedirect = async () => {
      try {
        setIsLoading(true);
        
        const msg = { role: "user", content: prompt };
        setMessages([msg]);

        const workspaceId = await CreateWorkspace({
          user: userDetail._id,
          messages: [msg],
          title: prompt.slice(0, 50) + (prompt.length > 50 ? "..." : ""),
          description: prompt,
        });

        // Redirect to the actual workspace
        router.replace(`/workspace/${workspaceId}`);
      } catch (error) {
        console.error("Error creating workspace:", error);
        // If there's an error, redirect to workspaces
        router.push("/workspaces");
      } finally {
        setIsLoading(false);
      }
    };

    createWorkspaceAndRedirect();
  }, [searchParams, userDetail, isLoadingUser, router, setMessages, CreateWorkspace]);

  return (
    <>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(0, 0, 0)"
        gradientBackgroundEnd="rgb(10, 10, 30)"
        firstColor="59, 130, 246"
        secondColor="139, 92, 246"
        thirdColor="96, 165, 250"
        fourthColor="147, 51, 234"
        fifthColor="79, 70, 229"
        pointerColor="99, 102, 241"
        size="80%"
        blendingValue="hard-light"
        interactive={true}
        containerClassName="fixed inset-0 -z-10"
      />

      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto" />
          <h2 className="text-2xl font-semibold text-white">
            Creating your workspace...
          </h2>
          <p className="text-gray-400">
            Setting up your AI-powered development environment
          </p>
        </div>
      </div>
    </>
  );
}

export default WorkspacePage;
