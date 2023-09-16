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

    if (!users) {
        return;
    }
    return users;
};

const getRoles = async (type, data) => {
    console.log('data', data);
    const userRole = await knex('roles')
        .select('roles.role_name')
        .join('users_roles as ur', 'ur.id_role', 'roles.id_role')
        .join('users', 'users.id', 'ur.id_user')
        .where(type, data);
    console.log('userRole', userRole);
    const rolesName = userRole.map((role) => role.role_name);

    return rolesName;
}

const addUser = async (userData) => {
    const { fullname, gender, age, email, username, password, urlImage, major, created_by, role } =
        userData;
    const created_at = new Date();

    const hashedPassword = hashPassword(password);
    console.log('urlImage',urlImage);
    try {
        const userId = await knex('users').insert({
            fullname,
            gender,
            age,
            created_at,
            created_by,
            email,
            username,
            password: hashedPassword.pass,
            salt: hashedPassword.salt,
            urlImage
        });

        await knex('user_major').insert({
            id_user: userId,
            id_major: major
        })        
        
        if(role === null || role === '3') {
            await knex('users_roles').insert({
                id_user: userId,
                id_role: 3
            })
        } else {
            await knex('users_roles').insert({
                id_user: userId,
                id_role: role
            })
        }
        return userId;
    } catch (error) {
        console.log(error);
        throw new Error('Error adding user');
    }
};

const deleteUserById = async (id) => {
    try {
        await knex('user_major').where('id_user', id).del();
        await knex('users_roles').where('id_user', id).del();
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
    const { fullname, gender, age, username } = newUser;
    try {
        const result = await knex('users')
            .where('id', id)
            .update({ fullname, gender, age, username });

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
    getRoles
};
