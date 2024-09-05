import React from "react";

const NewLeadForm = () => {
  return (
    <div className="max-w-md bg-[#161618] p-4 rounded-lg shadow col-span-4 md:col-span-3 my-2 sm:m-2 sm:my-4 sm:mx-auto md:m-4 md:my-6 md:mx-auto mx-auto">
      <form className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Create New Lead</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="company" className="block mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Lead
        </button>
      </form>
    </div>
  );
};

const Page = () => {
  return (
    <div className="container mx-auto px-4">
      <NewLeadForm />
    </div>
  );
};

export default Page;
