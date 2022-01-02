// Copyright 2022 Anthony Mugendi
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const stringVars = require('../.');

test("Parses a Jeniffer's ASL", () => {
  let q = "Jeniffer,asl,24, female,Nairobi\\, Kenya",
  parsed = stringVars(q);
  expect(parsed).toEqual( [ 'Jeniffer', 'asl', 24, ' female', 'Nairobi, Kenya' ] );
});

test("Parses nested values", () => {
  let q = "a,b,[1,2,453.55],f",
  parsed = stringVars(q);
  expect(parsed).toEqual( [ 'a', 'b', [ 1, 2, 453.55 ], 'f' ] );
});

test("Parses escaped values", () => {
  let q = "a\\,b\\,c,d,e,and f",
  parsed = stringVars(q);
  expect(parsed).toEqual( [ 'a,b,c', 'd', 'e', 'and f' ] );
});