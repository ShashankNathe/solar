"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const OnboardingForm = ({ createOrganization }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const name = formData.get("name");
        try {
          const response = await createOrganization(name);
          if (response.status === "error") {
            toast({
              title: "Registration failed",
              description: response.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Registration successful",
              description: "Welcome to Solar CRM!",
              variant: "success",
            });
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Registration failed:", error);
          toast({
            title: "Registration failed",
            description: "An unexpected error occurred",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Organization Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Organization"}
      </button>
    </form>
  );
};

export default OnboardingForm;
