import { getLeadById } from "@/app/actions/leads";
import { NextResponse } from "next/server";

// New GET request to fetch lead by ID
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get("id");

  if (!leadId) {
    return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
  }

  // Fetch lead from database or service
  const lead = await getLeadById(leadId); // Assume this function is defined elsewhere

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(lead);
}
