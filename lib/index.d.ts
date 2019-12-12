/**
 * A library for creating, updating, reading, and deleting key-value pairs for NodeJs
 *
 * Author: Kishan Nareshpal Jadav | https://kishannareshpal.github.io
 */
export default class Pairs {
    private settingsFilePath;
    /**
     * Initializes setttings.
     * Optional configurations on where to save and what the PairsJS file should be called, are all available.
     *
     * @param dir_path the directory where the settings file should be stored. (@default ./ root dir)
     * @param name the name of the settings file. (@default pairs.json)
     */
    constructor(dir_path?: string, name?: string);
    /**
     * Returns the settings as a json.
     */
    toJSON(): JSON;
    /**
     * Add a new pair.
     *
     * @param key
     * @param value
     * @param allowsOverwrite @default true overwrites the value of an existing pair with the same key, if found, ofc.
     * @throws if found a pair with the same key, and, allowsOverwrite is set to false.
     *
     */
    add(key: string, value: any, allowsOverwrite?: boolean): void;
    /**
     * Removes a pair, by the key.
     *
     * @param key the key of the pair you want to remove
     * @returns true if succesfull, false if it could not be deleted.
     * @throws if no pair matching the the provided key was found.
     */
    remove(key: string): boolean;
    /**
     * Updates the value of a pair, by the key.
     *
     * @param key the key of the pair you want the value to be updated.
     * @param newValue the new value for that pair
     * @param allowsAdding allows the creation of a new pair if no pair found with the provided key.
     * @throws if no pair with the provided key is found and the allowsAdding option is set to false.
     */
    updateValue(key: string, newValue: any, allowsAdding?: boolean): boolean;
    /**
     * Renames a key of an existing pair without modifying its value.
     *
     * @param key the key you want to rename
     * @throws if no pair is found with the provided key.
     */
    renameKey(key: string, renamedKey: string): void;
    /**
     * Checks if a pair with the key exists.
     *
     * @param key the key of the pair.
     * @returns true if found, otherwise false.
     */
    has(key: string): boolean;
    /**
     * Get the value of a pair by it's key.
     *
     * @param key the key of the pair of which you want the value.
     * @returns the value of the pair found.
     *          the defaultValue (if provided), when no pair is found.
     *          undefined if no pair is found and no defaultValue is provided.
     */
    get(key: string, callbackFn: any, defaultValue?: any): any;
}
