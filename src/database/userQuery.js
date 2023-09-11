const knex = require('./connection');
const hashPassword = require('../middleware/hashPassword');

const getUsers = async (page, pageSize, email, fullname) => {
    const offset = (page - 1) * pageSize;
    const users = await knex('users')
        .select('*')
        .where('email', 'like', `%${email}%`)
        .andWhere('fullname', 'like', `%${fullname}%`)
        .offset(offset)
        .limit(pageSize);

    const totalPageData = await knex('users')
        .count('id as count')
        .where('email', 'like', `%${email}%`)
        .andWhere('fullname', 'like', `%${fullname}%`);

    const totalPages = Math.ceil(totalPageData[0].count / pageSize);

    return {
        users,
        totalPages,
        totalPageData: totalPageData[0].count,
    };
};

const getUserByData = async (type, data) => {
    const [users] = await knex('users').select('*').where(type, data);

    const userPermissions = await knex('Permissions')
        .select('Permissions.permission_type')
        .join(' roles_permissions', 'roles_permissions.id_permission', 'Permissions.id_permission')
        .join('roles', 'roles.id_role', 'roles_permissions.id_role')
        .join('users_roles as ur', 'ur.id_role', 'roles.id_role')
        .join('users', 'users.id', 'ur.id_user')
        .where(type, data);

    console.log('userPermissions',userPermissions);

    const roleNames = userPermissions.map((row) => row.permission_type);

    users.permissions = roleNames;
    console.log(users.permissions);
    if (!users) {
        return;
    }
    return users;
};

const addUser = async (userData) => {
    const { fullname, gender, age, email, username, password, created_by } =
        userData;
    const created_at = new Date();

    const hashedPassword = hashPassword(password);
    console.log(hashedPassword.pass);
    try {
        const user = await knex('users').insert({
            fullname,
            gender,
            age,
            created_at,
            created_by,
            email,
            username,
            password: hashedPassword.pass,
            salt: hashedPassword.salt,
        });
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Error adding user');
    }
};

const deleteUserById = async (id) => {
    try {
        const user = await knex('users').where('id', id).del();

        if (user === 0) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Error deleting user');
    }
};

const updateUser = async (id, newUser) => {
    const { fullname, gender, age } = newUser;
    try {
        const result = await knex('users')
            .where('id', id)
            .update({ fullname, gender, age });

        if (result === 0) {
            throw new Error('User with id ${id} not found');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error updating user');
    }
};

module.exports = {
    getUsers,
    getUserByData,
    addUser,
    deleteUserById,
    updateUser,
};
