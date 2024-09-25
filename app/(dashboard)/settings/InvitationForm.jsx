"use client";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const InvitationForm = ({ createInvitation, invited_by, org_id }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
    <Card className="bg-[#161618] border-0 mt-4 text-white">
      <CardHeader>Invite Team members</CardHeader>
      <CardContent>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const formData = new FormData(e.target);

            try {
              const data = await createInvitation(
                formData.get("email"),
                org_id,
                invited_by
              );
              if (data.status == "success") {
                toast({
                  title: "Invite created successfully",
                });
              } else {
                toast({
                  title: "Failed to invite",
                  description: data.message,
                  variant: "destructive",
                });
              }
            } catch (error) {
              console.log("Error updating task:", error);
              toast({
                title: "Something went wrong",
                variant: "destructive",
              });
            } finally {
              setLoading(false);
            }
          }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" required />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Inviting..." : "Invite"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvitationForm;
