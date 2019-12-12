"use strict";
/**
 * A library for creating, updating, reading, and deleting key-value pairs for NodeJs
 *
 * Author: Kishan Nareshpal Jadav | https://kishannareshpal.github.io
 */
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var pathjs = require("path");
var Pairs = /** @class */ (function () {
    /**
     * Initializes setttings.
     * Optional configurations on where to save and what the PairsJS file should be called, are all available.
     *
     * @param dir_path the directory where the settings file should be stored. (@default ./ root dir)
     * @param name the name of the settings file. (@default pairs.json)
     */
    function Pairs(dir_path, name) {
        if (dir_path === void 0) { dir_path = './'; }
        if (name === void 0) { name = 'pairs.json'; }
        // place it in the root of the project
        if (!fs.existsSync(dir_path)) {
            // create the folder if not already.
            fs.mkdirSync(dir_path);
        }
        this.settingsFilePath = pathjs.join(dir_path, name);
        try {
            if (!fs.existsSync(this.settingsFilePath)) {
                // settings file does not exist, create a new one.
                fs.writeFile(this.settingsFilePath, '{}', function (err) {
                    if (err)
                        throw err;
                });
            }
            // settings file exists.
        }
        catch (err) {
            // error occured while checking the file, or by creating a new one. Inspect the log for details.
            throw err;
        }
    }
    /**
     * Returns the settings as a json.
     */
    Pairs.prototype.toJSON = function () {
        try {
            var data = fs.readFileSync(this.settingsFilePath, 'utf8');
            var json = JSON.parse(data);
            return json;
        }
        catch (error) {
            // error reading the settings file.
            return JSON.parse("{}");
        }
    };
    /**
     * Add a new pair.
     *
     * @param key
     * @param value
     * @param allowsOverwrite @default true overwrites the value of an existing pair with the same key, if found, ofc.
     * @throws if found a pair with the same key, and, allowsOverwrite is set to false.
     *
     */
    Pairs.prototype.add = function (key, value, allowsOverwrite) {
        if (allowsOverwrite === void 0) { allowsOverwrite = true; }
        var settings = this.toJSON();
        if (settings[key]) {
            // a key with the same name is found.
            if (allowsOverwrite) {
                // overwrite the value of the key with the new one.
                this.updateValue(key, value);
            }
            else {
                // should not overwrite the value, throw an error.
                throw "Cannot add a pair with this key as it is already defined. [If you want to overwrite the value of this key, either set the allowsOverwrite option to true, or use pairjs.updateValue()]";
            }
        }
        else {
            settings[key] = value;
            fs.writeFileSync(this.settingsFilePath, JSON.stringify(settings, null, 2));
        }
    };
    /**
     * Removes a pair, by the key.
     *
     * @param key the key of the pair you want to remove
     * @returns true if succesfull, false if it could not be deleted.
     * @throws if no pair matching the the provided key was found.
     */
    Pairs.prototype.remove = function (key) {
        var settings = this.toJSON();
        if (settings[key]) {
            // found a pair with the passed key.
            // procceed on to removing.
            var isDeleted = delete settings[key];
            fs.writeFileSync(this.settingsFilePath, JSON.stringify(settings, null, 2));
            return isDeleted; // success
        }
        else {
            // did not find a pair with the provided key.
            throw "No pair found with the key `" + key + "`. Could not remove.";
        }
    };
    /**
     * Updates the value of a pair, by the key.
     *
     * @param key the key of the pair you want the value to be updated.
     * @param newValue the new value for that pair
     * @param allowsAdding allows the creation of a new pair if no pair found with the provided key.
     * @throws if no pair with the provided key is found and the allowsAdding option is set to false.
     */
    Pairs.prototype.updateValue = function (key, newValue, allowsAdding) {
        if (allowsAdding === void 0) { allowsAdding = true; }
        var settings = this.toJSON();
        if (settings[key]) {
            // found a pair matching the provided key.
            // update the value
            settings[key] = newValue;
            return true;
        }
        else {
            // no pair found with the provided key.
            if (allowsAdding) {
                // create a new pair.
                this.add(key, newValue);
                return false;
            }
            else {
                // should not create a new pair if no pair found.
                // just throw an error.
                throw "No pair found with the key `" + key + "`. Could not update.";
            }
        }
    };
    /**
     * Renames a key of an existing pair without modifying its value.
     *
     * @param key the key you want to rename
     * @throws if no pair is found with the provided key.
     */
    Pairs.prototype.renameKey = function (key, renamedKey) {
        if (!this.has(key)) {
            // the key to be updated, does not exist in your pairs.json file
            throw "No pair found with the key `" + key + "`. Cannot rename.";
        }
        // found a pair matching the key. rename its key.
        var settings = this.toJSON();
        var updatedKeyJson = JSON.parse(JSON.stringify(settings).split('"' + key + '":').join('"' + renamedKey + '":'));
        fs.writeFileSync(this.settingsFilePath, JSON.stringify(updatedKeyJson, null, 2));
    };
    /**
     * Checks if a pair with the key exists.
     *
     * @param key the key of the pair.
     * @returns true if found, otherwise false.
     */
    Pairs.prototype.has = function (key) {
        var settings = this.toJSON();
        return settings[key] ? true : false;
    };
    /**
     * Get the value of a pair by it's key.
     *
     * @param key the key of the pair of which you want the value.
     * @returns the value of the pair found.
     *          the defaultValue (if provided), when no pair is found.
     *          undefined if no pair is found and no defaultValue is provided.
     */
    Pairs.prototype.get = function (key, callbackFn, defaultValue) {
        var settings = this.toJSON();
        var value = settings[key];
        callbackFn(key);
        return value ? value : defaultValue;
    };
    return Pairs;
}());
exports.default = Pairs;
