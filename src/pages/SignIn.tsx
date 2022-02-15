import React, {useCallback, useRef, useState} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation}: SignInScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<any | null>(null);
  const passwordRef = useRef<any | null>(null);

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    Alert.alert('알림', '로그인 되었습니다.');
  }, [email, password]);

  const onChangeEmail = useCallback(text => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text);
  }, []);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const emailAndPasswordDetected = email && password;

  return (
    <Container>
      <View>
        <Title>이메일</Title>
        <TextInput
          placeholder="이메일을 입력해주세요."
          value={email}
          onChangeText={text => onChangeEmail(text)}
          importantForAutofill="yes"
          autoCompleteType="email"
          keyboardType="email-address"
          autoCapitalize="none"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          blurOnSubmit={false}
          ref={emailRef}
          clearButtonMode="while-editing"
        />
      </View>
      <View>
        <Title>비밀번호</Title>
        <TextInput
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChangeText={text => onChangePassword(text)}
          secureTextEntry
          importantForAutofill="yes"
          autoCompleteType="password"
          textContentType="password"
          autoCapitalize="none"
          onSubmitEditing={onSubmit}
          ref={passwordRef}
          clearButtonMode="while-editing"
        />
      </View>
      <BtnView>
        <SignInBtn
          onPress={onSubmit}
          disabled={!emailAndPasswordDetected}
          style={{
            backgroundColor: !emailAndPasswordDetected ? 'gray' : 'blue',
          }}>
          <LoginText>로그인</LoginText>
        </SignInBtn>
        <SignUpBtn onPress={toSignUp}>
          <Text>회원가입</Text>
        </SignUpBtn>
      </BtnView>
    </Container>
  );
};

const Container = styled.SafeAreaView``;
const View = styled.View``;
const Text = styled.Text``;
const Title = styled(Text)`
  font-weight: bold;
  font-size: 18px;
  margin: 3% 5%;
`;
const LoginText = styled(Text)`
  font-size: 16px;
  color: #fff;
`;
const TextInput = styled.TextInput`
  padding: 5%;
  margin: 5%;
  border-bottom-width: 0.2px;
`;
const BtnView = styled.View`
  align-items: center;
`;
const SignInBtn = styled.Pressable`
  width: 100px;
  align-items: center;
  padding: 10px 0;
  border-radius: 5px;
`;
const SignUpBtn = styled(SignInBtn)`
  background-color: transparent;
`;

export default SignIn;
