import images from "./images.json";
import type { NextApiRequest, NextApiResponse } from "next";
import { ImagesAPIResponse } from "../../types/images";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImagesAPIResponse>
) {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 20;

  const hits = images.slice(offset, offset + limit);

  res.status(200).json({
    total: images.length,
    offset,
    limit,
    hits,
    total_hits: hits.length,
  });
}
