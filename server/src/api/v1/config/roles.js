import { AccessControl } from 'accesscontrol';
const ac = new AccessControl();


export const roles = (() => {
    // -------------------------------------------------- user role -------------------------------------------------- //
    ac.grant('user')
        // self profile
        .createOwn('profile', [
            'email_active', 'firstName', 'lastName', 'email', 'password',
            'gander', 'birthday', 'phoneNumber', 'avatar_url', 'list_frind', 'list_blocked', 'conversation',
        ])
        .readOwn('profile', [
            'firstName', 'lastName', 'email', 'password', 'gander', 'birthday', 'phoneNumber',
            'avatar_url', 'list_frind', 'list_blocked', 'conversation', 'tokenAuth', 'role', 'id'
        ])
        .updateOwn('profile', [
            'firstName', 'lastName', 'email', 'password', 'gander', 'birthday', 'phoneNumber',
            'avatar_url', 'list_frind', 'list_blocked', 'conversation'
        ])
        .deleteOwn('profile')
        // another profile
        .readAny('profile', ['*'])
        //     'id', 'firstName', 'lastName', 'email', 'password', 'gander', 'birthday', 'phoneNumber',
        //     'avatar_url', 'list_frind', 'list_blocked', 'conversation', 'createdAt', 'role'
        // ])


        .readAny('role', ['user', 'admin', 'superAdmin'])
        .createAny('role', ['user', 'admin', 'superAdmin'])
        .updateAny('role', ['user', 'admin', 'superAdmin'])
        .deleteAny('role', ['user', 'admin', 'superAdmin'])
        .readAny('queryWhere', ['createAt', 'role', 'gander', 'age'])
        
        .readOwn('blocked', ['userId', 'blockedUserId'])
        .readAny('blocked', ['userId', 'blockedUserId'])
        .createOwn('blocked', ['userId', 'blockedUserId'])
        .deleteOwn('blocked')

        
        .readOwn('conversation', ['id', 'userId', 'members', 'createdAt'])
        .createOwn('conversation', ['*'])
        .deleteOwn('conversation')

    // -------------------------------------------------- admin role -------------------------------------------------- //
    ac.grant('admin')
        // self profile
        .createOwn('profile', [
            'email_active', 'firstName', 'lastName', 'email', 'password',
            'gander', 'birthday', 'phoneNumber', 'avatar_url', 'list_frind', 'list_blocked', 'conversation',
            'role'
        ])
        .readOwn('profile', [
            'firstName', 'lastName', 'email', 'password', 'gander', 'birthday', 'phoneNumber',
            'avatar_url', 'list_frind', 'list_blocked', 'conversation', 'tokenAuth', 'role', 'id'
        ])
        .updateOwn('profile', [
            'firstName', 'lastName', 'email', 'password', 'gander', 'birthday', 'phoneNumber',
            'avatar_url', 'list_frind', 'list_blocked', 'conversation'
        ])
        .deleteOwn('profile')
        // another profile
        .createAny('profile', [
            'email_active', 'firstName', 'lastName', 'email', 'password',
            'gander', 'birthday', 'phoneNumber', 'avatar_url', 'list_frind', 'list_blocked', 'conversation',
        ])
        .readAny('profile', [
            'id', 'firstName', 'lastName', 'email', 'password', 'gander', 'birthday', 'phoneNumber',
            'avatar_url', 'list_frind', 'list_blocked', 'conversation', 'role', 'createdAt'
        ])
        .updateAny('profile', [
            'firstName', 'lastName', 'email', 'password', 'gander', 'birthday', 'phoneNumber',
            'avatar_url', 'list_frind', 'list_blocked', 'conversation', 'role'
        ])
        .deleteAny('profile')
        // .createAny('admin')
        .createAny('user', ['*'])
        .updateAny('user', ['*'])
        .updateAny('admin', ['*'])

    
    // -------------------------------------------------- super role -------------------------------------------------- //



    // -------------------------------------------------- guest role -------------------------------------------------- //




    return ac;
})();



