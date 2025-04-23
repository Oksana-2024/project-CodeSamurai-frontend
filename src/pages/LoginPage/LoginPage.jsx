import Container from "../../components/Container/Container.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import s from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <Container className={s.login}>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
