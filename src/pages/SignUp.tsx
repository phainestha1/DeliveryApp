import React, {useCallback, useRef, useState} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const emailRef = useRef<any | null>(null);
  const nameRef = useRef<any | null>(null);
  const passwordRef = useRef<any | null>(null);

  const onChangeEmail = useCallback(text => {
    setEmail(text);
  }, []);
  const onChangeName = useCallback(text => {
    setName(text);
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text);
  }, []);

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    console.log(email, name, password);
    Alert.alert('알림', '회원가입 되었습니다.');
  }, [email, name, password]);

  const userInfoRecorded = email && password && name;

  return (
    <DismissKeyboardView>
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
            nameRef.current?.focus();
          }}
          blurOnSubmit={false}
          ref={emailRef}
          clearButtonMode="while-editing"
        />
      </View>
      <View>
        <Title>이름</Title>
        <TextInput
          placeholder="이름을 입력해주세요."
          value={name}
          onChangeText={text => onChangeName(text)}
          secureTextEntry
          importantForAutofill="yes"
          autoCompleteType="name"
          textContentType="name"
          autoCapitalize="none"
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          ref={nameRef}
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
        <SignUpBtn
          onPress={onSubmit}
          disabled={!userInfoRecorded}
          style={{
            backgroundColor: !userInfoRecorded ? 'gray' : 'blue',
          }}>
          <LoginText>회원가입</LoginText>
        </SignUpBtn>
      </BtnView>
    </DismissKeyboardView>
  );
};

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
const SignUpBtn = styled.Pressable`
  width: 100px;
  align-items: center;
  padding: 10px 0;
  border-radius: 5px;
`;

export default SignUp;
