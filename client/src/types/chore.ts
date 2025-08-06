export type Chore = {
  _id: string,
  name: string,
  difficulty: 'easy' | 'medium' | 'hard',
  duration: number,
  isDone: boolean,
  pointReward: number,
  assignee: string,
}

export interface ChoreProps {
  choreItem: Chore,
  choreList: Chore[],
  assignee: string,
  isDone: boolean,
  setChoreList: React.Dispatch<React.SetStateAction<Chore[]>>,
  choreName: string,
  setChoreName: React.Dispatch<React.SetStateAction<string>>,
  difficulty: "easy" | "medium" | "hard";
  setDifficulty: React.Dispatch<React.SetStateAction<"easy" | "medium" | "hard">>,
  onClose: () => void,
  user: string,
}
export interface ChoreItemProps {
  choreItem: Chore,
  // user: string,
  setChoreList: React.Dispatch<React.SetStateAction<Chore[]>>
}
export interface AddChoreProps {
  choreList: Chore[],
  assignee: string,
  isDone: boolean,
  setChoreList: React.Dispatch<React.SetStateAction<Chore[]>>,
  choreName: string,
  setChoreName: React.Dispatch<React.SetStateAction<string>>,
  difficulty: "easy" | "medium" | "hard";
  setDifficulty: React.Dispatch<React.SetStateAction<"easy" | "medium" | "hard">>,
  onClose: () => void,
  user: string,
}

export interface AddNewChoreProps {
  onClose: () => void,
}