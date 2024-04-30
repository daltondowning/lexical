/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const entries: [string, string][] = [
  ['Arabian', 'rgb(125, 50, 0)'],
  ['Appaloosa', 'rgb(100, 0, 0)'],
  ['Friesian', 'rgb(150, 0, 0)'],
  ['Thoroughbred', 'rgb(200, 0, 0)'],
  ['Warmblood', 'rgb(200, 75, 0)'],
  ['Saddlebred', 'rgb(0, 75, 0)'],
  ['Mustang', 'rgb(0, 125, 0)'],
  ['Trakehner', 'rgb(75, 100, 0)'],
  ['Quarter Horse', 'rgb(125, 100, 0)'],
  ['Clydesdale', 'rgb(0, 0, 150)'],
  ['Paint', 'rgb(0, 0, 200)'],
  ['Icelandic', 'rgb(0, 0, 250)'],
  ['Andalusian', 'rgb(0, 100, 150)'],
  ['Tennessee Walker', 'rgb(0, 100, 100)'],
  ['Ukrainian Riding Horse', 'rgb(100, 0, 100)'],
  ['Percheron', 'rgb(150, 0, 150)'],
];

export function getRandomUserProfile(): [string, string] {
  return entries[Math.floor(Math.random() * entries.length)];
}
