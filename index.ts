/**
 * A library for creating, updating, reading, and deleting key-value pairs for NodeJs
 * 
 * Author: Kishan Nareshpal Jadav | https://kishannareshpal.github.io
 */

import * as fs from 'fs';
import * as pathjs from 'path'

export default class Pairs {    
    
    private pairsFilePath: string;
    
    /**
     * Initializes setttings. 
     * Optional configurations on where to save and what the PairsJS file should be called, are all available.
     * 
     * @param dir_path the directory where the settings file should be stored. (@default ./ root dir)
     * @param name the name of the settings file. (@default pairs.json)
     */
    constructor(dir_path: string = './', name: string = 'pairs.json') {
        // place it in the root of the project
        if (!fs.existsSync(dir_path)){
            // create the folder if not already.
            fs.mkdirSync(dir_path);
        }

        this.pairsFilePath = pathjs.join(dir_path, name)

        try {
            if (!fs.existsSync(this.pairsFilePath)) {
                // settings file does not exist, create a new one.
                fs.writeFile(this.pairsFilePath, '', (err) => {
                    if (err) throw err;
                });
            }

            // settings file exists.

        } catch(err) {
            // error occured while checking the file, or by creating a new one. Inspect the log for details.
            throw err;
        }
    }


    /**
     * Returns the settings as a json.
     */
    toJSON(): JSON {
        try {
            let data = fs.readFileSync(this.pairsFilePath, 'utf8')
            let json = JSON.parse(data)
            return json
            
        } catch (error) {
            // error reading the settings file.
            return JSON.parse("{ }")
        }
    }


    /**
     * Add a new pair.
     * 
     * @param key 
     * @param value 
     * @param allowsOverwrite @default true overwrites the value of an existing pair with the same key, if found, ofc.
     * @throws if found a pair with the same key, and, allowsOverwrite is set to false.
     *                  
     */
    add(key: string, value: any, allowsOverwrite: boolean = true): void {
        let pairs: any = this.toJSON();

        if (pairs[key]) {
            // a key with the same name is found.
            if (allowsOverwrite) {
                // overwrite the value of the key with the new one.
                this.updateValue(key, value);

            } else {
                // should not overwrite the value, throw an error.
                throw "Cannot add a pair with this key as it is already defined. [If you want to overwrite the value of this key, either set the allowsOverwrite option to true, or use pairjs.updateValue()]";
            }
            
        } else {
            pairs[key] = value;
            fs.writeFileSync(this.pairsFilePath, JSON.stringify(pairs, null, 2))
        }
    }


    /**
     * Removes a pair, by the key.
     * 
     * @param key the key of the pair you want to remove
     * @returns true if succesfull, false if it could not be deleted.
     * @throws if no pair matching the the provided key was found.
     */
    remove(key: string): boolean {
        let pairs: any = this.toJSON();

        if (pairs[key]) {
            // found a pair with the passed key.
            // procceed on to removing.
            let isDeleted = delete pairs[key];
            fs.writeFileSync(this.pairsFilePath, JSON.stringify(pairs, null, 2))
            return isDeleted; // success

        } else {
            // did not find a pair with the provided key.
            throw "No pair found with the key `" + key + "`. Could not remove.";
        }
    }


    /**
     * Updates the value of a pair, by the key.
     * 
     * @param key the key of the pair you want the value to be updated.
     * @param newValue the new value for that pair
     * @param allowsAdding allows the creation of a new pair if no pair found with the provided key.
     * @throws if no pair with the provided key is found and the allowsAdding option is set to false.
     */
    updateValue(key: string, newValue: any, allowsAdding: boolean = true): boolean {
        let pairs: any = this.toJSON()

        if (pairs[key]) {
            // found a pair matching the provided key.
            // update the value
            pairs[key] = newValue;
            fs.writeFileSync(this.pairsFilePath, JSON.stringify(pairs, null, 2));
            return true;

        } else {
            // no pair found with the provided key.
            if (allowsAdding) {
                // create a new pair.
                this.add(key, newValue);
                return false;

            } else {
                // should not create a new pair if no pair found.
                // just throw an error.
                throw "No pair found with the key `" + key + "`. Could not update.";
            }
        }

    }

    /**
     * Renames a key of an existing pair without modifying its value.
     * 
     * @param key the key you want to rename
     * @throws if no pair is found with the provided key.
     */
    renameKey(key: string, renamedKey: string) {
        if (!this.has(key)) {
            // the key to be updated, does not exist in your pairs.json file
            throw "No pair found with the key `" + key + "`. Cannot rename.";
        }

        // found a pair matching the key. rename its key.
        let settings: any = this.toJSON();
        let updatedKeyJson = JSON.parse(JSON.stringify(settings).split('"' + key + '":').join('"' + renamedKey + '":'));
        fs.writeFileSync(this.pairsFilePath, JSON.stringify(updatedKeyJson, null, 2));
    }


    /**
     * Checks if a pair with the key exists.
     * 
     * @param key the key of the pair.
     * @returns true if found, otherwise false.
     */
    has(key: string): boolean {
        let settings: any = this.toJSON();
        return settings[key] ? true : false;
    }


    /**
     * Get the value of a pair by it's key.
     * 
     * @param key the key of the pair of which you want the value.
     * @returns the value of the pair found.
     *          the defaultValue (if provided), when no pair is found.
     *          undefined if no pair is found and no defaultValue is provided.
     */
    get(key: string, callbackFn: (value: any) => any, defaultValue?: any): any {
        let settings: any = this.toJSON();
        let value = settings[key];
        if (callbackFn) {
            return callbackFn(value)
        } else {
            return value ? value : defaultValue;
        }
    }
}