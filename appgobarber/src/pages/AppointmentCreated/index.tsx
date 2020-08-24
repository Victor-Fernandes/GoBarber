import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  Description,
  OKButton,
  OkButtonText,
} from './styles';

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();

  const handleOkPassed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento concluido</Title>
      <Description>Sexta, dia 27 de agosto de 2020 às 13</Description>

      <OKButton onPress={handleOkPassed}>
        <OkButtonText>Ok</OkButtonText>
      </OKButton>
    </Container>
  );
};

export default AppointmentCreated;
