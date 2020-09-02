const LOGS = {
  DB: {
    CONNECTION_SUCCESS: 'DB connection was established successfully',
  },
  SUCCESS: {
    DEFAULT: 'Request is successful',
    LOGIN: 'Login successful',
    REGISTER: 'User was successfully registered!',
    DB_CONNECTION: 'DB connection successfully established!',
    AVATAR_UPLOAD: 'Avatar was successfully uploaded',
    USER_INFO_UPDATE: 'User was updated successfully',
    UNIT_CREATE: 'Unit created successfully',
    LOOTING_CREATE: 'Looting created successfully',
  },
  ERROR: {
    DEFAULT: 'Request is failed!',
    LOGIN: "Login failed. Can't find such user!",
    USER_SAVE: "Can't add user to DB!",
    REGISTER: 'Registration was failed!',
    JWT_EXPIRED: 'JWT token is expired!',
    PASS_COMPARING: 'Password do not match',
    DB_CONNECTION: 'DB connection is failed!',
    USER_NOT_EXIST: 'User is not exist!',
    AVATAR_UPLOAD: 'Avatar upload is failed!',
    UNAUTHORIZED: 'Unauthorized',
    UNIT_CREATE: "Can't create unit",
    LOOTING_CREATE: "Can't create looting",
    GET_UNITS: "Can't get units",
    GET_LOOTINGS: "Can't get looting",
  },
};

export default LOGS;
