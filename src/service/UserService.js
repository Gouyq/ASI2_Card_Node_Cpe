var Service =  require("./Service");


class UserService extends Service {
    static instance  = null;
    constructor() {
        // Noter serveur.
        //const domain = "http://localhost:8081"

        // Serveur de Jacques.
        const domain = "https://asi2-backend-market.herokuapp.com"

        super(domain)
    }

    static getInstance() {
        if(this.instance == null) {
            this.instance = new UserService()
        }

        return this.instance
    }

    getUsers(userLogin) {
        const url = `/users`
        const method = "GET"

        return super.request(url, method)
    }
}

module.exports = new UserService();