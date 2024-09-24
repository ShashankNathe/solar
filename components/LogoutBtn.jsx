import { logout } from "@/app/actions/auth";
import React from "react";

const LogoutBtn = () => {
  return (
    <form action={logout}>
      <button type="submit">Logout</button>
    </form>
  );
};

export default LogoutBtn;
