const express = require('express');
const user_router = express.Router();
const {
    getUsers,
    getUserByData,
    addUser,
    deleteUserById,
    updateUser,
} = require('../database/userQuery');
const authenMiddleware= require('../middleware/auhthentication');
const { validateUser, validateUpdate } = require('../middleware/validate');
const getCreatedBy = require('../middleware/getCreatedBy');


user_router.get('/',authenMiddleware,async (req, res) =>{
    try {
        const page_Size = parseInt(req.query.pageSize) || 10;
        const {page = 1, email='', fullname='' } = req.body;

        const { users, totalPage, totalPageData} = await getUsers(
            page,
            page_Size,
            email,
            fullname
        );
        return res.status(200).json({
            status: 'success',
            data:users,
            meta:{
                currentPage: parseInt(page),
                totalPage,
                pageSize: page_Size,
                totalPageData
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:'failed',
            message:'Error retrieving users'
        });
    }
})

user_router.get('/:id',authenMiddleware, async(req, res) =>{
    const id = parseInt(req.params.id);
    try {
        const user = await getUserByData('id',id);
        return res.status(200).json({
            status:'success',
            data:user
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            status:'failed',
            message:'User not found'
        });
    }
})

user_router.post('/',authenMiddleware, validateUser,getCreatedBy, async (req, res) =>{
    const { fullname, gender, age, email, username, password, created_by } = req.body;
    const user = await getUserByData('username',username);
    if(user){
        res.status(400).json({
            status: 'failed',
            message:'User already exists'
        })
    } else {
        const created_at = new Date();
        try {
            const user = await addUser({
                fullname,
                gender,
                age,
                created_at,
                created_by,
                email,
                username,
                password,
            })
            return res.status(200).json({
                status:'success',
                data:user
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                status:'failed',
                message:'Error retrieving users'
            })
        }
    }
})


user_router.delete('/:id', authenMiddleware, async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await deleteUserById(id);
        return res.status(200).json({
            status:'success',
            message:'User deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(404).json({
            status:'failed',
            message:'User not foun'
        })
    }
});


user_router.put('/:id', authenMiddleware,validateUpdate, async (req, res) => {
    const id = parseInt(req.params.id);
    const { fullname, gender, age } = req.body;

    try {
        await updateUser(id, { fullname, gender, age });
        return res.status(204).end();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status:'failed',
            message:'Error updating user'
        });
    }
});


module.exports = user_router;