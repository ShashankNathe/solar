import React from "react";

const NewLeadForm = () => {
  return (
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
