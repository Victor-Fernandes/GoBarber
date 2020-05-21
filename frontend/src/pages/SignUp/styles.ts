import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import SignUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;
  /**Forçar que o container tenha 100% da parte visivel da tela */

  display: flex;
  align-items: stretch; /**faz os itens dentro do container terem o tamanho total da pagina*/
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center; /**Todo conteudo do content vai ficar no centro */
  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: ${shade(0.2, '#f4fed8')};
      }
    }
  }

  > a {
    /**Pegar o "a" que esta em outro nivel*/
    color: #f4fed8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.3s;
    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.3, '#f4fed8')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;
