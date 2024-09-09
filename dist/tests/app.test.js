"use strict";
// import request from "supertest";
// import App from "../app";
// import prisma from "../prisma";
// const app = new App().app;
// describe("GET main route API", () => {
//   beforeEach(() => {
//     // digunakan untuk menyiapkan program yang ingin dijalankan terlebih dahulu
//     // sebelum menjalankan tiap poin testing
//   });
//   beforeAll(async () => {
//     // digunakan untuk menyiapkan program yang sekali dijalankan sebelum proses testing berlangsung
//     await prisma.$connect();
//   });
//   afterEach(() => {
//     // digunakan untuk menyiapkan program yang ingin dijalankan
//     // setelah menjalankan tiap poin testing
//   });
//   afterAll(async () => {
//     // digunakan untuk menyiapkan program yang sekali dijalankan setelah seluruh proses testing berlangsung
//     await prisma.$disconnect();
//   });
//   // GOOD CASE
//   it("Should return welcome massage", async () => {
//     const response = await request(app).get("/api");
//     expect(response.status).toBe(200);
//   });
//   // BAD CASE
//   it("Should return NOT FOUND PAGE", async () => {
//     const response = await request(app).get("/api/blog");
//     expect(response.status).toBe(404);
//   });
// });
// tests.test.js
// tests.test.js
beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
});
for (let i = 1; i <= 100; i++) {
    test(`TEST ${i} FAILED`, () => {
        expect(true).toBe(false);
    });
}
