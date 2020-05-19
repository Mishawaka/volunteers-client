import React, { useEffect, useState, useContext, createRef } from 'react';
import ProfileLeftBlock from '../../components/ProfilePage/ProfileLeftBlock/ProfileLeftBlock';
import ProfileCenterBlock from '../../components/ProfilePage/ProfileCenterBlock/ProfileCenterBlock';
import ProfileRightBlock from '../../components/ProfilePage/ProfileRightBlock/ProfileRightBlock';
import UserImage from '../../components/forms/UserImage/UserImage';
import { Context } from '../../contexts/Context';
import { Modal } from 'react-responsive-modal';

import './ProfilePage.scss';
import ProfileTop from '../../components/ProfilePage/ProfileTop/ProfileTop';
import ProfileBottom from '../../components/ProfilePage/ProfileBottom/ProfileBottom';

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [subscribes, setSubscribes] = useState([]);
  const [modal, setModal] = useState(false);
  const { auth } = useContext(Context);
  const ref = createRef();

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_ROOT}/get-user-info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('jwt') }),
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem('jwt');
          localStorage.removeItem('img');
          localStorage.removeItem('email');
          window.location.replace('/');
        } else {
          return res.json();
        }
      })
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, [auth]);

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_ROOT}/get-all-projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('jwt') }),
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem('jwt');
          localStorage.removeItem('img');
          localStorage.removeItem('email');
          window.location.replace('/');
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setProjects(data);
        let arr = data.filter(
          (el) => el.coord.email === localStorage.getItem('email')
        );
        setMyProjects(arr);
      })
      .catch((err) => console.log(err));
  }, [auth]);

  useEffect(() => {
    if (projects.length > 0) {
      let arr = projects.filter((el) =>
        el.subscribers.includes(localStorage.getItem('email'))
      );
      setSubscribes(arr);
    }
  }, [projects]);

  useEffect(() => {
    if (subscribes.length > 0) {
      fetch(`http://${process.env.REACT_APP_ROOT}/get-all-events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('jwt') }),
      })
        .then((res) => {
          if (res.status === 401) {
            localStorage.removeItem('jwt');
            localStorage.removeItem('img');
            localStorage.removeItem('email');
            window.location.replace('/');
          } else {
            return res.json();
          }
        })
        .then((data) => {
          let arr = data.map((el) => ({
            ...el,
            date: new Date(el.date),
          }));
          console.log(data);
          // let arr1 = arr.filter(
          //   (el) => el.project.coord.email === localStorage.getItem('email')
          // );
          return setEvents(arr);
        })
        .catch((err) => console.log(err));
    }
  }, [subscribes]);

  const logOut = () => {
    localStorage.removeItem('img');
    localStorage.removeItem('email');
    localStorage.removeItem('jwt');
    window.location.replace('/');
  };

  return (
    <div className="profile-page animated fadeIn slower">
      <Modal
        classNames={{ modal: 'modal-class' }}
        open={modal}
        onClose={() => setModal(false)}
        center
      >
        <UserImage
          modal={modal}
          setUser={setUser}
          setModal={setModal}
          customRef={ref}
        />
      </Modal>
      <ProfileTop logOut={logOut} />
      <div className="profile-center">
        <ProfileLeftBlock setModal={setModal} user={user} />
        <ProfileCenterBlock user={user} />
        <ProfileRightBlock user={user} />
      </div>
      <div className="gradient-line" />
      <ProfileBottom
        myProjects={myProjects}
        subscribes={subscribes}
        events={events}
      />
    </div>
  );
};

export default ProfilePage;
