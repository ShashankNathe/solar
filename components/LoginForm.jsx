"use client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

const LoginForm = ({ login }) => {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");
        try {
          const response = await login(email, password);
          if (response.status === "error") {
            toast({
              title: "Login failed",
              description: "Invalid username or password",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Login successful",
              description: "Welcome back!",
              variant: "success",
            });
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Registration failed:", error);
          toast({
            title: "Login failed",
            description: "An unexpected error occurred",
            variant: "destructive",
          });
        }
      }}
    >
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
