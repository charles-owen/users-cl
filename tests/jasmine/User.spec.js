import {User} from '../../js/Users/User';

 describe('User', function() {
     it('roles', function() {
         expect(true).toBeTruthy();

         let user = new User();

         user.setUserRole(User.STAFF);

         expect(user.atLeast(User.GUEST)).toBeTruthy();
         expect(user.atLeast(User.USER)).toBeTruthy();
         expect(user.atLeast(User.STAFF)).toBeTruthy();
         expect(user.atLeast(User.ADMIN)).toBeFalsy();
     });
});