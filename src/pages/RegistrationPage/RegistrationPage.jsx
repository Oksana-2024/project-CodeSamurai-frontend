import Container from "../../components/Container/Container.jsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import s from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <Container className={s.register}>
      <RegistrationForm />
    </Container>
  );
};

export default RegistrationPage;
