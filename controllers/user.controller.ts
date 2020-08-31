import { Request, Response } from 'express';
import ExtendedRequest from '../interfaces/requests/ExtendedRequest';

import { LOGS } from '../constants';

import { errorHandler, successResponse } from '../utils';
import { UserDoc } from '../interfaces/entities/User';

import UsersService from '../services/user.service';

const getCurrentUser = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  let user: UserDoc | null;

  try {
    user = await UsersService.getUserById(req.userId);
  } catch (error) {
    return errorHandler(res, error.message);
  }
  if (!user) {
    return errorHandler(res, LOGS.ERROR.USER_NOT_EXIST);
  }

  return successResponse(res, LOGS.SUCCESS.LOGIN, user);
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.query.id?.toString();

  if (!id) return errorHandler(res, LOGS.ERROR.USER_NOT_EXIST);

  let user: UserDoc | null;

  try {
    user = await UsersService.getUserById(id);
  } catch (error) {
    return errorHandler(res, error.message);
  }
  if (!user) {
    return errorHandler(res, LOGS.ERROR.USER_NOT_EXIST);
  }

  return successResponse(res, LOGS.SUCCESS.DEFAULT, user);
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UsersService.getAllUsers();
  return successResponse(res, LOGS.SUCCESS.DEFAULT, users);
};

// const patchUpdateAvatar = async (req, res) => {
//   const { id } = req.params;
//   const { file } = req.body;

//   if (!file) return errorHandler(res, LOGS.ERROR.AVATAR_UPLOAD);

//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       {
//         _id: id,
//       },
//       {
//         avatarBuffer: {
//           data: fs.readFileSync(file.path),
//           contentType: file.mimetype,
//         },
//         $push: {
//           logs: {
//             message: 'avatar updated',
//           },
//         },
//       },
//       { new: true },
//     );

//     // req.io.emit('updateAvatar', updatedUser);

//     return successResponse(res, LOGS.SUCCESS.AVATAR_UPLOAD);
//   } catch (error) {
//     return errorHandler(res, error.message);
//   }
// };

export {
  getCurrentUser,
  getUserById,
  getAllUsers,
  // patchUpdateAvatar,
};
