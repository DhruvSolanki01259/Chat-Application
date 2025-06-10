import { useEffect, useState } from "react";
import { useUserStore } from "../src/store/userStore";

const useFetchUsers = () => {
  const { getUsers } = useUserStore();
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.log(`Error Caused in Fetching Users: ${error.message}`);
      }
    };
    fetchUsers();
    console.log(users);
  }, [getUsers, users]);

  return { users };
};

export default useFetchUsers;
