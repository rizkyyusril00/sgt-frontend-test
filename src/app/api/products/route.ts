import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search") || "";

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/v1/products?page=${page}&limit=${limit}&search=${search}`
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("GET Products API Error:", error.message);
    return NextResponse.json(
      {
        message: "Failed to fetch products",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
