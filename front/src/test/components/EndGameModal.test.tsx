import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EndGameModal from '../../components/EndGameModal';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store/store';
import { act } from 'react-dom/test-utils';

describe('Endgame modal Component', () => {
  it('Renders correctly as a winner ', () => {
    const endgameStatus = 'Congratulations! You won!';
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EndGameModal isWinner={true} score={12} />
        </BrowserRouter>
      </Provider>
    );
    const endGameElement = screen.getByText(endgameStatus);
    expect(endGameElement).toBeTruthy();
  });
  it('Renders correctly as a loser ', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EndGameModal isWinner={false} score={12} />
        </BrowserRouter>
      </Provider>
    );
    const endgameStatus = 'Game Over';
    const endGameElement = screen.getByText(endgameStatus);
    expect(endGameElement).toBeTruthy();
  });
  it('Renders correctly the score ', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EndGameModal isWinner={false} score={12512} />
        </BrowserRouter>
      </Provider>
    );
    const score = 'You scored 12512 points';
    const scoreElement = screen.getByText(score);
    expect(scoreElement).toBeTruthy();
  });
  // it('navigates to home when button is clicked(user not logged in)', () => {
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <EndGameModal isWinner={false} score={12512} />
  //       </BrowserRouter>
  //     </Provider>
  //   );
  //   act(() => {

  //   const button = getByText('Restart Game');
  //   button.click();
  //   })

  //   // Assert whether the navigation has occurred
  //   expect(window.location.pathname).toBe('/');
  // });
  it('navigates to home when button is clicked (user not logged in)', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <EndGameModal isWinner={false} score={12123} />
        </BrowserRouter>
      </Provider>
    );
    act(() => {
      const button = getByText('Return to Lobby');
      button.click();
    });
    // Assert whether the navigation has occurred
    expect(window.location.pathname).toBe('/');
  });
  it('navigates to home when button is clicked (user not logged in)', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <EndGameModal isWinner={false} score={12123} />
        </BrowserRouter>
      </Provider>
    );
    act(() => {
      const button = getByText('Highscores');
      button.click();
    });
    // Assert whether the navigation has occurred
    expect(window.location.pathname).toBe('/');
  });
});
