import { ImagesAPIResponse } from "../types/images";

const API_IMAGES_ENDPOINT = "/api/images";

export const fetchImages = (
  offset = 0,
  limit = 20,
  option = {}
): Promise<ImagesAPIResponse | undefined> => {
  const params = new URLSearchParams();

  params.set("offset", String(offset));
  params.set("limit", String(limit));

  return fetch(`${API_IMAGES_ENDPOINT}?${params.toString()}`, option)
    .then((response) => response.json())
    .catch(console.error);
};
