import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();

  const base_url = `https://iirtd33w1b.execute-api.us-east-1.amazonaws.com/prod/api/client-login`;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(payload);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(base_url, requestOptions);

    // Extract the actual data from the response
    const data = await response?.json();

    if (response?.status === 400) {
      return NextResponse.json({
        status: response?.status,
        message: "Login unsuccessful",
        data: data,
      });
    }

    return NextResponse.json({
      status: response?.status,
      message: "Login successfull",
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
