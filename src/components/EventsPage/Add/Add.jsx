import React, { useContext, useEffect } from 'react';
import EventForm from '../../forms/EventForm/EventForm';
import { Modal } from 'react-responsive-modal';
import { Context } from '../../../contexts/Context';
import { EventContext } from '../../../contexts/EventsContext';
import { ProjectContext } from '../../../contexts/ProjectsContext';

import './Add.scss';

const Add = ({ toggleArrow }) => {
  const { eventModal, setEventModal } = useContext(Context);
  const { events, prForEvent, setPrForEvent } = useContext(EventContext);
  const { projects } = useContext(ProjectContext);

  useEffect(() => {
    let arr = projects
      .filter((el) => el.coord.email === localStorage.getItem('email'))
      .map((el) => ({
        id: el._id,
        value: el.name,
      }));
    setPrForEvent(arr);
  }, [projects]);
  return (
    <div>
      {prForEvent.length > 0 && (
        <div className="event-add">
          <Modal
            classNames={{ modal: 'modal-class' }}
            open={eventModal}
            onClose={() => setEventModal(false)}
            center
          >
            <EventForm modal={eventModal} setModal={setEventModal} />
          </Modal>
          <button onClick={() => setEventModal(true)} className="gradient-btn">
            <h4>добавить ивент</h4>
          </button>
        </div>
      )}
    </div>
  );
};

export default Add;
