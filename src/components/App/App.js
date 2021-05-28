import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import About from "../About/About";
import Calendar from "../Calendar/Calendar";
import Profile from "../Profile/Profile";
import Loader from "../Loader/Loader";
import { TIME_DELAY } from "../../utils/constants";
import UserContext from "../../contexts/UserContext";

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState({ login: false });

  const handleCheckToken = () => {
    // TO DO: проверка, что пользователь залогинин
    // token храниться в localStorage или в cookie ???
    setIsLoading(true);
    // TO DO: запрос на сервер для проверки токена
    setTimeout(() => {
      // при положительном ответе от сервера
      handleGetUser();
      setUser({ ...user, login: true });
      // при отрицательном ответе от сервера
      // setIsLoading(false);
    }, TIME_DELAY);
  };

  const handleGetUser = (token) => {
    // TO DO: запрос на сервер для получения данных пользователя по token
    setIsLoading(true);
    setTimeout(() => {
      // предполагаемый ответ сервера
      const res = {
        ...user,
        id: 1,
        user: 1,
        city: { id: 2, name: "Воронеж", isPrimary: false },
      };
      setUser(res);
      setIsLoading(false);
    }, TIME_DELAY);
  };

  React.useEffect(() => {
    handleCheckToken();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {isLoading && <Loader />}
      <Header />
      <Switch>
        <Route exact path="/"></Route>
        <Route path="/about">
          <About mix="app__content app__section" />
        </Route>
        <Route path="/profile">
          <Profile mix="app__content" />
        </Route>
        <Route exact path="/calendar" component={Calendar}></Route>
      </Switch>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
