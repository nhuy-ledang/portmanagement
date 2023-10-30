import axios from "axios";

const postCreateAmin = (name, job) => {
    return axios.post("/api/user", {name, job})
}

export {postCreateAmin};