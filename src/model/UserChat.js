class UserChat {
    constructor(id, lastName, surName, socketId) {
        this.id = id
        this.lastName = lastName
        this.surName = surName
        this.socketId = socketId;
    }
}

module.exports = { UserChat };