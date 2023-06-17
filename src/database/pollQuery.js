const knex = require('./connection');

async function formatPolls(pollData) {
    const poll = {
        id_poll: pollData[0].id_poll,
        title: pollData[0].title,
        question: pollData[0].question,
        created_by: pollData[0].created_by,
        created_at: pollData[0].created_at,
        options: [],
    };

    for (const option of pollData) {
        if (option.id_option) {
            const users = await knex('user_option')
                .distinct('id_user')
                .where('id_option', option.id_option)
                .pluck('id_user');

            poll.options.push({
                id_option: option.id_option,
                content: option.content,
                created_by: option.created_by,
                users: users,
                userCount: users.length,
            });
        }
    }

    return poll;
}

const getPolls = async () => {
    const polls = await knex('poll')
        .select(
            'poll.id_poll',
            'poll.title',
            'poll.question',
            'poll.created_at',
            'poll.created_by',
            'options.id_option',
            'options.content',
            'options.created_by',
        )
        .leftJoin('options', 'poll.id_poll', 'options.id_poll')
        .groupBy('poll.id_poll', 'options.id_option');

    const pollIds = polls.map((poll) => poll.id_poll);
    const uniquePollIds = [...new Set(pollIds)];

    const result = [];
    for (const id of uniquePollIds) {
        const pollData = polls.filter((poll) => poll.id_poll === id);
        const formattedPoll = await formatPolls(pollData);
        result.push(formattedPoll);
    }

    return result;
};

const getPollById = async (pollId) => {
    try {
        // const poll = await knex('poll')
        //     .leftJoin('options', 'poll.id_poll', 'options.id_poll')
        //     .select(
        //         'poll.id_poll',
        //         'poll.title',
        //         'poll.question',
        //         'poll.created_at',
        //         'poll.created_by',
        //         'options.id_option',
        //         'options.content',
        //         'options.created_by',
        //     )
        //     .where('poll.id_poll', pollId)
        //     .groupBy('poll.id_poll', 'options.id_option')
        //     .first();

        const [poll] = await knex('poll').select('*')
        .where("id_poll",pollId)
        if (!poll) {
            // Poll with the specified ID was not found
            return null;
        }

        const formattedPoll = await formatPolls(poll);
        return formattedPoll;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const addPoll = async (pollData) => {
    const { title, question, options, created_by } = pollData;

    try {
        await knex.transaction(async (trx) => {
            // Thêm poll vào bảng poll và lấy ID của poll vừa thêm
            const [pollId] = await trx('poll').insert({
                title,
                question,
                created_at: new Date(),
                created_by
            });

            // Tạo một mảng optionData chứa thông tin của các option mới
            const optionData = options.map((option) => ({
                id_poll: pollId,
                content: option,
                created_by
            }));

            // Thêm các option vào bảng options
            await trx('options').insert(optionData);
        });
    } catch (error) {
        console.log(error);
    }
};

const deletePollById = async (id) => {
    try {
        await knex.transaction(async (trx) => {
            await trx('options').where('id_poll', id).del();
            const poll = await trx('poll').where('id_poll', id).del();

            if (poll === 0) {
                throw new Error('User not found');
            }
            return poll;
        });
    } catch (error) {
        console.log(error);
    }
};

const updatePoll = async (id,poll) =>{
    try {
        const {title,question} = poll;
        const result = await knex('poll').where('id_poll',id).update({title,question});
        if(result === 0){
            throw new Error('Poll with id ${id} not found');
        }
        return result
    } catch (error) {
        console.log(error);
    }
}

const updateOption = async(idOption, option) => {
    try {
        const {content} = option;
        const result = await knex('options')
        .where('id_option',idOption)
        .update({content});
        if(result === 0){
            throw new Error('Poll with id ${id} not found');
        }
        return result
    } catch (error) {
        console.log(error);
    }
}

const createOption = async(option) => {
    const {id_poll,content, created_by} = option;
    try {
        const option = await knex('options').insert({
            id_poll,
            content,
            created_at: new Date(),
            created_by
        })
        return option;
    } catch (error) {
        console.log(error);
    }
}

const deleteOption = async(id) =>{
    try {
        const option = await knex('options').where('id_option',id).del();

        if(option === 0){
            throw new Error('Option not found')
        }
        return option;
    } catch (error) {
        console.log(error);
        
    }
}

const checkedOption = async(id, user) =>{
    const {created_by} = user;
    try{
        const isChosen = await knex('user_option')
        .where("id_option", id)
        .where('id_user',created_by)
        .first();

        if(isChosen){
           return true;
        }
        const chooseOption = await knex('user_option').insert({
            id_user: created_by,
            id_option: id,
            created_at: new Date()
        })
        return chooseOption;
    } catch(error){
        console.log(error);
    }
}

const unCheckedOption = async (id) =>{
    try{
        const unChooseOption = await knex('user_option')
        .where("id_option",id)
        .del()
        return unChooseOption;
    } catch(error){
        console.log(error);
    }
}

module.exports = {
    getPollById,
    getPolls,
    deletePollById,
    addPoll,
    updatePoll,
    updateOption,
    createOption,
    deleteOption,
    checkedOption,
    unCheckedOption
};
