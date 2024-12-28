const ROLES = {
  ADMIN: "admin",
  user: "user",
};
const PERMISSIONS = {
  COURSE: {
    CREATE: ["admin", "user"],
    READ: ["admin", "user"],
    UPDATE: ["admin", "user"],
    DELETE: ["admin"],
  },
  QUIZ: {
    CREATE: ["admin", "user"],
    READ: ["admin", "user"],
    UPDATE: ["admin", "user"],
    DELETE: ["admin"],
  },
};

module.exports = {
  ROLES,
  PERMISSIONS,
};
