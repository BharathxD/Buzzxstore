import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import { string, ZodError } from "zod";

import database from "@/lib/database";

/**
 * Retrieves products based on the provided query parameter.
 *
 * @param {NextRequest} req - The NextRequest object containing the request details.
 * @returns {Promise<NextResponse>} A NextResponse object containing the search results.
 */
const getProducts = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const url = new URL(req.url);
    // Parse the query parameter as a string using Zod
    const queryParam = string().parse(url.searchParams.get("query"));

    // Fetch products from the database that match the query parameter
    const products = await database.product.findMany({
      where: {
        name: {
          contains: queryParam,
          mode: "insensitive",
        },
      },
    });

    // Return a JSON response with a 200 OK status code
    return NextResponse.json(products, { status: StatusCodes.OK });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      // Return a JSON response with a 400 Bad Request status code for invalid request parameters
      return NextResponse.json(
        { message: `Invalid request parameters: ${error.message}` },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    // Return a JSON response with a 500 Internal Server Error status code for other errors
    return NextResponse.json(
      {
        message:
          "Something went wrong. The products cannot be retrieved at the moment.",
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export { getProducts as GET };
