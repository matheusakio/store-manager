import { createServer, Model, Response } from "miragejs";

type School = {
  id: string;
  name: string;
  address: string;
  createdAt: string;
};

type SchoolClass = {
  id: string;
  schoolId: string;
  name: string;
  shift: "Matutino" | "Vespertino" | "Noturno" | "Integral";
  schoolYear: string;
  createdAt: string;
};

function nowIso() {
  return new Date().toISOString();
}

function generateId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function makeServer() {
  return createServer({
    models: {
      school: Model,
      schoolClass: Model,
    },

    seeds(server) {
      server.create("school", {
        id: "1",
        name: "Escola Municipal Centro",
        address: "Centro - Goiânia/GO",
        createdAt: nowIso(),
      });

      server.create("school", {
        id: "2",
        name: "Escola Estadual Jardim das Flores",
        address: "Jardim das Flores - Anápolis/GO",
        createdAt: nowIso(),
      });

      server.create("schoolClass", {
        id: "1",
        schoolId: "1",
        name: "5º Ano A",
        shift: "Matutino",
        schoolYear: "2026",
        createdAt: nowIso(),
      });

      server.create("schoolClass", {
        id: "2",
        schoolId: "1",
        name: "6º Ano B",
        shift: "Vespertino",
        schoolYear: "2026",
        createdAt: nowIso(),
      });

      server.create("schoolClass", {
        id: "3",
        schoolId: "2",
        name: "1º Ano Ensino Médio",
        shift: "Noturno",
        schoolYear: "2026",
        createdAt: nowIso(),
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/schools", (schema: any) => {
        const schools = schema
          .all("school")
          .models.map((item: any) => item.attrs);
        return { schools };
      });

      this.post("/schools", (schema: any, request: any) => {
        const attrs = JSON.parse(request.requestBody) as Omit<
          School,
          "id" | "createdAt"
        >;

        const school = schema.create("school", {
          id: generateId(),
          ...attrs,
          createdAt: nowIso(),
        });

        return school.attrs;
      });

      this.put("/schools/:id", (schema: any, request: any) => {
        const id = String(request.params.id);
        const attrs = JSON.parse(request.requestBody) as Partial<School>;
        const school = schema.find("school", id);

        if (!school) {
          return new Response(404, {}, { message: "Escola não encontrada." });
        }

        school.update(attrs);
        return school.attrs;
      });

      this.delete("/schools/:id", (schema: any, request: any) => {
        const id = String(request.params.id);
        const school = schema.find("school", id);

        if (!school) {
          return new Response(404, {}, { message: "Escola não encontrada." });
        }

        const classes = schema.all("schoolClass").models.filter((item: any) => {
          return String(item.attrs.schoolId) === id;
        });

        classes.forEach((item: any) => item.destroy());
        school.destroy();

        return new Response(204);
      });

      this.get("/classes", (schema: any, request: any) => {
        const schoolId = request.queryParams.schoolId as string | undefined;

        let classes = schema
          .all("schoolClass")
          .models.map((item: any) => item.attrs);

        if (schoolId) {
          classes = classes.filter(
            (item: any) => String(item.schoolId) === String(schoolId),
          );
        }

        return { classes };
      });

      this.post("/classes", (schema: any, request: any) => {
        const attrs = JSON.parse(request.requestBody) as Omit<
          SchoolClass,
          "id" | "createdAt"
        >;

        const school = schema.find("school", String(attrs.schoolId));

        if (!school) {
          return new Response(404, {}, { message: "Escola não encontrada." });
        }

        const schoolClass = schema.create("schoolClass", {
          id: generateId(),
          ...attrs,
          createdAt: nowIso(),
        });

        return schoolClass.attrs;
      });

      this.put("/classes/:id", (schema: any, request: any) => {
        const id = String(request.params.id);
        const attrs = JSON.parse(request.requestBody) as Partial<SchoolClass>;
        const schoolClass = schema.find("schoolClass", id);

        if (!schoolClass) {
          return new Response(404, {}, { message: "Turma não encontrada." });
        }

        schoolClass.update(attrs);
        return schoolClass.attrs;
      });

      this.delete("/classes/:id", (schema: any, request: any) => {
        const id = String(request.params.id);
        const schoolClass = schema.find("schoolClass", id);

        if (!schoolClass) {
          return new Response(404, {}, { message: "Turma não encontrada." });
        }

        schoolClass.destroy();
        return new Response(204);
      });

      this.passthrough();
    },
  });
}
