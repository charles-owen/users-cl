/**
 * @file
 * A membership associated with a user.
 *
 * This is a base object that will be inherited by
 * actual membership objects.
 */

var Membership = function() {

    /// The User object for this membership
    this.user = null;
}

export {Membership};
