/**
 * Discovery module. [Assets Watson]
 * Copyright 2019 VIEWNEXT. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

/**
 * Load environment variables and dependencies.
 */
require('dotenv').config({ silent: true });
const constants = require('./constants.js');


/**
 * Initializes the DiscoveryV1 object with the appropriate configuration 
 * for proper operation.
 */
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
DiscoveryV1 = new DiscoveryV1({
  url: process.env.DISCOVERY_URL,
  version: process.env.DISCOVERY_VERSION_DATE,
  iam_apikey: process.env.DISCOVERY_IAM_APIKEY
});


/**
 * Public method that allows searches in Watson Discovery.
 * 
 * @param {*} query 
 * Text to search in discovery
 * @param {*} callback 
 * Callback to return the output, either error or the content of the search.
 */
function search(query, callback){
  DiscoveryV1.query({
    environment_id: process.env.DISCOVERY_ENVIRONMENT_ID,
    collection_id: process.env.DISCOVERY_COLLECTION_ID,
    configuration_id: process.env.DISCOVERY_CONFIGURATION_ID,
    natural_language_query : query,
  }, function (error, data) {
    if(error){
      console.log(error);
    }else{
      callback(removeDiacritics(JSON.stringify(data, false, 2)));
    }
  });
}


/**
 * Function responsible for cleaning a text string. To do this, eliminate 
 * tabulators, carriage returns, parentheses and non-alphanumeric characters.
 * @param {*} str 
 * String to be cleaned
 */
function removeDiacritics(str) {
  for (let i = 0; i < constants.default_diacritics_removal_map.length; i++) {
    str = str.replace(constants.default_diacritics_removal_map[i].letters, constants.default_diacritics_removal_map[i].base);
  }
  str = str.replace(/\t/g, " ");   //limpieza de tabuladores
  //str = str.replace(/\n/g, " "); //limpieza de retornos de carro
  str = str.replace(/\r/g, " ");
  str = str.replace(/\(. + ¿?\)/g, " "); //parentesis
  str = str.replace(/[^#-€ñç., a-zA-Z\d\s:]/g, " "); 	// non alphanumeric
  return str;
}


module.exports = {
  search: search,
};