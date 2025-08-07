import { expect, vi, test } from 'vitest';


//loooaaads to test

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
    getAllChores: vi.fn().mockResolvedValue([
      { _id: '1', name: 'Chore 1', assignee: 'Unassigned', isDone: false, difficulty: 'easy', duration: 10, pointReward: 5 },
      { _id: '2', name: 'Chore 2', assignee: 'testuser', isDone: false, difficulty: 'medium', duration: 20, pointReward: 10 },
      { _id: '3', name: 'Chore 3', assignee: 'testuser', isDone: true, difficulty: 'hard', duration: 30, pointReward: 15 },
    ]),
    getCurrentUser: vi.fn().mockResolvedValue({ name: 'testuser' }),
  };
});

import { render, act, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ChoreList from '../ChoreList/ChoreList';


test('renders unassigned chore item properly', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <ChoreList />
      </BrowserRouter>
    );
  });
  await waitFor(() => {
    const choreItems = document.querySelectorAll('.individual-chore');
    const chore1Item = Array.from(choreItems).find(
      item => item.textContent?.includes('Chore 1')
    ) as HTMLElement | undefined;

    expect(chore1Item).toBeInTheDocument();
    expect(within(chore1Item!).getByText(/unassigned/i)).toBeInTheDocument();
    expect(within(chore1Item!).getByAltText(/easy/i)).toBeInTheDocument();
    expect(within(chore1Item!).getByText(/assign to me/i)).toBeInTheDocument();
  });
});


test('renders assigned chore item properly', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <ChoreList />
      </BrowserRouter>
    );
  });
  await waitFor(() => {
    const choreItems = document.querySelectorAll('.individual-chore');
    const chore1Item = Array.from(choreItems).find(
      item => item.textContent?.includes('Chore 2')
    ) as HTMLElement | undefined;

    expect(chore1Item).toBeInTheDocument();
    expect(within(chore1Item!).getByText(/testuser/i)).toBeInTheDocument();
    expect(within(chore1Item!).getByAltText(/medium/i)).toBeInTheDocument();
    expect(within(chore1Item!).getByText(/mark as done/i)).toBeInTheDocument();
    expect(within(chore1Item!).getByText(/unassign/i)).toBeInTheDocument();
  });
});


test('renders completed chore item properly', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <ChoreList />
      </BrowserRouter>
    );
  });
  await waitFor(() => {
    const choreItems = document.querySelectorAll('.individual-chore');
    const chore1Item = Array.from(choreItems).find(
      item => item.textContent?.includes('Chore 3')
    ) as HTMLElement | undefined;

    expect(chore1Item).toBeInTheDocument();
    expect(within(chore1Item!).getByText(/testuser/i)).toBeInTheDocument();
    expect(within(chore1Item!).getByAltText(/hard/i)).toBeInTheDocument();
    expect(within(chore1Item!).getByText(/reopen/i)).toBeInTheDocument();
  });
});


