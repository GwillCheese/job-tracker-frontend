import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request) {
  try {
    const userId = getUserFromRequest(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const companyName = searchParams.get("companyName");
    const jobTitle = searchParams.get("jobTitle");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (Number.isNaN(page) || page < 1) {
      return NextResponse.json(
        { message: "Page must be a positive integer" },
        { status: 400 }
      );
    }

    if (Number.isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { message: "Limit must be a positive integer" },
        { status: 400 }
      );
    }

    const filter = { userId };
    if (status) {
      const allowedStatuses = ["Applied", "Interview", "Rejected", "Offer"];
      if (!allowedStatuses.includes(status)) {
        return NextResponse.json(
          { message: "Invalid status value" },
          { status: 400 }
        );
      }
      filter.status = status;
    }

    if (companyName) {
      filter.companyName = { contains: companyName, mode: "insensitive" };
    }

    if (jobTitle) {
      filter.jobTitle = { contains: jobTitle, mode: "insensitive" };
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const [jobs, total] = await Promise.all([
      prisma.application.findMany({
        where: filter,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.application.count({ where: filter }),
    ]);

    return NextResponse.json({
      data: jobs,
      page,
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
    });
  } catch (error) {
    console.error("Get jobs error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const userId = getUserFromRequest(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { companyName, jobTitle, status } = await request.json();

    if (!companyName || !jobTitle || !status) {
      return NextResponse.json(
        { message: "companyName, jobTitle, and status are required" },
        { status: 400 }
      );
    }

    const allowedStatuses = ["Applied", "Interview", "Rejected", "Offer"];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }

    const job = await prisma.application.create({
      data: {
        companyName,
        jobTitle,
        status,
        userId,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Create job error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
