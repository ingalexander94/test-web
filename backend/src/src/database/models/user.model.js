const { connectCommonDB } = require("../common");

class UserModel {
  static findByEmail = async (email) => {
    let db;
    try {
      db = await connectCommonDB();
      const users = db.select("*").from("mp_users");
      return users;
    } catch (error) {
      throw error;
    } finally {
      if (db) db.destroy();
    }
  };
}

module.exports = UserModel;
