# Wanted Pre-onboarding Challenge FE-1

원티드 프론트엔드 프리온보딩 첼린지를 위한 사전과제입니다.

## 온보딩 1회차

`1. 함수 네이밍의 중요성을 다시 한 번 알게되었습니다.`

- Before

```typescript
auth(data, type)
  .then(() => navigate("/"))
  .catch((error: Error) => setError(error.message));
```

처음 auth 함수를 보면 이 함수가 무슨 동작을 할까가 한번에 와닿지 않습니다.
auth라는 의미자체도 추상 레벨이 있고, 이 함수가 받는 인자도 의미가 명확하지 않았습니다.
그래서 이 비동기 로직의 성공 케이스와 에러케이스의 흐름도 명확하지 않게 되었습니다

1회차에 피드백 받은 함수 네이밍에 대해 다시 한 번 신경써서 네이밍 부분에서 리팩토링을 실천하였습니다.

- After

```typescript
userApi.login(user: User)
userApi.register(user: User)
```

auth라는 함수는 로그인과 회원가입 두가지 일을 하는 함수였습니다.
이 부분에서 한 가지 일만하는 함수로 분리를 시도하였고, 함수 네이밍 부분에서 더욱 명확하도록 신경 썼습니다.

auth 함수 뿐만 아니라 다른 함수들도 네이밍 부분에서 리팩토링을 시도하였습니다.

`2. 독립적인 컴포넌트를 위해 제어는 페이지로`

- Before

![AuthForm](https://user-images.githubusercontent.com/66871265/184464741-403eb1fc-7886-4fb2-a74b-d7ac5e88240c.png)

AuthForm만 보더라도 어지러워보입니다.
컴포넌트 자체의 코드 길이가 너무 길기도하고, 복잡해서 가독성이 떨어졌었습니다.
이와 비슷한 로직을 가지고 있는 컴포넌트가 하나 더 있는데 TodoForm 입니다.
이 컴포넌트는 컴포넌트 자체에서 데이터를 핸들링하고 있습니다.

이 부분에서 리팩토링을 진행했는데, 재사용되는 코드들을 hooks로 나누고 데이터에 대한 핸들링 추상화해주어 페이지 단에서 props로 내려주었습니다.

- After

여러 곳에서 쓰이는 코드들을 hooks로 분리

```typescript
import { useCallback, useState } from "react";

type UseInputProps<T> = {
  initialState: T;
};

export default function useInput<T>({ initialState }: UseInputProps<T>) {
  const [values, setValues] = useState<T>(initialState);

  const handleValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
    [values]
  );

  return { values, handleValues };
}
```

```typescript
import { useCallback, useEffect, useState } from "react";

type UseFormProps<T> = {
  callback: (args: T) => Promise<any>;
  values: T;
};

export default function useForm<T>({ values, callback }: UseFormProps<T>) {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      callback(values)
        .then(() => setSuccess(true))
        .catch((e: Error) => setError(e.message));
    },
    [values]
  );

  useEffect(() => {
    return () => {
      setSuccess(false);
      setError("");
    };
  }, []);

  return { success, error, handleSubmit };
}
```

```typescript
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type UseUserProps = {
  redirectTo?: string;
  requireLogin?: boolean;
};

export default function useUser(options?: UseUserProps) {
  const navigate = useNavigate();
  const getUserStatusInLocalSotorage = () => {
    if (localStorage.getItem("auth")) return true;
    return false;
  };

  const [isLogin, setIsLogin] = useState<boolean>(getUserStatusInLocalSotorage);

  const mutation = useCallback(
    () => setIsLogin(getUserStatusInLocalSotorage),
    []
  );

  useEffect(() => {
    setIsLogin(() => getUserStatusInLocalSotorage());
  }, [isLogin]);

  useEffect(() => {
    if (options?.redirectTo && isLogin)
      navigate(options.redirectTo, { replace: true });
  }, [options?.redirectTo, isLogin]);

  useLayoutEffect(() => {
    if (options?.requireLogin) navigate("/auth/login", { replace: true });
  }, []);

  return { isLogin, mutation };
}
```

페이지 단에서 핸들링

```typescript
import React from "react";
import AuthForm from "../../components/auth/authForm";
import useForm from "../../hooks/useForm";
import useInput from "../../hooks/useInput";
import { AuthFormProps, AuthFormValues } from "../../types/auth";
import * as userApi from "../../utils/user";

const Login = () => {
  const { values, handleValues } = useInput<AuthFormValues>({
    initialState: {
      email: "",
      password: "",
    },
  });

  const { error, handleSubmit, success } = useForm<AuthFormValues>({
    callback: userApi.login,
    values,
  });

  const props: AuthFormProps = {
    type: "login",
    error,
    success,
    values,
    handleSubmit,
    handleValues,
  };

  return <AuthForm {...props} />;
};

export default Login;
```

이렇게 재사용되는 코드들을 hooks로 나눠주고 데이터에 대한 핸들링은 상위 컴포넌트에 넘겨줌으로써 AuthForm, TodoForm 컴포넌트는 복잡도가 낮아졌고, 가독성이 증가했습니다

## 사전 과제 요구사항

`1. Assignment 1 - Login / SignUp`

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [x] 이메일 조건 : 최소 `@`, `.` 포함
  - [x] 비밀번호 조건 : 8자 이상 입력
  - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [x] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [x] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

`2. Assignment 2 - Todo List`

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [x] 목록 / 상세 영역으로 나누어 구현해주세요
  - [x] Todo 목록을 볼 수 있습니다.
  - [x] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [x] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [x] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요

  - [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

`3. 참고사항`

- 로컬 서버를 실행했을 때 생성되는 `db/db.json`이 DB 역할을 하게 됩니다. 해당 파일을 삭제하면 DB는 초기화 됩니다.

- 로그인 / 회원 가입 기능은 유저를 DB에 추가하고 JWT 토큰을 응답으로 돌려줄 뿐, 실제 유저별로 Todo 목록을 관계 지어 관리하지는 않습니다. (모든 유저가 하나의 Todo를 가짐)

- 로그아웃은 클라이언트 단에서 localStorage에 저장된 token을 삭제하는 방식으로 간단히 구현해주세요.

## 사용 스택

1. React
2. React-Router
3. Vite
