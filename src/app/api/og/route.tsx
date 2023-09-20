import type { ServerRuntime } from "next";
import { NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";
import { StatusCodes } from "http-status-codes";

import { ogImageSchema } from "@/lib/validators/imageOg";
import type { OgImageParams } from "@/lib/validators/imageOg";

/**
 * Generate Open Graph image.
 * @param req - HTTP request object.
 * @returns ImageResponse - The generated image response.
 */
const generateOg = (req: Request): ImageResponse => {
  try {
    const url = new URL(req.url);
    const parsedValues = ogImageSchema.parse(
      Object.fromEntries(url.searchParams)
    ) as OgImageParams;
    const { title } = ogImageSchema.parse(parsedValues);

    const truncateString = (str: string, maxLength = 100) => {
      if (str.length > maxLength)
        return str.substring(0, maxLength - 3) + "...";
      return str;
    };

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f4",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            padding: "50px",
          }}
        >
          <svg
            version="1.0"
            viewBox="0 0 2745 2611"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
          >
            <g transform="translate(0 2611) scale(.1 -.1)">
              <path d="m13205 26104c-760-37-1247-86-1870-190-1989-331-3874-1080-5535-2198-2176-1465-3859-3501-4842-5856-486-1165-794-2408-908-3665-40-447-45-571-45-1150 1-593 8-755 56-1240 118-1206 426-2426 897-3555 1424-3414 4293-6102 7907-7410 1144-414 2395-686 3625-789 477-40 626-46 1235-46s758 6 1235 46c2404 201 4707 1008 6690 2343 2445 1647 4267 4017 5165 6721 337 1013 526 1978 612 3125 22 295 25 1271 5 1555-72 1026-213 1838-478 2755-674 2328-2053 4468-3945 6121-1293 1130-2805 2017-4439 2604-1290 463-2542 717-4025 816-152 10-1192 20-1340 13zm-5005-9389c0-1647 3-2995 8-2994 4 0 42 71 84 157 197 401 465 717 793 932 94 61 328 177 435 215 458 162 1156 196 1705 83 870-179 1507-680 1910-1503 224-458 363-956 444-1595 64-502 84-1195 50-1715-102-1548-586-2572-1486-3141-48-31-160-91-248-134-367-180-744-280-1255-336-228-25-839-26-1043-1-602 73-969 249-1223 586-95 127-209 363-260 540-3 8-7 12-9 9-3-2-30-215-60-474-31-258-58-479-61-491l-4-23h-1955-1955v155 155h470 470v6130 6130h-470-470v148c0 82 3 152 7 155 3 4 933 7 2065 7h2058v-2995zm11068-1867-3-153-592-3c-326-1-593-4-593-6 0-3 244-407 542-898s677-1117 842-1390c166-274 304-496 308-495 3 1 257 349 564 772 307 424 760 1049 1007 1390l449 620-1227 10-3 153-3 152h1281 1281l-3-152-3-153-895-10-223-315c-123-173-517-731-877-1240-359-509-757-1071-883-1250-127-178-232-332-234-340-2-9 431-699 967-1540 535-839 1164-1825 1398-2192l425-668h443 444v-155-155h-2865-2865v155 155h605c389 0 605 4 605 10 0 5-155 263-344 572-189 310-610 997-935 1528-324 531-594 965-600 965s-151-223-324-495c-1764-2784-1627-2566-1627-2574 0-3 254-6 565-6h565v-155-155l-1347 2-1348 3-3 153-3 152h568 568l500 788c275 433 755 1189 1067 1679 312 491 577 910 590 932l22 38-139 219c-76 121-323 512-550 869-226 358-661 1044-965 1525s-642 1015-750 1185l-196 310-499 5-500 5-3 153-3 152h2901 2901l-3-152z" />
              <path d="m9395 14425c-110-21-165-40-270-93-425-218-738-749-860-1458-62-358-60-293-60-2309 0-1716 1-1850 18-1985 63-507 214-881 457-1134 130-135 243-208 400-257 65-20 96-23 235-24 140 0 169 3 235 23 372 116 575 489 684 1254 82 573 100 1100 93 2743-5 1211-9 1387-43 1820-70 912-229 1309-564 1412-69 21-232 25-325 8z" />
            </g>
          </svg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 30,
              alignItems: "center",
              gap: 20,
              width: "90vw",
            }}
          >
            <div style={{ textAlign: "center", fontSize: "1.75rem" }}>
              {truncateString(title)}
            </div>
            <div style={{ fontWeight: 900, fontSize: "1.75rem" }}>
              On Buzzxstore
            </div>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 400,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to generate the image" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export const runtime: ServerRuntime = "edge";
export { generateOg as GET };
