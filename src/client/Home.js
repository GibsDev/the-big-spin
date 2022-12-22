import {useEffect} from 'react';

const Home = () => {

    useEffect(() => {
        console.log('Home page component loaded');
    });

    return <>
        <a href={'/board'}>Board</a>
        <a href={'/player1'}>Team 1</a>
        <a href={'/player2'}>Team 2</a>
        <a href={'/player3'}>Team 3</a>
    </>;
};

export default Home;