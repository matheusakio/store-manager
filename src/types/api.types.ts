export type ApiListResponse<T> = {
  data: T[];
};

export type ApiItemResponse<T> = {
  data: T;
};

export type ApiErrorResponse = {
  message: string;
};
