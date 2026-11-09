import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { initialEnquiries, Enquiry } from "@/lib/data";

const DATA_DIR = path.join(process.cwd(), "data");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");

function getEnquiries(): Enquiry[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ENQUIRIES_FILE)) {
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(initialEnquiries, null, 2), "utf8");
      return initialEnquiries;
    }
    const raw = fs.readFileSync(ENQUIRIES_FILE, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading enquiries:", e);
    return initialEnquiries;
  }
}

function saveEnquiries(data: Enquiry[]) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function GET() {
  const enquiries = getEnquiries();
  return NextResponse.json({ success: true, enquiries });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, projectType, location, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (fullName, email, message)" },
        { status: 400 }
      );
    }

    const current = getEnquiries();
    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      phone: String(phone || "").trim(),
      projectType: String(projectType || "General Enquiry").trim(),
      location: String(location || "Dubai, UAE").trim(),
      message: String(message).trim(),
      status: "New",
      createdAt: new Date().toISOString(),
    };

    const updated = [newEnquiry, ...current];
    saveEnquiries(updated);

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry: newEnquiry,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process enquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing id or status" },
        { status: 400 }
      );
    }

    const current = getEnquiries();
    const idx = current.findIndex((e) => e.id === id);
    if (idx === -1) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }

    current[idx].status = status;
    saveEnquiries(current);

    return NextResponse.json({ success: true, enquiry: current[idx] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }

    const current = getEnquiries();
    const filtered = current.filter((e) => e.id !== id);
    saveEnquiries(filtered);

    return NextResponse.json({ success: true, message: "Enquiry deleted" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

