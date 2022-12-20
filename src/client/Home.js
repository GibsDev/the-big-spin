import {io} from 'socket.io-client';
import {useEffect} from 'react';

const socket = io('ws://localhost:3000');

const Home = () => {

    useEffect(() => {
        socket.emit('cool event', {hello: 'socket io'});
        console.log('Home page component loaded');
    });

    return <div>
        <a href={'board'}>Board</a>
        <a href={'/team1'}>Team 1</a>
        <a href={'/team2'}>Team 2</a>
        <a href={'/team3'}>Team 3</a>
    </div>;
};

export default Home;