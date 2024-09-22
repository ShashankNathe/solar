"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

const formatStatus = (status) => {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getStatusBadge = (status) => {
  const statusStyles = {
    new: "bg-blue-200",
    contacted: "bg-yellow-200",
    qualified: "bg-green-200",
    proposal_sent: "bg-orange-200",
    won: "bg-teal-200",
    lost: "bg-red-200",
  };
  return (
    <span
      className={`badge ${statusStyles[status]} py-1 px-2 rounded-lg text-black`}
    >
      {formatStatus(status)}
    </span>
  );
};

const LeadsTable = ({ leads, deleteLead }) => {
  const { toast } = useToast();
  async function handleDelete(id) {
    await deleteLead(id);
    toast({
      title: "Lead deleted successfully",
    });
  }

  return (
    <div>
      <Table className="text-center">
        <TableCaption>A list of your leads.</TableCaption>
        <TableHeader>
          <TableRow className="text-center">
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Phone</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead className="text-center">Next Action</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.data.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                <Link href={`/leads/${lead.id}`}>{lead.name}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${lead.id}`}>{lead.phone}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${lead.id}`}>{lead.description}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${lead.id}`}>{lead.next_action}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${lead.id}`}>
                  {getStatusBadge(lead.status)}
                </Link>
              </TableCell>
              <TableCell className="text-right flex items-end justify-end">
                <form
                  action={(e) => {
                    toast({
                      title: "Delete Lead.",
                      description: "Are you sure you want to delete this lead.",
                      action: (
                        <ToastAction
                          altText="Delete"
                          onClick={() => handleDelete(lead.id)}
                        >
                          Delete
                        </ToastAction>
                      ),
                    });
                  }}
                >
                  <Button type="submit">
                    <Trash
                      type="submit"
                      className="text-red-600 cursor-pointer"
                    />
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadsTable;
