/* eslint-disable import/no-extraneous-dependencies */
import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  const responseApi = {
    user: {
      id: 'user-123',
      email: 'jhondoe@example.com',
      password: '123456',
    },
    token: 'token-123',
  };

  it('should be able to sign in', async () => {
    apiMock.onPost('sessions').reply(200, responseApi);

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // verificando o local storage
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    result.current.signIn({
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      responseApi.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(responseApi.user),
    );
    expect(result.current.user.email).toEqual('jhondoe@example.com');
  });
});
