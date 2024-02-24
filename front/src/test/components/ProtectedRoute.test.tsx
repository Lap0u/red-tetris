import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { MemoryRouter } from 'react-router-dom';

describe('ProtectedRoute', () => {
  it('displays loading when authentication is loading', () => {
    render(
      <ProtectedRoute isAuthLoading={true} user={null}>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('redirects when there is no user', () => {
    // Using MemoryRouter to test the redirection
    render(
      <MemoryRouter>
        <ProtectedRoute isAuthLoading={false} user={null}>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText('Protected Content')).not.toBeTruthy();
  });

  it('renders children when user is present and not loading', () => {
    render(
      <MemoryRouter>
        <ProtectedRoute
          isAuthLoading={false}
          user={{ id: 1, username: 'testUser' }}>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeTruthy();
  });
});
