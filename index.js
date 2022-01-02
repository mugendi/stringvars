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

const split = require('split-string');

function JSON_Parse(v) {
	let val;

	try {
		val = JSON.parse(`{"v":${v}}`).v;
	} catch (error) {}

	return val;
}

function parse(query, sepChar = ',') {
	let is = typeof query;
	if (is !== 'string') {
		throw new Error(
			`Query argument should be a string. ${is} was received.`
		);
	}

	is = typeof sepChar;

	if (is !== 'string') {
		throw new Error(`sepChar should be a string. ${is} was received.`);
	} else if (sepChar.length > 1) {
		throw new Error(`sepChar should be a single character`);
	}

	let splitArr = split(query, { brackets: { '[': ']' }, separator: sepChar }),
		queryArr = splitArr.map((v) => {
			// Now try to convert each to expected datatype using JSON.parse
			// attempt to parse any non string values
			val = JSON_Parse(v);

			//undefined is not a valid json value. So this means we could not parse the value
			if (val == undefined) {
				// all values that fail and are not enclosed in quotes are likely to be strings
				if (/^['"`]/.test(v) == false) {
					//  so we try parse as a quoted value
					val = JSON_Parse(`${JSON.stringify(v)}`);
				}
			}

			// Handle one level of nesting
			if (typeof val == 'string') {
				let m = val.match(/^\[([^\]]+)\]$/);

				if (m) {
					val = parse(m[1], ',');
				}
			}

			return val;
		});

	// console.log(queryArr);
	return queryArr;
}

module.exports = parse;
