export type Chore = {
  name: string,
  difficulty: 'Easy' | 'Medium' | 'Hard',
  duration: number,
  isDone: boolean,
  pointReward: number,
  assignee: string,
}

export interface ChoreProps {
  choreItem: Chore,
  setChoreItem: React.Dispatch<React.SetStateAction<Chore>>,
  choreList: Chore[],
  setChoreList: React.Dispatch<React.SetStateAction<Chore[]>>,
  choreName: string,
  setChoreName: React.Dispatch<React.SetStateAction<string>>,
  difficulty: string,
  setDifficulty: React.Dispatch<React.SetStateAction<string>>,
  onClose: () => void
}