"use client";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const NewLeadForm = ({ userArr, createLead }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
    <div className="bg-[#161618] p-4 rounded-lg shadow col-span-4 md:col-span-3 my-2 sm:m-2 sm:my-4 sm:mx-auto md:m-4 md:my-6 md:mx-auto mx-auto">
      <form
        className="max-w-full mx-auto mt-8 grid grid-cols-6 gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true); // Set loading to true

          const formData = new FormData(e.target); // Get form data

          try {
            const data = await createLead(formData); // Call the server action

            if (data.status == "success") {
              toast({
                title: data.message,
              });
              e.target.reset(); // Reset the form after successful submission
            } else {
              toast({
                title: "Failed to save lead",
                description: data.message,
                variant: "destructive",
              });
            }
          } catch (error) {
            console.log("Error creating lead:", error);
            toast({
              title: "Something went wrong",
              variant: "destructive",
            });
          } finally {
            setLoading(false);
          }
        }}
      >
        <h2 className="text-2xl font-bold mb-4 col-span-3">Create New Lead</h2>

        {/* Personal Information Section */}
        <div className="col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4 col-span-1 md:col-span-1">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4 col-span-1 md:col-span-1">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4 col-span-1 md:col-span-1">
            <label htmlFor="phone" className="block mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4 col-span-1 md:col-span-1">
            <label htmlFor="owner" className="block mb-2">
              Owner
            </label>
            <select
              id="owner"
              name="owner"
              className="w-full px-3 py-2 border rounded text-black"
              required
            >
              {userArr.data.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Lead Details Section */}
        <h3 className="text-xl font-semibold mb-2 col-span-6">Lead Details</h3>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="status" className="block mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="w-full px-3 py-2 border rounded text-black"
            required
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal_sent">Proposal Sent</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="address" className="block mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full px-3 py-2 border rounded text-black"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="next_action" className="block mb-2">
            Next Action
          </label>
          <input
            type="text"
            id="next_action"
            name="next_action"
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="next_action_scheduled_on" className="block mb-2">
            Next Action Scheduled On
          </label>
          <input
            type="datetime-local"
            id="next_action_scheduled_on"
            name="next_action_scheduled_on"
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="notes" className="block mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            className="w-full px-3 py-2 border rounded text-black"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="site_address" className="block mb-2">
            Site Address
          </label>
          <input
            type="text"
            id="site_address"
            name="site_address"
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="solution_type" className="block mb-2">
            Solution Type
          </label>
          <input
            type="text"
            id="solution_type"
            name="solution_type"
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="date_of_installation" className="block mb-2">
            Date of Installation
          </label>
          <input
            type="date"
            id="date_of_installation"
            name="date_of_installation"
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="free_area_roof" className="block mb-2">
            Free Area Roof
          </label>
          <input
            type="number"
            id="free_area_roof"
            name="free_area_roof"
            className="w-full px-3 py-2 border rounded text-black"
            step="0.01"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="free_area_ground" className="block mb-2">
            Free Area Ground
          </label>
          <input
            type="number"
            id="free_area_ground"
            name="free_area_ground"
            className="w-full px-3 py-2 border rounded text-black"
            step="0.01"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="roof_type" className="block mb-2">
            Roof Type
          </label>
          <input
            type="text"
            id="roof_type"
            name="roof_type"
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="roof_angle" className="block mb-2">
            Roof Angle
          </label>
          <input
            type="number"
            id="roof_angle"
            name="roof_angle"
            className="w-full px-3 py-2 border rounded text-black"
            step="0.01"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="panel_capacity" className="block mb-2">
            Panel Capacity
          </label>
          <input
            type="number"
            id="panel_capacity"
            name="panel_capacity"
            className="w-full px-3 py-2 border rounded text-black"
            step="0.01"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="panel_quantity" className="block mb-2">
            Panel Quantity
          </label>
          <input
            type="number"
            id="panel_quantity"
            name="panel_quantity"
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="inverter_capacity" className="block mb-2">
            Inverter Capacity
          </label>
          <input
            type="number"
            id="inverter_capacity"
            name="inverter_capacity"
            className="w-full px-3 py-2 border rounded text-black"
            step="0.01"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="inverter_quantity" className="block mb-2">
            Inverter Quantity
          </label>
          <input
            type="number"
            id="inverter_quantity"
            name="inverter_quantity"
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <div className="mb-4 col-span-6 sm:col-span-3 md:col-span-2">
          <label htmlFor="price" className="block mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="w-full px-3 py-2 border rounded text-black"
            step="0.01"
          />
        </div>
        <div className="col-span-4">
          <button
            type="submit"
            className={`w-full sm:w-1/2 md:w-1/3 ${
              loading ? "bg-gray-500" : "bg-blue-500"
            } text-white px-4 py-2 rounded hover:bg-blue-600 sm:mt-4`}
            disabled={loading}
          >
            {loading ? "Creating Lead..." : "Create Lead"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewLeadForm;
