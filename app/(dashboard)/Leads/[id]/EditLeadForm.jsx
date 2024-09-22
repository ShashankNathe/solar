"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const EditLeadForm = ({ lead, updateLead }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target); // Get form data
        formData.set("id", lead.id);

        try {
          const data = await updateLead(formData); // Call the server action
          if (data.status == "success") {
            toast({
              title: "Lead updated successfully",
            });
          } else {
            toast({
              title: "Failed to update lead",
              description: data.message,
              variant: "destructive",
            });
          }
        } catch (error) {
          console.log("Error updating lead:", error);
          toast({
            title: "Something went wrong",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }}
    >
      <Card className="bg-[#161618] text-white border-0">
        <CardHeader>
          <CardTitle>Lead Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={lead.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={lead.email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" defaultValue={lead.phone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                defaultValue={lead.status}
                // onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={lead.description || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              defaultValue={lead.address || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site_address">Site Address</Label>
            <Textarea
              id="site_address"
              name="site_address"
              defaultValue={lead.site_address || ""}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="next_action">Next Action</Label>
              <Input
                id="next_action"
                name="next_action"
                defaultValue={lead.next_action || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="next_action_scheduled_on">
                Next Action Scheduled On
              </Label>
              <Input
                id="next_action_scheduled_on"
                name="next_action_scheduled_on"
                type="datetime-local"
                defaultValue={lead.next_action_scheduled_on || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solution_type">Solution Type</Label>
              <Input
                id="solution_type"
                name="solution_type"
                defaultValue={lead.solution_type || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_of_installation">Date of Installation</Label>
              <Input
                id="date_of_installation"
                name="date_of_installation"
                type="date"
                defaultValue={lead.date_of_installation || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="free_area_roof">Free Area Roof</Label>
              <Input
                id="free_area_roof"
                name="free_area_roof"
                type="number"
                defaultValue={lead.free_area_roof || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="free_area_ground">Free Area Ground</Label>
              <Input
                id="free_area_ground"
                name="free_area_ground"
                type="number"
                defaultValue={lead.free_area_ground || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roof_type">Roof Type</Label>
              <Input
                id="roof_type"
                name="roof_type"
                defaultValue={lead.roof_type || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roof_angle">Roof Angle</Label>
              <Input
                id="roof_angle"
                name="roof_angle"
                type="number"
                defaultValue={lead.roof_angle || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="panel_capacity">Panel Capacity</Label>
              <Input
                id="panel_capacity"
                name="panel_capacity"
                type="number"
                defaultValue={lead.panel_capacity || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="panel_quantity">Panel Quantity</Label>
              <Input
                id="panel_quantity"
                name="panel_quantity"
                type="number"
                defaultValue={lead.panel_quantity || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inverter_capacity">Inverter Capacity</Label>
              <Input
                id="inverter_capacity"
                name="inverter_capacity"
                type="number"
                defaultValue={lead.inverter_capacity || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inverter_quantity">Inverter Quantity</Label>
              <Input
                id="inverter_quantity"
                name="inverter_quantity"
                type="number"
                defaultValue={lead.inverter_quantity || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                defaultValue={lead.price || ""}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" defaultValue={lead.notes || ""} />
          </div>
        </CardContent>
      </Card>
      <Button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Lead"}
      </Button>
    </form>
  );
};

export default EditLeadForm;
