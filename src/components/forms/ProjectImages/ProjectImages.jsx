import React, { createRef, useState, useContext } from 'react';
import FormPage from '../FormPage/FormPage';
import ImageCrop from '../ImageCrop/ImageCrop';
import { ImageContext } from '../../../contexts/ImageContext';
import { ProjectContext } from '../../../contexts/ProjectsContext';
import plus from '../../../img/plus.svg';

const ProjectImages = ({ modal, setModal }) => {
  const ref = createRef();
  const { croppedImageUrl, setFile } = useContext(ImageContext);
  const { projectId } = useContext(ProjectContext);
  const [imageArr, setImageArr] = useState([]);
  const [index, setIndex] = useState(1);

  const nextImage = (file) => {
    blobToBase64(file, (base64) => {
      fetch(`http://${process.env.REACT_APP_ROOT}/save-project-images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, name: file.name, projectId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            if (index < 4) {
              setFile(false);
              setIndex(index + 1);
            } else {
              setFile(false);
              setModal(false);
            }
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

  // const sendImages = () => {
  //   for (let i of imageArr) {
  //     blobToBase64(i, (base64) => {
  //       fetch('http://localhost:8000/save-project-images', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ image: base64, name: i.name, projectId }),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => (data.ok ? setModal(false) : null))
  //         .catch((err) => console.log(err));
  //     });
  //   }
  // };

  return (
    <FormPage modal={modal} setModal={setModal}>
      <h1>Добавьте фото для проекта</h1>
      <h3>Фото {index} из 4</h3>
      <div className="form-group">
        <div
          className={croppedImageUrl ? 'background' : 'blocked background'}
          onClick={croppedImageUrl ? null : () => ref.current.click()}
        >
          <img
            style={{ display: croppedImageUrl ? 'none' : 'block' }}
            src={plus}
            alt="plus"
          />
        </div>
        <ImageCrop
          aspect={16 / 9}
          height={50}
          nextImage={nextImage}
          index={index}
          clickRef={ref}
        />
      </div>
    </FormPage>
  );
};

export default ProjectImages;
