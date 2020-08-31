import { UserClass } from '../models';

import {
  UserSignUpRequest,
  UserLogInRequest,
} from '../interfaces/requests/UserRequests';
import { UserDoc } from '../interfaces/entities/User';

class UsersService {
  async createUser(user: UserSignUpRequest): Promise<UserDoc | null> {
    const userDoc = await UserClass.createUser(user);

    return userDoc;
  }

  async getAllUsers(): Promise<UserDoc[]> {
    const userDocs = await UserClass.getAllUsers();

    return userDocs;
  }

  async getUser(user: UserLogInRequest): Promise<UserDoc | null> {
    const userDoc = await UserClass.getUser(user);

    return userDoc;
  }

  async getUserById(id: string): Promise<UserDoc | null> {
    const userDoc = await UserClass.getUserById(id);

    return userDoc;
  }

  // async updateAvatar()

  // async getAllSkills() {
  //   try {
  //     const skillDocs = await SkillModel.getAllSkills();

  //     if (!skillDocs) {
  //       errorHandler(LOGS.ERROR.SKILLS_NOT_FOUND);
  //       return;
  //     }

  //     return skillDocs;
  //   } catch (error) {
  //     errorHandler(error.message);
  //     return;
  //   }
  // }

  // async getUnlearnedSkills(skills) {
  //   try {
  //     const skillDocs = await SkillModel.getUnlearnedSkills(skills);

  //     return skillDocs;
  //   } catch (error) {
  //     errorHandler(error.message);
  //     return;
  //   }
  // }

  // async getSkillsByDirection(direction) {
  //   try {
  //     const skillDocs = await SkillModel.getSkillsByDirection(direction);

  //     if (!skillDocs) {
  //       errorHandler(LOGS.ERROR.SKILLS_NOT_FOUND);
  //       return;
  //     }

  //     return skillDocs;
  //   } catch (error) {
  //     errorHandler(error.message);
  //     return;
  //   }
  // }

  // async getSkillsByTechnologie(technologie) {
  //   try {
  //     const skills = await Skill.find({
  //       technologie,
  //     });

  //     if (!skills) {
  //       errorHandler(LOGS.ERROR.SKILLS_NOT_FOUND);
  //       return;
  //     }

  //     return skills;
  //   } catch (error) {
  //     errorHandler(error.message);
  //     return;
  //   }
  // }

  // async getSkillByName(name) {
  //   try {
  //     const skills = await Skill.find({
  //       name,
  //     });

  //     if (!skills) {
  //       errorHandler(LOGS.ERROR.SKILLS_NOT_FOUND);
  //       return;
  //     }

  //     return skills;
  //   } catch (error) {
  //     errorHandler(error.message);
  //     return;
  //   }
  // }
}

export default new UsersService();
