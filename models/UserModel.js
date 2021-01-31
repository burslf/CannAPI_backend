const User = require('../queries/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.addUserToDb = async (user) => {
    const passwordHash = getPasswordHash(user.password);
    user.password = passwordHash;
    const userToInsert = createUserObjectToInsert(user);
    const insertionResult = await User.addUser(userToInsert);
    if(insertionResult){
        const insertedUser = insertionResult.ops[0];
        return insertedUser;
    }else{
        return null;
    }  
}

const getPasswordHash = (password) => {
    return bcrypt.hashSync(password, saltRounds);
}

const createUserObjectToInsert = (user) => {
    return {
        email: user.email,
        password: user.password,
        username: user.username,
        role: 'user'
    }
}

exports.compareUserPassword = (passwordFromLoginForm, passwordFromDb) => {
    if(bcrypt.compareSync(passwordFromLoginForm, passwordFromDb)){
        return true;
    }else{
        return false;
    }
}