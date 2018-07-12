/**
 * @file
 * Represents a user in the system
 */

let User = function(json) {

    /// The user role - local so we can protect it with getter/setter
    let role = 'G';

    // Installed membership
    let member = null;

    if(json !== undefined) {
        if(typeof(json) === 'string') {
            json = JSON.parse(json)
        }

        this.id = json.id;
        role = json.role;
        this.name = json.name;
        this.email = json.email;
        this.userId = json.user;

        // Installed membership
        member = User.instantiateMember(json);
        if(member !== null) {
            member.user = this;
        }

    } else {
        this.id = 0;
        role = 'G';
        this.name = '';
        this.email = '';
        this.userId = '';
    }

    Object.defineProperty(this, 'member', {
        get() {return member}
    });

    /**
     * Return the effective role for the user.
     * This is the user's role unless the user
     * has a membership, in which case it is the
     * membership role.
     *
     * @returns {string}
     */
    this.role = function() {
        if(member !== null) {
            return member.role();
        }

        return role;
    }

    this.setUserRole = function(_role) {
        role = _role;
    }

    this.userRole = function() {
        return role;
    }

    /**
     * Set the membership for this user
     * @param Membership member
     */
    this.setMember = function(_member) {
        member = _member;
        if(member !== null) {
            member.user = this;
        }
    }
}

User.GUEST = 'G';
User.USER = 'U';
User.STAFF = 'S';
User.ADMIN = 'A';


User.getUserRoles = function() {
    let roles = {};
    roles[User.GUEST] = {name: 'Guest', priority: 1};
    roles[User.USER] = {name: 'User', priority: 2};
    roles[User.STAFF] = {name: 'Staff', priority: 3};
    roles[User.ADMIN] = {name: 'Admin', priority: 4};

    return roles;
}

User.prototype.getUserRoles = function() {
    return User.getUserRoles();
}

/**
 * Get the roles for this user. Membership roles take priority
 * over roles for just a user who is not a member.
 */
User.prototype.getRoles = function() {
    let member = this.member;
    if(member !== null) {
        return member.getRoles();
    }

    return User.getUserRoles();
}

User.prototype.atLeast = function(atLeast) {
    let role = this.role();
    let roles = this.getRoles();
    if(roles.hasOwnProperty(atLeast)) {
        return roles[role].priority >= roles[atLeast].priority;
    } else {
        return false;
    }
}


User.prototype.getRolePriority = function(role) {
    let roles = this.getRoles();
    if(roles.hasOwnProperty(role)) {
        return roles[role].priority;
    }

    return 0;
}

User.prototype.userRoleName = function() {
    const roles = this.getUserRoles();
    let role = this.userRole();
    return roles[role].name;
}

User.prototype.roleName = function() {
    const roles = this.getRoles();
    let role = this.role();
    return roles[role].name;
}

User.compare = function(a, b) {
    let an = a.name.toLowerCase();
    let bn = b.name.toLowerCase();

    if(an < bn) {
        return -1;
    }

    if(an > bn) {
        return 1;
    }

    return a.id - b.id;
}

/**
 * Instantiate a Membership object for the user.
 * This will be replaced by a plugin that adds
 * support for memberships.
 * @param data normally in the format the PHP JSON representation
 * @returns {null}
 */
User.instantiateMember = function(data) {
    return null;
}

export default User;
export {User};