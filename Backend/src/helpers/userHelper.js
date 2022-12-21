

const users = [];
const userOnline = {}

// Join user to chat
function newUser(id, username, user_id, room) {
    const user = { id, username, user_id, room };

    users.push(user);

    return user;
}

function onlineUser(user) {
    userOnline[user.id] = 1
    return userOnline
}

// Get current user
function getActiveUser(id) {
    return users.find(user => user.id === id);
}

// User leaves chat
function exitRoom(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get room users
function getIndividualRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    newUser,
    getActiveUser,
    exitRoom,
    getIndividualRoomUsers,
    onlineUser
};