import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, test } from 'vitest';
import LandingPage from './LandingPage';
import { BrowserRouter } from 'react-router-dom';

test('adds 1+2 to equal 3', () => {
  expect(1 + 2).toBe(3);
}
);

test('renders LandingPage component', () => {
  const setUserMock = vi.fn();
  render(
    <BrowserRouter>
      <LandingPage setUser={setUserMock} />
    </BrowserRouter>
  );

  expect(screen.getByText('CHORELYMPICS')).toBeInTheDocument();
  expect(screen.getByText("What's your name?")).toBeInTheDocument();
}
);
