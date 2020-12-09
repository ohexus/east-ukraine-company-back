const LOGS = {
  SUCCESS: {
    HTTP: {
      DEFAULT: 'Request completed successfuly',
    },
    AUTH: {
      LOGIN: 'Login completed successfully',
      SIGNUP: 'User signed up successfully',
    },
    DB: {
      CONNECTION: 'DB connection successfully established!',
      CLEAR: 'DB successfully cleared!',
      NOTHING_TO_CLEAR: 'Nothing to clear',
    },
    USER: {
      AVATAR_UPLOAD: 'Avatar uploaded successfully',
      USER_UPDATE: 'User updated successfully',
      GET_ONE: 'User got successfully',
      GET_MANY: 'Users got successfully',
      DELETE: 'User deleted successfully',
    },
    MONEY: {
      DECREASE: 'Money decreased successfully',
      INCREASE: 'Money increased successfully',
      SET: 'Money was set successfully',
      UPDATE: 'Money updated successfully',
      GET: 'Money got successfully',
    },
    UNIT: {
      CREATE: 'Unit created successfully',
      PROMOTE: 'Unit promoted successfully',
      DELETE: 'Unit deleted successfully',
      FINISH_LOOTING: 'Unit finished looting successfully',
      GET_ONE: 'Unit got successfully',
      GET_MANY: 'Units got successfully',
    },
    LOOTING: {
      CREATE: 'Looting created successfully',
      FINISH: 'Looting finished successfully',
      ASSIGN_UNITS: 'Looting assigned to units successfully',
      UPDATE: 'Looting updated successfully',
      GET_ONE: 'Looting got successfully',
      GET_MANY: 'Lootings got successfully',
    },
  },
  ERROR: {
    HTTP: {
      DEFAULT: 'Request failed!',
      INVALID_REQUEST: 'Invalid request!',
    },
    AUTH: {
      UNAUTHORIZED: 'Unauthorized',
      LOGIN: 'Login failed!',
      SIGNUP: 'Sign up failed!',
      USER_SAVE: 'Failed to add user to DB!',
      JWT_EXPIRED: 'JWT token expired!',
    },
    PASSWORD: {
      COMPARING: 'Password do not match',
      HASHING: 'Hashing failed!',
      INVALID: 'Invalid password',
    },
    DB: {
      CONNECTION: 'Failed DB connection!',
      CLEAR: 'Failed to clear DB!',
    },
    USER: {
      NOT_FOUND: 'User not found!',
      AVATAR_UPLOAD: 'Failed to load avatar',
      GET_ONE: 'Failed to get user',
      GET_MANY: 'Failed to get users',
      DELETE: 'Failed to delete users',
    },
    MONEY: {
      DECREASE: 'Failed to decrease money',
      INCREASE: 'Failed to increase money',
      SET: 'Failed to set money',
      UPDATE: 'Failed to update money',
      NOT_ENOUGH: "You don't have enough money",
      GET: 'Failed to get user money',
    },
    UNIT: {
      CREATE: 'Failed to create unit',
      PROMOTE: 'Failed to promote unit',
      PROMOTE_UNABLE: "Unit doesn't have enough xp",
      DELETE: 'Failed to delete unit',
      NOT_FOUND: 'Unit not found!',
      FINISH_LOOTING: 'Failed to finish looting for units',
      GET_ONE: 'Failed to get unit',
      GET_MANY: 'Failed to get units',
    },
    LOOTING: {
      CREATE: 'Failed to create looting',
      NOT_FOUND: 'Looting not found!',
      FINISH: 'Failed to finish looting',
      ASSIGN: 'Failed to assign looting to units',
      UPDATE: 'Failed to update looting',
      GET_ONE: 'Failed to get looting',
      GET_MANY: 'Failed to get lootings',
    },
    LOOTING_DATA: {
      NOT_FOUND: 'Looting data not found!',
      GET_ONE: 'Failed to get looting data',
      GET_MANY: 'Failed to get lootings data',
    },
  },
};

export default LOGS;
