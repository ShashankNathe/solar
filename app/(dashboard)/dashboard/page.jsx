import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const page = async () => {
  return (
    <div>
      <form action={logout}>
        <Button>Logout</Button>
      </form>
    </div>
  );
};

export default page;
