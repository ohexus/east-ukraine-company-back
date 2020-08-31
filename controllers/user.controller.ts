import { Request, Response } from 'express';

import { LOGS } from '../constants';

import { errorHandler, successResponse } from '../utils';
import { IUserDoc } from '../interfaces/entities/IUser';

import UsersService from '../services/user.service';

const getUserById = async (req: Request, res: Response) => {
  // try {
  //   const user = await User.findOne({ _id: req.params.id });

  //   if (!user) return errorHandler(res, LOGS.ERROR.USER_NOT_EXIST);

  //   return successResponse(res, STATUSES.RESPONSE.SUCCESS.DEFAULT, user);
  // } catch (error) {
  //   return errorHandler(res, error.message);
  // }

  // TODO update logs consts

  const id = req.query.id?.toString();

  if (!id) return errorHandler(res, LOGS.ERROR.USER_NOT_EXIST);

  let user: IUserDoc | null;

  try {
    user = await UsersService.getUserById(id);
  } catch (error) {
    return errorHandler(res, error.message);
  }
  if (!user) {
    return errorHandler(res, LOGS.ERROR.USER_NOT_EXIST);
  }

  return successResponse(res, LOGS.SUCCESS.LOGIN, user);
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UsersService.getAllUsers();
  return successResponse(res, LOGS.SUCCESS.LOGIN, users);
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
  getUserById,
  getAllUsers,
  // patchUpdateAvatar,
};
