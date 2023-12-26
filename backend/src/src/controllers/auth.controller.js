const { response, request } = require("express");
const CustomError = require("../config/errors");

class AuthController {
  static _handleError = (error, res = response) => {
    if (error instanceof CustomError) {
      return res
        .status(error.statusCode)
        .json({ status: false, data: null, error: error.message });
    }
    console.error(error);
    return res
      .status(500)
      .json({ status: false, data: null, error: "Internal Server Error" });
  };

  static login = async (req = request, res = response) => {
    try {
      let { email, password } = req.body;
      return res.status(200).json({
        status: true,
        data: { token: "", user: { email } },
        error: null,
      });
    } catch (error) {
      this._handleError(error, res);
    }
  };

  static recovery = async (req = request, res = response) => {
    try {
      let { email } = req.body;
      return res.status(200).json({ status: true, data: null, error: null });
    } catch (error) {
      this._handleError(error, res);
    }
  };

  static forgot = async (req = request, res = response) => {
    try {
      let { password } = req.body;
      return res.status(200).json({ status: true, data: null, error: null });
    } catch (error) {
      this._handleError(error, res);
    }
  };

  static renew = async (req = request, res = response) => {
    try {
      return res.status(200).json({
        status: true,
        data: { token: "", user: { email: "" } },
        error: null,
      });
    } catch (error) {
      this._handleError(error, res);
    }
  };
}

module.exports = AuthController;

// const renew = async (req, res) => {
//   try {
//     const { id, document } = req;
//     const user = await userModel.validate(document);
//     if (!user.length)
//       return res.status(400).json({
//         ok: false,
//         data: null,
//         error: { msg: "El usuario no existe" },
//       });
//     const [
//       {
//         names,
//         surnames,
//         step,
//         is_candidate,
//         accept,
//         state,
//         photo,
//         certificate_scan,
//       },
//     ] = user;
//     const token = await JWTManager.generateToken(id, document);
//     const urlPresigned = photo.includes("default")
//       ? await getFile("assets/default.png")
//       : await getFile(photo);
//     const host = await userModel.getInfoHost(id);
//     const fullnameHost = host.length
//       ? `${host[0].namesHost ?? ""} ${host[0].surnamesHost ?? ""}`
//       : "";
//     const is_leader = host.length ? host[0].is_leader : true;
//     return res.status(200).json({
//       ok: true,
//       data: {
//         token,
//         user: {
//           id,
//           names,
//           surnames,
//           step,
//           fullnameHost,
//           photo: urlPresigned,
//           is_leader,
//           already_voted: certificate_scan !== null,
//           is_candidate: is_candidate === 1,
//           accept: accept === 1,
//           state: state === 1,
//         },
//       },
//       error: null,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       ok: false,
//       data: null,
//       error,
//     });
//   }
// };

// const login = async (req, res) => {
//   try {
//     let { document, password } = req.body;
//     const user = await userModel.findByDocument(document);
//     const responseError = {
//       ok: false,
//       data: null,
//       error: { msg: "Datos incorrectos" },
//     };
//     if (!user.length) return res.status(400).json(responseError);
//     const [{ password: dbPassword, state }] = user;
//     if (!state)
//       return res.status(401).json({
//         ok: false,
//         data: null,
//         error: { msg: "No has activado tú cuenta en pomodoro" },
//       });
//     const validPassword = Encrypter.decryptPassword(password, dbPassword);
//     if (!validPassword) return res.status(400).json(responseError);
//     const [
//       {
//         id,
//         names,
//         surnames,
//         step,
//         is_candidate,
//         accept,
//         photo,
//         certificate_scan,
//       },
//     ] = user;
//     const token = await JWTManager.generateToken(id, document);
//     const urlPresigned = photo.includes("default")
//       ? await getFile("assets/default.png")
//       : await getFile(photo);
//     const host = await userModel.getInfoHost(id);
//     const fullnameHost = host.length
//       ? `${host[0].namesHost ?? ""} ${host[0].surnamesHost ?? ""}`
//       : "";
//     const is_leader = host.length ? host[0].is_leader : true;
//     return res.status(200).json({
//       ok: true,
//       data: {
//         token,
//         user: {
//           id,
//           names,
//           surnames,
//           step,
//           fullnameHost,
//           photo: urlPresigned,
//           is_leader,
//           already_voted: certificate_scan !== null,
//           is_candidate: is_candidate === 1,
//           accept: accept === 1,
//           state: state === 1,
//         },
//       },
//       error: null,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       ok: false,
//       data: null,
//       error,
//     });
//   }
// };

// const changePassword = async (req, res) => {
//   try {
//     const { id, document } = req;
//     let { password, new_password } = req.body;
//     const user = await userModel.validate(document);
//     const responseError = {
//       ok: false,
//       data: null,
//       error: { msg: "Datos incorrectos" },
//     };
//     if (!user.length) return res.status(400).json(responseError);
//     const [{ password: dbPassword }] = user;
//     const validPassword = Encrypter.decryptPassword(password, dbPassword);
//     if (!validPassword) return res.status(400).json(responseError);
//     new_password = Encrypter.encryptPassword(new_password);
//     const result = await userModel.updateColumn("password", new_password, id);
//     if (result.affectedRows < 1)
//       return res.status(404).json({
//         ok: false,
//         data: null,
//         error: { msg: "No se pudo actualizar la contraseña, intente de nuevo" },
//       });
//     return res.status(200).json({
//       ok: true,
//       data: null,
//       error: null,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       ok: false,
//       data: null,
//       error,
//     });
//   }
// };

// const recoveryPassword = async (req, res) => {
//   try {
//     let { email } = req.body;
//     const user = await userModel.findByEmail(email);
//     const responseError = {
//       ok: false,
//       data: null,
//       error: { msg: "El usuario no se encuentra registrado" },
//     };
//     if (!user.length) return res.status(400).json(responseError);
//     const [{ id, state }] = user;
//     if (!state)
//       return res.status(401).json({
//         ok: false,
//         data: null,
//         error: { msg: "No has activado tú cuenta en pomodoro" },
//       });
//     const generatePassword =
//       Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
//     const newPassword = Encrypter.encryptPassword(generatePassword);
//     const result = await userModel.updateColumn("password", newPassword, id);
//     if (result.affectedRows < 1)
//       return res.status(404).json({
//         ok: false,
//         data: null,
//         error: { msg: "No se pudo actualizar la contraseña, intente de nuevo" },
//       });
//     const provider = await configurationModel.findByName("email_provider");
//     await sendRecoveryPassword(
//       email,
//       "¡Haz solicitado un cambio de contraseña!",
//       generatePassword.toString(),
//       provider
//     );
//     return res.status(200).json({
//       ok: true,
//       data: null,
//       error: null,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       ok: false,
//       data: null,
//       error,
//     });
//   }
// };
