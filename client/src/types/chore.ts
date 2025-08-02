export interface ChoreProps {
  choreList: string[],
  setChoreList: React.Dispatch<React.SetStateAction<string[]>>,
  choreName: string,
  setChoreName: React.Dispatch<React.SetStateAction<string>>,
  difficulty: string,
  setDifficulty: React.Dispatch<React.SetStateAction<string>>,
  onClose: () => void
}