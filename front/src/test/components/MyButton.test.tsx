import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MyButton from '../../components/MyButton';

describe('MyButton Component', () => {
  it('renders correctly with given text', () => {
    const buttonText = 'Click me';
    render(<MyButton onClick={() => {}} text={buttonText} />);
    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeTruthy();
  });

  it('calls onClick prop when clicked', () => {
    const onClickMock = vi.fn();
    const buttonText = 'Click me';
    render(<MyButton onClick={onClickMock} text={buttonText} />);
    const buttonElement = screen.getByText(buttonText);
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
