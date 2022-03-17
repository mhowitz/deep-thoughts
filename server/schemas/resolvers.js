const { User, Thought } = require('../models');

//parent: need to include as first argument, it is if we used nested resolvers to handle more complicated actions
//args: object of all of hte values passed into a qeury or mutation request as parmeters - we destructured username
//context: same data to access by all resolvers
//info extra info about an operations current state


//get all users 


const resolvers = {
    Query: {
       thoughts: async (parent, { username }) => {
           const params = username ? { username } : {};
           return Thought.find(params).sort({ createdAt: -1 })
       },
       thought: async(parent, { _id }) => {
           return Thought.findOne({ _id });
       },
       users: async () => {
        return User.find() 
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts')
    },
    user: async(parent, { username}) => {
        return User.findOne({ username }) 
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts')
    },
}
};


module.exports= resolvers;