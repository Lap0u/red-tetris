import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CustomizeGameSpeed from '../../components/CustomizeGameSpeed';
import { handleGameSpeed } from '../../utils/handleGameSpeed';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store/store';

describe('Customize game speed Component', () => {
  it('Renders correctly ', () => {
    const customizeGameSpeedText = 'Beginner';
    render(
      <CustomizeGameSpeed gameSpeed={'expert'} gameId={'12'} userId={12} />
    );
    const customizeGameSpeedElement = screen.getByText(customizeGameSpeedText);
    expect(customizeGameSpeedElement).toBeTruthy();
  });
  it('Calls handleGameSpeed function when clicked (beginner)', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomizeGameSpeed gameSpeed={'expert'} gameId={'12'} userId={12} />
        </BrowserRouter>
      </Provider>
    );
    const button = getByText('Beginner');
    button.click();
  });
  it('Calls handleGameSpeed function when clicked (Intermediate)', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomizeGameSpeed gameSpeed={'expert'} gameId={'12'} userId={12} />
        </BrowserRouter>
      </Provider>
    );
    const button = getByText('Intermediate');
    button.click();
  });
  it('Calls handleGameSpeed function when clicked (Expert)', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomizeGameSpeed gameSpeed={'expert'} gameId={'12'} userId={12} />
        </BrowserRouter>
      </Provider>
    );
    const button = getByText('Expert');
    button.click();
  });
  it('Calls handleGameSpeed function when clicked (Le X)', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomizeGameSpeed gameSpeed={'expert'} gameId={'12'} userId={12} />
        </BrowserRouter>
      </Provider>
    );
    const button = getByText('Le X');
    button.click();
  });
});
