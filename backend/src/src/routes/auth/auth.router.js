const { Router } = require("express");
const AuthController = require("../../controllers/auth.controller");

class AuthRoutes {
  static get routes() {
    const router = Router();
    router.post("/login", AuthController.login);
    router.post("/recovery", AuthController.recovery);
    router.patch("/forgot", AuthController.forgot);
    router.get("/renew", AuthController.renew);
    return router;
  }
}

module.exports = AuthRoutes;
