"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateInvitationStatusById } from "@/app/actions/invitations";
import { revalidatePath } from "next/cache";
import { useToast } from "@/hooks/use-toast";

const InvitationCard = ({ invitation }) => {
  const router = useRouter();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (status) => {
    try {
      if (status === "accepted") {
        setIsAccepting(true);
      } else {
        setIsRejecting(true);
      }

      const data = await updateInvitationStatusById(
        invitation.id,
        status,
        invitation.email,
        invitation.organization_id
      );
      if (data.status == "error") {
        toast({
          title: "Something went wrong",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      } else {
        if (status === "accepted") {
          toast({
            title: "Invitation accepted",
            description: "Welcome to Solar CRM",
          });
        } else {
          toast({
            title: "Invitation rejected",
            description: "Set up a new organization",
          });
        }
      }
      router.refresh();
    } catch (error) {
      console.log("Error updating invitation status:", error);
    } finally {
      setIsAccepting(false);
      setIsRejecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Invitation Found
        </h2>
        <p className="mb-4 text-gray-600">
          You have been invited to join an organization:{" "}
          <strong>{invitation.organization_name}</strong>
        </p>
        <div className="flex justify-between">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit("accepted");
            }}
          >
            <button
              type="submit"
              disabled={isAccepting || isRejecting}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {isAccepting ? "Accepting..." : "Accept Invitation"}
            </button>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit("declined");
            }}
          >
            <button
              type="submit"
              disabled={isAccepting || isRejecting}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
            >
              {isRejecting ? "Rejecting..." : "Delete & Set Up New Org"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
