import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const secret = process.env.WORDPRESS_REVALIDATE_SECRET;
  if (!secret || secret.length < 32)
    return Response.json(
      { error: "Revalidation is not configured" },
      { status: 503 },
    );
  const provided =
    request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  if (
    Buffer.byteLength(provided) !== Buffer.byteLength(secret) ||
    !timingSafeEqual(Buffer.from(provided), Buffer.from(secret))
  )
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  revalidateTag("wordpress", { expire: 0 });
  return Response.json({ revalidated: true });
}
