import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiArrowDownLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationError from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

import { AnimationContainer, Container, Content, Background } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido.'),
          password: Yup.string()
            .min(6, 'No mínimo 6 digitos')
            .required('Senha obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu Logon no GoBarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro.',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente!',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Cadastro</h1>
            <Input name="name" type="text" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowDownLeft />
            Voltar para Logon.
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default SignUp;
