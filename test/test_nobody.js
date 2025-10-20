"use strict";

var koa = require("koa"),
  request = require("supertest"),
  appFactory = require("./appFactory.js");
const convert = require("koa-convert");
require("should");

describe("koa-validate nobody", function () {
  it("nobody to check", function (done) {
    var app = appFactory.create(1);
    app.router.post(
      "/nobody",
      convert(function* () {
        this.checkBody("body").notEmpty();
        if (this.errors) {
          this.status = 500;
        } else {
          this.status = 200;
        }
      })
    );
    var req = request(app.callback());
    req.post("/nobody").send().expect(500, done);
  });
});
