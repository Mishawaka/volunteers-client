import React, { useContext } from 'react';
import FormPage from '../FormPage/FormPage';
import ImageCrop from '../ImageCrop/ImageCrop';
import { ImageContext } from '../../../contexts/ImageContext';
import plus from '../../../img/plus.svg';

const ProjectImages = ({ modal, setModal, customRef, setUser }) => {
  const { croppedImageUrl, setFile } = useContext(ImageContext);

  const nextImage = (file) => {
    blobToBase64(file, (base64) => {
      fetch(`http://${process.env.REACT_APP_ROOT}/set-user-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64,
          email: localStorage.getItem('email'),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.ok) {
            setFile(false);
            setUser(data.user);
            setModal(false);
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    });
  };

  const blobToBase64 = function (blob, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(',')[1];
      cb(base64);
    };
    reader.readAsDataURL(blob);
  };

  return (
    <FormPage modal={modal} setModal={setModal}>
      <h1>Изменить фото профиля</h1>
      <div className="form-group">
        <div
          className={croppedImageUrl ? 'background' : 'blocked background'}
          onClick={croppedImageUrl ? null : () => customRef.current.click()}
        >
          <img
            style={{ display: croppedImageUrl ? 'none' : 'block' }}
            src={plus}
            alt="plus"
          />
        </div>
        <ImageCrop
          aspect={1 / 1}
          height={100}
          nextImage={nextImage}
          clickRef={customRef}
        />
      </div>
    </FormPage>
  );
};

export default ProjectImages;
