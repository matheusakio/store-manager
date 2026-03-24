import { createServer, Model, Response } from "miragejs";

export function makeServer() {
  return createServer({
    models: {
      store: Model,
      product: Model,
    },

    seeds(server) {
      const store1 = server.create("store", {
        id: "1",
        name: "Loja Centro",
        address: "Centro - São Paulo",
        createdAt: new Date().toISOString(),
      });

      const store2 = server.create("store", {
        id: "2",
        name: "Loja Shopping",
        address: "Shopping Norte",
        createdAt: new Date().toISOString(),
      });

      server.create("product", {
        id: "1",
        storeId: store1.id,
        name: "Camiseta Premium",
        category: "Roupas",
        price: 129.9,
        createdAt: new Date().toISOString(),
      });

      server.create("product", {
        id: "2",
        storeId: store1.id,
        name: "Fone Bluetooth",
        category: "Eletrônicos",
        price: 299.9,
        createdAt: new Date().toISOString(),
      });
    },

    routes() {
      this.namespace = "api";

      // STORES

      this.get("/stores", (schema) => {
        return schema.all("store");
      });

      this.post("/stores", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        return schema.create("store", {
          ...attrs,
          createdAt: new Date().toISOString(),
        });
      });

      this.put("/stores/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);

        const store = schema.find("store", id);

        return store?.update(attrs);
      });

      this.delete("/stores/:id", (schema, request) => {
        const id = request.params.id;
        return schema.find("store", id)?.destroy();
      });

      // PRODUCTS

      this.get("/products", (schema, request) => {
        const storeId = request.queryParams.storeId;

        if (storeId) {
          return schema.where("product", { storeId });
        }

        return schema.all("product");
      });

      this.post("/products", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        return schema.create("product", {
          ...attrs,
          createdAt: new Date().toISOString(),
        });
      });

      this.put("/products/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);

        const product = schema.find("product", id);

        return product?.update(attrs);
      });

      this.delete("/products/:id", (schema, request) => {
        const id = request.params.id;
        return schema.find("product", id)?.destroy();
      });

      this.passthrough();
    },
  });
}
