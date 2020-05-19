import React, { useContext, useEffect } from 'react';
import { Context } from '../../contexts/Context';
import { ProjectContext } from '../../contexts/ProjectsContext';
import { EventContext } from '../../contexts/EventsContext';
import { RegisterContext } from '../../contexts/RegisterContext';
import FirstBlock from '../../components/MainPage/FirstBlock/FirstBlock';
import SecondBlock from '../../components/MainPage/SecondBlock/SecondBlock';
import ThirdBlock from '../../components/MainPage/ThirdBlock/ThirdBlock';
import ForthBlock from '../../components/MainPage/ForthBlock/ForthBlock';
import SecondBanner from '../../components/MainPage/SecondBanner/SecondBanner';
import FIfthBlock from '../../components/MainPage/FIfthBlock/FIfthBlock';
import BannerBlock from '../../components/AuthMainPage/BannerBlock/BannerBlock';
import EventBlock from '../../components/AuthMainPage/EventBlock/EventBlock';
import ProjectBlock from '../../components/AuthMainPage/ProjectBlock/ProjectBlock';
import RegProjectBlock from '../../components/AuthMainPage/RegProjectBlock/RegProjectBlock';
import SixthBlock from '../../components/MainPage/SixthBlock/SixthBlock';

import './MainPage.scss';

const MainPage = () => {
  const { setRegisterModal, setAuth, auth } = useContext(Context);
  const { projects, setProjects } = useContext(ProjectContext);
  const { events, setEvents } = useContext(EventContext);
  const { email, setEmail } = useContext(RegisterContext);

  useEffect(() => {
    if (localStorage.getItem('jwt') !== null) {
      fetch(`http://${process.env.REACT_APP_ROOT}/checkToken`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ token: localStorage.getItem('jwt') }),
      })
        .then((res) => {
          if (res.status === 200) {
            fetch(`http://${process.env.REACT_APP_ROOT}/get-all-projects`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: localStorage.getItem('jwt') }),
            })
              .then((res) => res.json())
              .then((data) => {
                setProjects(data);
                fetch(`http://${process.env.REACT_APP_ROOT}/get-all-events`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    token: localStorage.getItem('jwt'),
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    let arr = data.map((el) => ({
                      ...el,
                      date: new Date(el.date),
                    }));
                    setEvents(arr);
                    setAuth(true);
                  });
              })
              .catch((err) => console.log(err));
          } else {
            localStorage.removeItem('jwt');
            localStorage.removeItem('email');
            localStorage.removeItem('img');
            window.location.reload();
            setAuth(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [auth]);

  return (
    <div className="main-page">
      <div
        className="no-auth-main animated fadeIn slower"
        style={{ display: localStorage.getItem('jwt') ? 'none' : 'block' }}
      >
        <FirstBlock setRegisterModal={setRegisterModal} />
        <SecondBlock />
        <ThirdBlock />
        <ForthBlock />
        <SecondBanner />
        <FIfthBlock />
        <SixthBlock
          email={email}
          setEmail={setEmail}
          setModal={setRegisterModal}
        />
      </div>
      <div
        className="auth-main animated fadeIn"
        style={{ display: localStorage.getItem('jwt') ? 'block' : 'none' }}
      >
        <BannerBlock />
        <EventBlock events={events} />
        <ProjectBlock projects={projects} />
        <RegProjectBlock />
      </div>
    </div>
  );
};

export default MainPage;
