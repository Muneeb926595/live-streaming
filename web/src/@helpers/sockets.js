import io from "socket.io-client";

const ENDPOINT = "https://streamily.herokuapp.com";
export const socket = io(ENDPOINT);
