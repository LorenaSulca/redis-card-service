import request from "supertest";

import { app } from "../../src/index";

describe("POST /tokens tests", () => {
  test("Body no pasa verificacion", async () => {
    const payload = {
      email: "devtest2@gmail",
      card_number: 111111111,
      cvv: 1234,
      expiration_year: "2024",
      expiration_month: "13",
    };
    const res = await request(app)
      .post("/tokens")
      .set("Authorization", "pk_test_dgf57gds6aefg4")
      .send(payload);
    expect(res.body).toEqual({
      type: "application",
      errors: "La validacion de datos fallo",
    });
  });
  test("Ausencia de PK_Token", async () => {
    const payload = {
      email: "devtest2@gmail.com",
      card_number: 4211111111111144,
      cvv: 156,
      expiration_year: "2026",
      expiration_month: "08",
    };
    const res = await request(app).post("/tokens").send(payload).send(payload);
    expect(res.body).toEqual({
      type: "application",
      errors:
        "Debes incluir un token PK (Authorization) en la cabecera de la petición",
    });
  });
  test("Elementos registrados correctamente", async () => {
    const payload = {
      email: "devtest2@gmail.com",
      card_number: 4211111111111144,
      cvv: 156,
      expiration_year: "2026",
      expiration_month: "08",
    };
    const res = await request(app)
      .post("/tokens")
      .set("Authorization", "pk_test_dgf57gds6aefg4")
      .send(payload);
    expect(res.body).toHaveProperty("token");
  });
});

describe("GET /tokens tests", () => {
  test("Sin token para busqueda", async () => {
    const res = await request(app).get("/tokens");
    expect(res.body).toHaveProperty("errors");
  });
  test("Token para busqueda vencido", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkTnVtYmVyU3RyaW5nIjoiNDExMTExMTExMTExMTExMSIsImlhdCI6MTcwNjk2ODY1NiwiZXhwIjoxNzA2OTY4NzE2fQ.wUZl_D0sQHTxoHFkL-Gx_p-ReD2wdGB6kINu8A0YvvQ";
    const res = await request(app)
      .get("/tokens")
      .set("Authorization", "pk_test_dgf57gds6aefg4")
      .query({ token });
    expect(res.body).toEqual({
      type: "TokenExpiredError",
      message: "jwt expired",
    });
  });
  test("Ontencion correcta de dato de prueba", async () => {
    // token sin fecha de expiracion
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkTnVtYmVyU3RyaW5nIjoiNDExMTExMTExMTExMTExMSIsImlhdCI6MTcwNjk5NjE2OH0.bckzkU0UzewsRvSXwSnMGrn0DuDKKawlXDv3O5WYmrI";
    const res = await request(app)
      .get("/tokens")
      .set("Authorization", "pk_test_dgf57gds6aefg4")
      .query({ token });
    expect(res.body).toHaveProperty([
      "card_number"
    ]);
  });
});
