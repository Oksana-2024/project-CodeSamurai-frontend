import Container from "../../components/Container/Container.jsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import s from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
  <section className={s.registerPage}>
      <Container className={s.register}>
        <RegistrationForm />
      </Container>
  </section>
  );
};

export default RegistrationPage;
