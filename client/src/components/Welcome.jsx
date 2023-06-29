import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import BackendStatus from "./BackendStatus";
import Logout from "./Logout";
export default function Welcome(currentUser ) {
    const [userName, setUserName] = useState("");
    useEffect( () => {
        const local_func = async () => {
            setUserName(
                await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                ).username
            );
        }
        local_func();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container>
            <img src={Robot} alt="" />
            <h1>
                Welcome, <span>{userName}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
            <BackendStatus />
            {/* <Logout/> */}
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
