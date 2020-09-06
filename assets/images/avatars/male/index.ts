import fs from 'fs';
import path from 'path';

import AvatarBuffer from '../../../../interfaces/AvatarBuffer';

const jpg1: AvatarBuffer = {
  buffer: fs.readFileSync(path.join(__dirname, '1.jpg')),
  contentType: 'image/jpeg',
};
const jpg2: AvatarBuffer = {
  buffer: fs.readFileSync(path.join(__dirname, '2.jpg')),
  contentType: 'image/jpeg',
};
const jpg3: AvatarBuffer = {
  buffer: fs.readFileSync(path.join(__dirname, '3.jpg')),
  contentType: 'image/jpeg',
};
const jpg4: AvatarBuffer = {
  buffer: fs.readFileSync(path.join(__dirname, '4.jpg')),
  contentType: 'image/jpeg',
};
const jpg5: AvatarBuffer = {
  buffer: fs.readFileSync(path.join(__dirname, '5.jpg')),
  contentType: 'image/jpeg',
};
const jpg6: AvatarBuffer = {
  buffer: fs.readFileSync(path.join(__dirname, '6.jpg')),
  contentType: 'image/jpeg',
};
const jpg7: AvatarBuffer = {
  buffer: fs.readFileSync(path.join(__dirname, '7.jpg')),
  contentType: 'image/jpeg',
};
const jpg8: AvatarBuffer = {
  buffer: fs.readFileSync(path.join(__dirname, '8.jpg')),
  contentType: 'image/jpeg',
};
const jpg9: AvatarBuffer = {
  buffer: fs.readFileSync(path.join(__dirname, '9.jpg')),
  contentType: 'image/jpeg',
};
const jpg10: AvatarBuffer = {
  buffer: fs.readFileSync(path.join(__dirname, '10.jpg')),
  contentType: 'image/jpeg',
};

export const male = [
  jpg1,
  jpg2,
  jpg3,
  jpg4,
  jpg5,
  jpg6,
  jpg7,
  jpg8,
  jpg9,
  jpg10,
];
