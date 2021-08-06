import { render, screen, fireEvent } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { mocked } from 'ts-jest/utils';

import { SubscribeButton } from '.';

jest.mock('next-auth/client');
jest.mock('next/router');

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    expect(screen.getByText('Inscrever-se')).toBeInTheDocument();
  });

  it('redirects user to sing in when not authenticated', () => {
    const signInMocked = mocked(signIn);
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Inscrever-se');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalledWith('github');
  });

  it('redirects user to posts when he already has a subscription', () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: 'John Doe', email: 'johndoe@gmail.com' },
        activeSubscription: 'expires-active-subscription',
        expires: 'fake-expires',
      },
      true,
    ]);

    const pushMocked = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Inscrever-se');

    fireEvent.click(subscribeButton);

    expect(pushMocked).toHaveBeenCalledWith('/posts');
  });
});
