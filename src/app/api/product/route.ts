import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("product_id");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/v1/product?product_id=${id}`
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/v1/product`,
      body
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to create product", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/v1/product`,
      body
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to update product", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("product_id");

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/v1/product?product_id=${id}`
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to delete product", error: error.message },
      { status: 500 }
    );
  }
}
