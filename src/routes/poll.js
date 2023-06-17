const express = require('express');
const poll_router = express.Router();
const authenMiddleware = require('../middleware/auhthentication');
const getCreatedBy = require('../middleware/getCreatedBy');
const {
    getPolls,
    addPoll,
    deletePollById,
    getPollById,
    updatePoll,
    updateOption,
    deleteOption,
    createOption,
    checkedOption,
    unCheckedOption,
} = require('../database/pollQuery');

poll_router.get('/', authenMiddleware, async (req, res) => {
    try {
        // const { title = '' } = req.query;
        const polls = await getPolls();
        return res.status(200).json({
            status: 'success',
            data: polls,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving polls',
        });
    }
});

poll_router.get('/:id', authenMiddleware, async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const poll = await getPollById(id);
        return res.status(200).json({
            status: 'success',
            data: poll,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving polls',
        });
    }
});

poll_router.post('/', authenMiddleware, getCreatedBy, async (req, res) => {
    try {
        const { title, question, options, created_by } = req.body;
        const polls = await addPoll({ title, question, options, created_by });
        return res.status(200).json({
            status: 'success',
            data: polls,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving polls',
        });
    }
});

poll_router.delete('/:id', authenMiddleware, async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await deletePollById(id);
        return res.status(200).json({
            status: 'success',
            message: 'Poll deleted successfully!',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving polls',
        });
    }
});

poll_router.put('/:id', authenMiddleware, async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, question } = req.body;
    try {
        await updatePoll(id, { title, question });
        return res.status(204).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving polls',
        });
    }
});

poll_router.put('/option/:idOption', authenMiddleware, async (req, res) => {
    const idOption = parseInt(req.params.idOption);

    const { content } = req.body;

    try {
        const option = await updateOption(idOption, { content });
        return res.status(204).json({
            status: 'success',
            data: option,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving option',
        });
    }
});

poll_router.delete('/option/:id', authenMiddleware, async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await deleteOption(id);
        return res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving option',
        });
    }
});

poll_router.post(
    '/option',
    authenMiddleware,
    getCreatedBy,
    async (req, res) => {
        const { id_poll, content, created_by } = req.body;
        try {
            const result = await createOption({ id_poll, content, created_by });
            return res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'failed',
                message: 'Error retrieving option',
            });
        }
    }
);

poll_router.post(
    '/chooseOption/:id',
    authenMiddleware,
    getCreatedBy,
    async (req, res) => {
        const id = parseInt(req.params.id);
        const { created_by } = req.body;
        try {
            const result = await checkedOption(id,{created_by});
            if(result === true)
            {
                await unCheckedOption(id);
                return res.status(200).json({
                    status: 'success',
                    message: 'Unchecked option successful!'
                })
            }
            return res.status(200).json({
                status: 'success',
                message: 'Checked option successful!'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'failed',
                message: 'Error retrieving option',
            });
        }
    }
);

module.exports = poll_router;
