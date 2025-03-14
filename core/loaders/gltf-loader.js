const path = require('path');
const loaderUtils = require('loader-utils');
const fs = require('fs');

const isObject = (value) => typeof value === 'object' && value !== null;
const isDataURI = (value) => /^data:/i.test(value);

/**
 * A utility function that allows mapping the value for a given key in an object
 * [in place](https://en.wikipedia.org/wiki/In-place_algorithm).
 *
 * @remarks
 * This function recursively iterates through every key in the object.
 * Once a key strictly equal to the given key is found, the callback function
 * is invoked, and its return value (or resolved value) is then set as the new value
 * for that entry.
 *
 * @param {unknown} obj - The object to mutate.
 * @param {string} key - The key to match against.
 * @param {(value: unknown) => Promise<any>} callback
 * The callback that either returns the mapped value, or returns a Promise
 * that resolves to the new value.
 */
async function mapDeep(obj, key, callback) {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      await mapDeep(item, key, callback);
    }
  } else if (isObject(obj)) {
    for (const [k, v] of Object.entries(obj)) {
      if (k === key) {
        obj[k] = await callback(v);
      } else {
        await mapDeep(v, key, callback);
      }
    }
  }
}

/**
 * @typedef {import(".").GLTFLoaderDefinition} GLTFLoader
 * @this {ThisParameterType<GLTFLoader>}
 * @type {GLTFLoader}
 */
async function gltfLoader(content) {
  // Destructure loader options and set default values:
  const {
    // inline = true,
    // useRelativePaths = true,
    // uriResolver = (module) => String(module.default ?? module),
    // fileName = '[name].[hash:8].[ext]',
    // filePath = '/static/media',
    // publicPath = this._compilation?.outputOptions.publicPath ?? '/',
    context = this.context
  } = this.getOptions();

  // Parse the glTF data:

  // console.log(content);
  const data = JSON.parse(content);
  // console.log(data);
  // Iterate over the object and map any URIs:
  await mapDeep(data, 'uri', async (uri) => {
    // Resolve early if the URI cannot be imported as a module:
    if (!loaderUtils.isUrlRequest(uri)) return uri;
    // If the URI is a data URI, print a warning and resolve with the original value:
    if (isDataURI(uri)) {
      return uri;
    }

    const requestPath = path.join(context, uri);
    // console.log(requestPath);
    const binContent = fs.readFileSync(requestPath, { encoding: 'base64' });
    return `data:application/octet-stream;base64,${binContent}`;
  });
  // Stringify the updated data:
  const updatedContent = JSON.stringify(data);
  // Interpolate any file name tokens:
  // const interpolatedName = loaderUtils.interpolateName(this, fileName, { content: updatedContent });
  // Join the file path and interpolated name:
  // const interpolatedPath = path.join(filePath, interpolatedName);
  // Emit the file:
  // this.emitFile(interpolatedPath, updatedContent, null);
  // Join all paths together:
  // const fullPath = path.join(publicPath, interpolatedPath);
  // Lastly, resolve with either the JSON data or the full output path:
  // return `export default ${inline ? updatedContent : `"${fullPath}"`}`;
  return `export default ${updatedContent}`;
}

module.exports = gltfLoader;
