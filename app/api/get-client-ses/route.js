import { NextResponse } from "next/server";
import { idText } from "typescript";

export async function GET(req) {
  // search for id in header

  const id = req.headers.get("vendor-id");
  const base_url = `https://iirtd33w1b.execute-api.us-east-1.amazonaws.com/prod/api/clients/verification/${id}`;

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(base_url, requestOptions);

    // Extract the actual data from the response
    const data = await response?.json();

    if (response?.status === 400) {
      return NextResponse.json({
        status: response?.status,
        message: "Operation unsuccessful",
        data: data,
      });
    }

    return NextResponse.json({
      status: response?.status,
      message: "Operation successfull",
      data: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "An error occurred during the request",
        error: error.message, // Extract the error message
      },
      { status: 500 }
    );
  }
}
