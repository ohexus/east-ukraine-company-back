const LOGS = {
  DB: {
    CONNECTION_SUCCESS: 'DB connection was established successfully',
  },
  SUCCESS: {
    DEFAULT: 'Request completed successfuly',
    LOGIN: 'Login completed successfully',
    SIGNUP: 'User signed up successfully',
    DB_CONNECTION: 'DB connection successfully established!',
    DB_CLEAR: 'DB successfully cleared!',
    DB_CLEAR_NOTHING: 'Nothing to clear',
    AVATAR_UPLOAD: 'Avatar uploaded successfully',
    USER_INFO_UPDATE: 'User updated successfully',
    UNIT_CREATE: 'Unit created successfully',
    UNIT_PROMOTE: 'Unit promoted successfully',
    UNIT_DELETE: 'Unit deleted successfully',
    GET_UNIT: 'Unit got successfully',
    GET_UNITS: 'Units got successfully',
    LOOTING_CREATE: 'Looting created successfully',
  },
  ERROR: {
    DEFAULT: 'Request failed!',
    LOGIN: "Login failed. User doesn't exist!",
    USER_SAVE: 'Failed to add user to DB!',
    SIGNUP: 'Sign up failed!',
    JWT_EXPIRED: 'JWT token expired!',
    PASS_COMPARING: 'Password do not match',
    DB_CONNECTION: 'Failed DB connection!',
    DB_CLEAR: 'Failed to clear DB!',
    USER_NOT_EXIST: "User doesn't exist!",
    AVATAR_UPLOAD: 'Failed to load avatar',
    UNAUTHORIZED: 'Unauthorized',
    UNIT_CREATE: 'Failed to create unit',
    UNIT_PROMOTE: 'Failed to promote unit',
    UNIT_PROMOTE_UNABLE: "Unit doesn't have enough xp",
    UNIT_DELETE: 'Failed to delete unit',
    UNIT_NOT_EXIST: "Unit doesn't exist!",
    LOOTING_CREATE: 'Failed to create looting',
    LOOTING_NOT_EXIST: "Looting doesn't exist!",
    GET_UNITS: 'Failed to get units',
    GET_LOOTINGS: 'Failed to get looting',
  },
};

export default LOGS;
