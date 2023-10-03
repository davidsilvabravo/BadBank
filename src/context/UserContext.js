import { createContext, useState } from "react";

//Sample Data
import users from "../data/user";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(users);
  const [savings, setSavings] = useState(users[0].savings);
  const [loggedInUser, setLoggedInUser] = useState("");

  return (
    <>
      <UserContext.Provider
        value={{ user, setUser, savings, setSavings, loggedInUser, setLoggedInUser }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

export default UserContext;
