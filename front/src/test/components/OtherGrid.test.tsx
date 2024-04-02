import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OthersGrid from '../../components/OthersGrid';

describe('Others Grid Component', () => {
  it('Renders correctly ', () => {
    const otherGridText = 'Others Grid';
    render(<OthersGrid usersGamesGrids={[]} />);
    const otherGridElement = screen.getByText(otherGridText);
    expect(otherGridElement).toBeTruthy();
  });
});
