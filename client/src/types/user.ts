export type User = {
  name: string,
  pointReward: number,
  assignedChores: string[],
  isCurrent: boolean,
  profilePic: string,
}

//TODO not using
export interface UserProps {
  userItem: User,
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  currentUser: User,
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>,
  userList: User[],
  setUserList: React.Dispatch<React.SetStateAction<User[]>>,
}

//using
export interface UserItemProps {
  userItem: User,
}

//using
export interface LandingPageProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>,
  setUserList: React.Dispatch<React.SetStateAction<User[]>>,
}

//TODO notUsing
// export interface UserAppProps {
//   user: User | null,
//   setUser: React.Dispatch<React.SetStateAction<User | null>>
// }

//user
export interface ChoreListProps {
  currentUser: User,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>,
  userList: User[],
  setUserList: React.Dispatch<React.SetStateAction<User[]>>,
}

//using
export interface LeaderboardProps {
  userList: User[],
}

//using
export interface AddNewChoreUserProps {
  currentUser: User,
}

//using
export interface ChoreItemUserProp {
  currentUser: User,
  setUserList: React.Dispatch<React.SetStateAction<User[]>>,
}