import Container from "../../components/Container/Container.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import s from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <section className={s.loginPage}>
      <Container className={s.login}>
        <LoginForm />
      </Container>
    </section>
  );
};

export default LoginPage;
