import React, { useState, useContext, createRef, useEffect } from 'react';
import FormPage from '../FormPage/FormPage';

import ImageCrop from '../ImageCrop/ImageCrop';
import { ImageContext } from '../../../contexts/ImageContext';
import { EventContext } from '../../../contexts/EventsContext';
import { ProjectContext } from '../../../contexts/ProjectsContext';
import { Context } from '../../../contexts/Context';

import plus from '../../../img/plus.svg';
import './EventForm.scss';

const EventForm = ({ modal, setModal }) => {
  const { croppedImageUrl, setCroppedImageUrl, file } = useContext(
    ImageContext
  );
  const [form, setForm] = useState({
    name: '',
    descr: '',
    city: '',
    addr: '',
    day: '',
    time: '',
    regUrl: '',
    project: '',
    imageUrl: 'events/image.jpg',
  });
  const [showDay, setShowDay] = useState('text');
  const [showTime, setShowTime] = useState('text');

  const { cities, setEventId, prForEvent } = useContext(EventContext);
  const { setImagesModal } = useContext(Context);

  const clickRef = createRef();

  const fields = [
    {
      name: 'day',
      label: 'Дата проведения',
      value: form.day,
      type: showDay,
    },
    {
      name: 'time',
      label: 'Время проведения',
      value: form.time,
      type: showTime,
    },
    { name: 'name', label: 'Название', value: form.name },
    { name: 'descr', label: 'Описание', value: form.descr },
    {
      name: 'city',
      label: 'Город',
      value: form.city,
      tag: 'select',
      parent: cities,
    },
    { name: 'addr', label: 'Адрес', value: form.addr },
    {
      name: 'regUrl',
      label: 'Ссылка на регистрацию волонтеров',
      value: form.regUrl,
    },
    {
      name: 'project',
      label: 'Проект',
      value: form.project,
      tag: 'select',
      parent: prForEvent,
    },
  ];

  const blobToBase64 = function (blob, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(',')[1];
      cb(base64);
    };
    reader.readAsDataURL(blob);
  };

  const sendPhoto = (id) => {
    blobToBase64(file, (base64) => {
      const body = JSON.stringify({
        image: base64,
        name: file.name,
        eventId: id,
      });
      fetch(`http://${process.env.REACT_APP_ROOT}/save-event-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
        .then((res) => res.json())
        .then((data) => console.log('event created successfully'))
        .catch((err) => console.log(err));
    });
  };

  const createEvent = () => {
    const checked = fields.filter((e) => e.value.length === 0);
    if (checked.length === 0 && croppedImageUrl) {
      fetch(`http://${process.env.REACT_APP_ROOT}/save-event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token: localStorage.getItem('jwt') }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            setEventId(data.id);
            setCroppedImageUrl(false);
            sendPhoto(data.id);
            setModal(false);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const setShow = (el) => {
    if (el.name === 'day') {
      return showDay === 'text' ? setShowDay('date') : setShowDay('text');
    } else if (el.name === 'time') {
      return showTime === 'text' ? setShowTime('time') : setShowTime('text');
    }
  };

  return (
    <FormPage modal={modal} setModal={setModal}>
      <h1>Создание ивента</h1>
      <h3>Заполните поля</h3>
      <div className="form-group">
        <div
          className={croppedImageUrl ? 'background' : 'blocked background'}
          onClick={croppedImageUrl ? null : () => clickRef.current.click()}
        >
          <img
            style={{ display: croppedImageUrl ? 'block' : 'none' }}
            src={croppedImageUrl}
            alt="cropped"
          />
          <img
            style={{ display: croppedImageUrl ? 'none' : 'block' }}
            src={plus}
            alt="plus"
          />
        </div>
        <ImageCrop aspect={1 / 1} height={100} clickRef={clickRef} />
      </div>
      {fields.map((el, id) =>
        el.tag === 'select' ? (
          <div key={id} className="form-group">
            <select
              name={el.name}
              onChange={({ target }) => {
                return setForm({
                  ...form,
                  [target.name]: target.value,
                });
              }}
              value={el.value}
            >
              <option className="non-value" value="" disabled selected>
                {el.label}
              </option>
              {el.parent.map((op, id) => (
                <option
                  key={el.name === 'city' ? id : op.id}
                  value={el.name === 'city' ? op : op.value}
                >
                  {el.name === 'city' ? op : op.value}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div key={id} className="form-group">
            <input
              onChange={({ target }) =>
                setForm({
                  ...form,
                  [target.name]: target.value,
                })
              }
              value={el.value}
              type={el.type || 'text'}
              onFocus={() => setShow(el)}
              onBlur={() => {
                setShow(el);
              }}
              name={el.name}
              className="form-control"
            />
            <label
              htmlFor={el.name}
              className={
                el.value === ''
                  ? 'form-control-placeholder-off'
                  : 'form-control-placeholder-on'
              }
            >
              {el.label}
            </label>
          </div>
        )
      )}
      {prForEvent && (
        <div className="form-group project-save">
          <button
            onClick={() => createEvent()}
            className={'active auth-button'}
          >
            <h4>Создать</h4>
          </button>
        </div>
      )}
    </FormPage>
  );
};

export default EventForm;
