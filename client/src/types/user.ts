export type User = {
  name: string,
  pointReward: number,
  assignedChores: string[],
  isCurrent: boolean,
  profilePic: string,
}

export interface UserProps {
  userItem: User,
  user: string,
  setUser: React.Dispatch<React.SetStateAction<string>>,
  currentUser: string,
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>,
  userList: User[],
  setUserList: React.Dispatch<React.SetStateAction<User[]>>,
}