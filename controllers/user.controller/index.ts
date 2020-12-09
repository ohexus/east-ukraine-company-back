import { postLogin, postSignUp } from './auth.controller';
import { getMoney, patchDecreaseMoney, patchIncreaseMoney, patchSetMoney } from './money.controller';
import { getCurrentUser, getUserById, getAllUsers, deleteUserById } from './profile.controller';

export {
  getAllUsers,
  getCurrentUser,
  getMoney,
  getUserById,
  deleteUserById,
  patchDecreaseMoney,
  patchIncreaseMoney,
  patchSetMoney,
  postLogin,
  postSignUp,
};
