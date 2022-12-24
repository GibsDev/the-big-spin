import {useContext, useEffect} from "react";
import {SocketContext} from "./App";

const Wheel = () => {
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('spin', () => {
            console.log('spinning');
        });
    });
};

export default Wheel;