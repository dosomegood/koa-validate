"use strict";

var koa = require("koa"),
  request = require("supertest"),
  appFactory = require("./appFactory.js");
const convert = require("koa-convert");
require("should");

describe("koa-validate exception handling", function () {
  it("bad uri decodeURIComponent should not to be ok", function (done) {
    var app = appFactory.create(1);
    app.router.post(
      "/decodeURIComponent",
      convert(function* () {
        this.checkBody("uri").decodeURIComponent();
        if (this.errors) {
          this.status = 500;
        } else {
          this.status = 200;
        }
      })
    );
    var req = request(app.callback());
    req.post("/decodeURIComponent").send({ uri: "%" }).expect(500, done);
  });
  it("bad uri decodeURI should not to be ok", function (done) {
    var app = appFactory.create(1);
    app.router.post(
      "/decodeURI",
      convert(function* () {
        this.checkBody("uri").decodeURI();
        if (this.errors) {
          this.status = 500;
        } else {
          this.status = 200;
        }
      })
    );
    var req = request(app.callback());
    req.post("/decodeURI").send({ uri: "%" }).expect(500, done);
  });
  it("bad base64 string should not to be ok", function (done) {
    var app = appFactory.create(1);
    app.router.post(
      "/decodeBase64",
      convert(function* () {
        this.checkBody("base64").decodeURIComponent();
        if (this.errors) {
          this.status = 500;
        } else {
          this.status = 200;
        }
      })
    );
    var req = request(app.callback());
    req.post("/decodeBase64").send({ base64: "%%" }).expect(500, done);
  });
  it("bad int string should not to be ok", function (done) {
    var app = appFactory.create(1);
    app.router.post(
      "/toInt",
      convert(function* () {
        this.checkBody("v").toInt();
        if (this.errors) {
          this.status = 500;
        } else {
          this.status = 200;
        }
      })
    );
    var req = request(app.callback());
    req.post("/toInt").send({ v: "gg" }).expect(500, done);
  });

  it("0 len should be ok", function (done) {
    var app = appFactory.create(1);
    app.router.post(
      "/len",
      convert(function* () {
        this.checkBody("v").len(0, 1, "problem here");
        if (this.errors) {
          this.status = 500;
        } else {
          this.status = 200;
        }
      })
    );
    var req = request(app.callback());
    req.post("/len").send({ v: "" }).expect(200, done);
  });
});
