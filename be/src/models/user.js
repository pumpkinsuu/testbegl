const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            require: true,
        },
        birthdate: {
            type: Date,
            require: true,
        },
    },
    {
        timestamps: true,
        collection: 'User'
    },
);
userSchema.index({'$**': 'text'});
userSchema.statics.searchText = async (value) => {
    return User.find({$text: {$search: value}});
};

const User = mongoose.model('User', userSchema);

module.exports = User;