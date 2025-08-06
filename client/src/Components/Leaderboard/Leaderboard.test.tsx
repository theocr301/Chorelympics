import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, test } from 'vitest';
import Leaderboard from './Leaderboard';
import ChoreList from '../ChoreList/ChoreList';
import { BrowserRouter } from 'react-router-dom';

test('adds 1+2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useParams: () => ({ user: 'testuser' }),
  };
});

vi.mock('../../Services/APIClient', async () => {
  const actual = await vi.importActual<typeof import('../../Services/APIClient')>('../../Services/APIClient');
  return {
    ...actual,
    getAllUsers: vi.fn().mockResolvedValue([
      { name: 'Alice', points: 100 },
      { name: 'Bob', points: 80 },
    ]),
  };
});


test('renders Leaderboard title via ChoreList', () => {
  render(
    <BrowserRouter>
      <ChoreList />
    </BrowserRouter>
  );
  expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
});

test('renders Leaderboard list', async () => {
  render(<Leaderboard />);
  await waitFor(() => {
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});