

const usersRoom = [];
const usersOnline = {}

console.log('usersRoom', usersRoom)

// Join user to chat
function newUser(id, username, user_id, room) {
    const user = { id, username, user_id, room };

    const findUser = usersRoom.find((item) => item.room === room && item.user_id === user_id)

    if(findUser) {
        findUser.id = id
    } else {
        usersRoom.push(user);
    }

    return user;
}

function onlineUser(user) {
    usersOnline[user] = 1
    return usersOnline
}

function offlineUser(user) {
    delete usersOnline[user]
    return usersOnline
}

// Get current user
function getActiveUser(id) {
    console.log('usersRoom', usersRoom)
    return usersRoom.find(user => user.id === id);
}

// User leaves chat
function exitRoom(id) {
    const index = usersRoom.findIndex(user => user.id === id);

    if (index !== -1) {
        return usersRoom.splice(index, 1)[0];
    }
}

// Get room users
function getIndividualRoomUsers(room) {
    return usersRoom.filter(user => user.room === room);
}

module.exports = {
    newUser,
    getActiveUser,
    exitRoom,
    getIndividualRoomUsers,
    onlineUser,
    offlineUser
};