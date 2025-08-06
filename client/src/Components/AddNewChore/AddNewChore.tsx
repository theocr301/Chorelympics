import { useState } from 'react';
import { generateChore } from '../../Services/APIClient';
import { AddNewChoreProps, Chore } from '../../types/types';

const difficulties = ['easy', 'medium', 'hard'];

export default function AddNewChore({ onClose, setChoreList }: AddNewChoreProps) {
  const [newChoreName, setNewChoreName] = useState('');
  const [newChoreDifficulty, setNewChoreDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy'); //default is easy

  async function handleChoreSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (difficulties.includes(newChoreDifficulty)) {
      const newChore = await generateChore(newChoreName, newChoreDifficulty);
      if (newChore) {
        setChoreList(prev => [...prev, newChore]);
      } else {
        console.error('Failed to generate a new chore.');
      }
      onClose?.();
    }
  }

  function handleChoreNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewChoreName(event.target.value);
  }

  function handleDifficultyChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (difficulties.includes(event.target.value)) setNewChoreDifficulty(event.target.value as 'easy' | 'medium' | 'hard');
  }

  return (
    <>
      <div className="spongy-sticker">
        <div className="form-container">
          <span className="nameQuestion">What's the chore you want to add?</span>
          <form className="submit-form" onSubmit={handleChoreSubmit}>
            <input name="nameInput" className="inputBox" value={newChoreName} onChange={handleChoreNameChange} required />
            <span className="nameQuestion">Difficulty?</span>
            <div className="difficulty-wrapper">
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="easy"
                  checked={newChoreDifficulty === "easy"}
                  onChange={handleDifficultyChange}
                />
                EASY
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="medium"
                  checked={newChoreDifficulty === "medium"}
                  onChange={handleDifficultyChange}
                />
                MEDIUM
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="hard"
                  checked={newChoreDifficulty === "hard"}
                  onChange={handleDifficultyChange}
                />
                HARD
              </label>
            </div>
            <button className="formButton" type="submit">CONTINUE</button>
          </form>
        </div>
      </div>
    </>
  );
}