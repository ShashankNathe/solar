"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const RegisterForm = ({ register }) => {
  const { toast } = useToast();
  const router = useRouter();
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const name = formData.get("name");
          const email = formData.get("email");
          const password = formData.get("password");
          try {
            const response = await register(name, email, password);
            console.log(response);
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
              router.push("/onboarding");
            }
          } catch (error) {
            console.error("Registration failed:", error);
            toast({
              title: "Registration failed",
              description: "An unexpected error occurred",
              variant: "destructive",
            });
          }
        }}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
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
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address"
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
            minLength="8"
            title="Password must be at least 8 characters long"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
