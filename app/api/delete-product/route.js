import { NextResponse } from "next/server";

export async function DELETE(req) {
  const token = req.headers.get("Authorization");
  const id = req.headers.get("id");

  const base_url = `https://2rzeoqz8s6.execute-api.us-east-1.amazonaws.com/prod/api/products/${id}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(base_url, requestOptions);

    // Extract the actual data from the response
    // const data = await response.json();

    if (response?.status === 400) {
      return NextResponse.json({
        status: response?.status,
        message: "Operation unsuccessful",
        data: response,
      });
    }

    return NextResponse.json({
      status: response?.status,
      message: "Operation successfull",
      data: response,
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
