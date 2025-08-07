import { render, screen, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi, test } from 'vitest';
import ChoreList from './ChoreList';
import { BrowserRouter } from 'react-router-dom';



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
    getAllChores: vi.fn().mockResolvedValue([
      { _id: '1', name: 'Chore 1', assignee: 'Unassigned', isDone: false, difficulty: 'easy', duration: 10, pointReward: 5 },
      { _id: '2', name: 'Chore 2', assignee: 'testuser', isDone: false, difficulty: 'medium', duration: 20, pointReward: 10 },
      { _id: '3', name: 'Chore 3', assignee: 'testuser', isDone: true, difficulty: 'hard', duration: 30, pointReward: 15 },
    ]),
    getCurrentUser: vi.fn().mockResolvedValue({ name: 'testuser' }),
  };
});

test('renders titles properly', async () => {
  render(
    <BrowserRouter>
      <ChoreList />
    </BrowserRouter>
  );
  await waitFor (() => {
    
    expect(screen.getByText(/Chores/i)).toBeInTheDocument();
    expect(screen.getByText(/Unassigned/i)).toBeInTheDocument();
    expect(screen.getByText(/To Do/i)).toBeInTheDocument();
    expect(screen.getByText(/Done/i)).toBeInTheDocument();
  });
});
test('renders chore items', async () => {
  render(
    <BrowserRouter>
      <ChoreList />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(screen.getByText('Chore 1')).toBeInTheDocument();
    expect(screen.getByText('Chore 2')).toBeInTheDocument();
    expect(screen.getByText('Chore 3')).toBeInTheDocument();
  });
});
test('renders add new chore', async () => {
  render(
    <BrowserRouter>
      <ChoreList />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(screen.getByText(/Add new chore/i)).toBeInTheDocument();
  });
});
test('chores are rendered in correct section', async () => {
  render(
    <BrowserRouter>
      <ChoreList />
    </BrowserRouter>
  );
  await waitFor(() => {
    const unassignedSection = document.querySelector('.UnassignedChores') as HTMLElement;
    expect(unassignedSection).toBeInTheDocument();
    expect(within(unassignedSection).getByText('Chore 1')).toBeInTheDocument();

    const assignedSection = document.querySelector('.AssignedChores') as HTMLElement;
    expect(assignedSection).toBeInTheDocument();
    expect(within(assignedSection).getByText('Chore 2')).toBeInTheDocument();

    const completedSection = document.querySelector('.CompletedChores') as HTMLElement;
    expect(completedSection).toBeInTheDocument();
    expect(within(completedSection).getByText('Chore 3')).toBeInTheDocument();
  });
});

