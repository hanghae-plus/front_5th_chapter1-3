export const AuthenticationService = () => ({
  login: (
    email: string,
    //  password: string
  ) => {
    return { id: 1, name: "홍길동", email };
  },
  logout: () => {
    return null;
  },
});
