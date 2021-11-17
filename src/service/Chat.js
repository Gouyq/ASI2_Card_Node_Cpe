class Chat {
    constructor(name, socket, io){
        this.name = name;
        this.socket = socket;
        this.io = io;
    }

    listen(cb){
        this.socket.on(this.name, (msg) => {
            cb(msg)
        });
    }

    emit(msg){
        this.io.emit(this.name, msg);
    }
}

module.exports = Chat;