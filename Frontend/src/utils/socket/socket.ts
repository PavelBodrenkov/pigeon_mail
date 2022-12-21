import * as io from "socket.io-client";

const socket:any = io.connect('http://localhost:8080')

export default socket