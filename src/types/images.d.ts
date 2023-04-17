export type Image = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type ImagesAPIResponse = {
  total: number;
  offset: number;
  limit: number;
  hits: Array<Image>;
  total_hits: number;
};

export type cardProps = {
  url: string,
  id: string,
  ref?: Function
};