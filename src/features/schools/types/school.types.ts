export type SchoolId = string;

export type School = {
  id: SchoolId;
  name: string;
  address: string;
  createdAt: string;
};

export type CreateSchoolInput = {
  name: string;
  address: string;
};

export type UpdateSchoolInput = CreateSchoolInput;

export type SchoolWithProductsCount = School & {
  productsCount: number;
};
