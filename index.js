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

function JSON_Parse(v) {
	let val;

	try {
		val = JSON.parse(`{"v":${v}}`).v;
	} catch (error) {
	}


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

	let replaceChar = '«øæø»',
		replacePat = new RegExp(replaceChar, 'g');

	// set sepChar
	sepChar = sepChar.length == 1 ? sepChar : ',';
	let sepPat = new RegExp('\\\\\\' + sepChar),
		val;

	// replace escaped pipes
	let queryArr = query
		// avoid escaped separation chars
		.replace(sepPat, replaceChar)
		// split to array
		.split(sepChar)
		.map((v) => {
			// console.log({v});
			// replace back replacementChars
			v = v.replace(replacePat, sepChar);

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

			return val;
		});

	return queryArr;
}

module.exports = parse;
