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
  },
  ERROR: {
    DEFAULT: 'Request is failed!',
    LOGIN: 'Login failed. Can no find such user!',
    USER_SAVE: 'Can not add user to DB!',
    REGISTER: 'Registration was failed!',
    JWT_EXPIRED: 'JWT token is expired!',
    PASS_COMPARING: 'Password do not match',
    DB_CONNECTION: 'DB connection is failed!',
    USER_NOT_EXIST: 'User is not exist!',
    AVATAR_UPLOAD: 'Avatar upload is failed!',
    UNAUTHORIZED: 'Unauthorized',
  },
};

export default LOGS;
