import * as io from "socket.io-client";

const SERVER = 'http://localhost:8080'
const socket:any = io.connect(SERVER, {
    auth: {
        token:localStorage.getItem('token')
    },
    query:{
        user_id:'123'
    }
})



export default socket