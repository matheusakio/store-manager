export type StoreId = string;

export type Store = {
  id: StoreId;
  name: string;
  address: string;
  createdAt: string;
};

export type CreateStoreInput = {
  name: string;
  address: string;
};

export type UpdateStoreInput = CreateStoreInput;

export type StoreWithProductsCount = Store & {
  productsCount: number;
};
