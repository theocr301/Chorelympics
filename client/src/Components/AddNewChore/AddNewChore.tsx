import { useState } from 'react';
import { generateChore } from '../../Services/APIClient';
import { AddNewChoreProps } from '../../types/chore';
import { AddNewChoreUserProps } from '../../types/user';

type props = AddNewChoreProps & AddNewChoreUserProps;

export default function AddNewChore({ onClose, currentUser }: props) {
  const [choreName, setChoreName] = useState('');
  const [difficulty, setDifficulty] = useState('');

  async function handleChoreSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const newChore = await generateChore(currentUser.name, choreName, difficulty);
    setChoreName(newChore);
    onClose?.();
  }

  function handleChoreNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setChoreName(event.target.value);
  }

  function handleDifficultyChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setDifficulty(event.target.value);
  }

  return (
    <>
      <div className="spongy-sticker">
        <div className="form-container">
          <span className="nameQuestion">What's the chore you want to add?</span>
          <form className="submit-form" onSubmit={handleChoreSubmit}>
            <input name="nameInput" className="inputBox" value={choreName} onChange={handleChoreNameChange} required />
            <span className="nameQuestion">Difficulty?</span>
            <div className="difficulty-wrapper">
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="easy"
                  checked={difficulty === "easy"}
                  onChange={handleDifficultyChange}
                />
                EASY
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="medium"
                  checked={difficulty === "medium"}
                  onChange={handleDifficultyChange}
                />
                MEDIUM
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="hard"
                  checked={difficulty === "hard"}
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