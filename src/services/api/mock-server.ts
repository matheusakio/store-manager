import { createServer, Model, Response } from "miragejs";

type StoreRecord = {
  id: string;
  name: string;
  address: string;
  createdAt: string;
};

type ProductRecord = {
  id: string;
  storeId: string;
  name: string;
  category: string;
  price: number;
  imageUri?: string | undefined;
  createdAt: string;
};

function generateId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

const MOCK_ERRORS = {
  stores: false,
  createStore: false,
  updateStore: false,
  deleteStore: false,

  products: false,
  createProduct: false,
  updateProduct: false,
  deleteProduct: false,
};

function simulateError(
  enabled: boolean,
  status = 400,
  message = "Erro simulado",
) {
  if (!enabled) return null;

  return new Response(status, {}, { message });
}

async function simulateErrorWithDelay(
  enabled: boolean,
  delay = 600,
  status = 400,
  message = "Erro simulado",
) {
  if (!enabled) return null;

  await new Promise((resolve) => setTimeout(resolve, delay));

  return new Response(status, {}, { message });
}

export function makeServer() {
  return createServer({
    models: {
      store: Model,
      product: Model,
    },

    seeds(server) {
      server.create("store", {
        id: "1",
        name: "Loja Centro",
        address: "Centro - São Paulo",
        createdAt: new Date().toISOString(),
      });

      server.create("store", {
        id: "2",
        name: "Loja Shopping",
        address: "Shopping Norte - São Paulo",
        createdAt: new Date().toISOString(),
      });

      server.create("product", {
        id: "1",
        storeId: "1",
        name: "Camiseta Premium",
        category: "Roupas",
        price: 129.9,
        createdAt: new Date().toISOString(),
      });

      server.create("product", {
        id: "2",
        storeId: "1",
        name: "Fone Bluetooth",
        category: "Eletrônicos",
        price: 299.9,
        createdAt: new Date().toISOString(),
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/stores", async (schema) => {
        const error = await simulateErrorWithDelay(
          MOCK_ERRORS.stores,
          800,
          400,
          "Erro ao listar lojas",
        );
        if (error) return error;

        const stores = schema
          .all("store")
          .models.map((model) => model.attrs as StoreRecord);

        return { stores };
      });

      this.post("/stores", (schema, request) => {
        const error = simulateError(
          MOCK_ERRORS.createStore,
          400,
          "Erro ao criar loja",
        );
        if (error) return error;

        const attrs = JSON.parse(request.requestBody) as Omit<
          StoreRecord,
          "id" | "createdAt"
        >;

        const store = schema.create("store", {
          id: generateId(),
          ...attrs,
          createdAt: new Date().toISOString(),
        });

        return store.attrs;
      });

      this.put("/stores/:id", (schema, request) => {
        const error = simulateError(
          MOCK_ERRORS.updateStore,
          400,
          "Erro ao atualizar loja",
        );
        if (error) return error;

        const id = request.params.id;

        if (!id) {
          return new Response(400, {}, { message: "ID da loja inválido." });
        }

        const attrs = JSON.parse(request.requestBody) as Partial<StoreRecord>;
        const store = schema.find("store", id);

        if (!store) {
          return new Response(404, {}, { message: "Loja não encontrada." });
        }

        store.update(attrs);
        return store.attrs;
      });

      this.delete("/stores/:id", (schema, request) => {
        const error = simulateError(
          MOCK_ERRORS.deleteStore,
          400,
          "Erro ao deletar loja",
        );
        if (error) return error;

        const id = request.params.id;

        if (!id) {
          return new Response(400, {}, { message: "ID da loja inválido." });
        }

        const store = schema.find("store", id);

        if (!store) {
          return new Response(404, {}, { message: "Loja não encontrada." });
        }

        const relatedProducts = schema
          .all("product")
          .models.filter(
            (model) => (model.attrs as ProductRecord).storeId === id,
          );

        relatedProducts.forEach((product) => product.destroy());
        store.destroy();

        return new Response(204);
      });

      /**
       * PRODUCTS
       */

      this.get("/products", async (schema, request) => {
        const error = await simulateErrorWithDelay(
          MOCK_ERRORS.products,
          700,
          400,
          "Erro ao listar produtos",
        );
        if (error) return error;

        const storeId = request.queryParams.storeId;

        const products = schema
          .all("product")
          .models.map((model) => model.attrs as ProductRecord)
          .filter((product) => {
            if (!storeId) return true;
            return product.storeId === String(storeId);
          });

        return { products };
      });

      this.post("/products", (schema, request) => {
        const error = simulateError(
          MOCK_ERRORS.createProduct,
          400,
          "Erro ao criar produto",
        );
        if (error) return error;

        const attrs = JSON.parse(request.requestBody) as Omit<
          ProductRecord,
          "id" | "createdAt"
        >;

        const product = schema.create("product", {
          id: generateId(),
          ...attrs,
          createdAt: new Date().toISOString(),
        });

        return product.attrs;
      });

      this.put("/products/:id", (schema, request) => {
        const error = simulateError(
          MOCK_ERRORS.updateProduct,
          400,
          "Erro ao atualizar produto",
        );
        if (error) return error;

        const id = request.params.id;

        if (!id) {
          return new Response(400, {}, { message: "ID do produto inválido." });
        }

        const attrs = JSON.parse(request.requestBody) as Partial<ProductRecord>;
        const product = schema.find("product", id);

        if (!product) {
          return new Response(404, {}, { message: "Produto não encontrado." });
        }

        product.update(attrs);
        return product.attrs;
      });

      this.delete("/products/:id", (schema, request) => {
        const error = simulateError(
          MOCK_ERRORS.deleteProduct,
          400,
          "Erro ao deletar produto",
        );
        if (error) return error;

        const id = request.params.id;

        if (!id) {
          return new Response(400, {}, { message: "ID do produto inválido." });
        }

        const product = schema.find("product", id);

        if (!product) {
          return new Response(404, {}, { message: "Produto não encontrado." });
        }

        product.destroy();
        return new Response(204);
      });

      this.passthrough();
    },
  });
}
