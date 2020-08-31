import fs from 'fs';
import path from 'path';

import AvatarBuffer from '../../../../interfaces/AvatarBuffer';

const jpg1: AvatarBuffer = {
  data: fs.readFileSync(path.join(__dirname, '1.jpg')),
  contentType: 'image/jpeg',
};
const jpg2: AvatarBuffer = {
  data: fs.readFileSync(path.join(__dirname, '2.jpg')),
  contentType: 'image/jpeg',
};
const jpg3: AvatarBuffer = {
  data: fs.readFileSync(path.join(__dirname, '3.jpg')),
  contentType: 'image/jpeg',
};
const jpg4: AvatarBuffer = {
  data: fs.readFileSync(path.join(__dirname, '4.jpg')),
  contentType: 'image/jpeg',
};
const jpg5: AvatarBuffer = {
  data: fs.readFileSync(path.join(__dirname, '5.jpg')),
  contentType: 'image/jpeg',
};
const jpg6: AvatarBuffer = {
  data: fs.readFileSync(path.join(__dirname, '6.jpg')),
  contentType: 'image/jpeg',
};

export const female = [jpg1, jpg2, jpg3, jpg4, jpg5, jpg6];
