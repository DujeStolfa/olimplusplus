import ROLE from "../enums/Role";

interface User {
  userid: number;
  firstname: string;
  lastname: string;
  email: string;
  role: ROLE;
  passwordchanged: boolean;
}

export default User;