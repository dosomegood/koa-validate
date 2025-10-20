"use strict";

const koa = require("koa");
var KoaRouter = require("@koa/router");

exports.create = function (type) {
  var app = new koa();
  require("../validate.js")(app);
  var router = new KoaRouter();
  if (1 == type) {
    app.use(
      require("koa-body")({
        multipart: true,
        formidable: { keepExtensions: true },
      })
    );
  } else {
    app.use(require("koa-body")());
  }
  app.use(function* (next) {
    try {
      yield next;
    } catch (err) {
      console.error(err.stack);
      this.app.emit("error", err, this);
    }
  });
  app.use(router.routes()).use(router.allowedMethods());
  app.router = router;
  return app;
};
