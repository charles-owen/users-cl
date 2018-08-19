/**
 * @file
 * Permissions management component
 */

export const Permissions = function(data) {
	this.permissions = data;

	/**
	 * Determine the atLeast permission for a given
	 * configurable permission.
	 * @param tag Tag that defines the permission configuration
	 * @param def Default value if permission not set
	 * @returns {*}
	 */
	this.atLeast = function(tag, def) {
		if(this.permissions[tag] !== undefined) {
			return this.permissions[tag];
		}

		return def;
	}
}
