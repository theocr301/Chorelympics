import { Types } from 'mongoose';

export type User = {
  _id: Types.ObjectId,
  name: string,
  pointReward: number,
  assignedChores: Types.ObjectId[],
  isCurrent: boolean,
  profilePic: string,
}

export type Chore = {
  _id: Types.ObjectId,
  name: string,
  difficulty: 'easy' | 'medium' | 'hard',
  duration: number,
  isDone: boolean,
  pointReward: number,
  assignee: Types.ObjectId | User | null,
}

export interface LandingPageProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>,
  setUserList: React.Dispatch<React.SetStateAction<User[]>>,
}

export interface ChoreListProps {
  currentUser: User,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>,
  userList: User[],
  setUserList: React.Dispatch<React.SetStateAction<User[]>>,
  choreList: Chore[],
  setChoreList: React.Dispatch<React.SetStateAction<Chore[]>>,
}

export interface AddNewChoreProps {
  onClose: () => void;
  currentUser: User,
  setChoreList: React.Dispatch<React.SetStateAction<Chore[]>>,
}

export interface ChoreItemProps {
  currentUser: User,
  setUserList: React.Dispatch<React.SetStateAction<User[]>>,
  choreItem: Chore,
  setChoreList: React.Dispatch<React.SetStateAction<Chore[]>>
}

export interface LeaderboardProps {
  userList: User[],
}

export interface UserItemProps {
  userItem: User,
}