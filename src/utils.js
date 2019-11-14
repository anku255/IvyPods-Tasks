import axios from "axios";

export const fetchUsers = () => {
  return new Promise(async resolve => {
    const res = await axios.get("https://randomuser.me/api/?results=10");
    return resolve(
      res.data.results.map(user => ({
        email: user.email,
        name: Object.values(user.name).join(" "),
        photo: user.picture.medium,
        username: user.login.username,
        id: user.login.uuid
      }))
    );
  });
};
