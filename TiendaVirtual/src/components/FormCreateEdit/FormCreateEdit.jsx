import { useState } from 'react';
import './FormCreateEdit.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default function FormCreateEdit({ nameEntity, lstNameLabels, lstInputsFileImage, formik, dataEntity }) {

  //dataEntity is a object with the data of the entity is for modify

  //Structure lstInputsFileImage = [ [name, accept], ... ]
  const lstPropsFormik = Object.keys(formik.values);
  // console.log(lstPropsFormik);
  const lstPropsFormikFile = lstPropsFormik.filter(prop => prop.includes('file'));
  // console.log(lstPropsFormikFile);
  const [inputActive, setInputActive] = useState('');

  const [image, setImage] = useState(dataEntity ? lstPropsFormikFile.map(prop => dataEntity[prop]).toString() : []);

  //This variable is used for show the image in screen
  const [contentUpload, setContentUpload] = useState(dataEntity ? lstPropsFormikFile.map(prop => dataEntity[prop]).toString() : null);
  // console.log(contentUpload);

  //This function is for show the image in screen when is dragged or selected
  const onHandleDrag = (ev) => {
    if (ev.target.files[0]) {//Ask if exist a image

      setImage(ev.target.files[0]); //We add the image to image

      //If exist a image, we create a object of type FileReader
      const reader = new FileReader();
      /* This is for convert the image in a binary and can show */
      reader.readAsDataURL(ev.target.files[0]);
      reader.onload = (ev) => {
        ev.preventDefault();
        setContentUpload(ev.target.result); // We add the image to contentUpload
      };
    } else {
      //If not exist a image, we add a null to contentUpload
      setContentUpload(null);
    }
  };

  function onHandleSubmit(ev) {
    ev.preventDefault();
    lstPropsFormikFile.map((propFile) => formik.values[propFile] = image);
    formik.handleSubmit();
  }

  return (
    <>
      <div className='form-create-edit-component'>
        <div className="container-form-create-edit bg-dark">
          <h2 className='text-light text-center bg-primary'>  {dataEntity ? `Modificar ${nameEntity}` : `Agregar ${nameEntity}`} </h2>

          <form className='form-create-edit p-5' onSubmit={(ev) => onHandleSubmit(ev)}>

            {lstNameLabels && lstNameLabels.map((label, index) => (
              <div key={index} className='form-group'>

                <input className='form-control' required name={[lstPropsFormik[index]]} defaultValue={dataEntity ? dataEntity[lstPropsFormik[index]] : null}
                  onFocus={() => setInputActive(lstPropsFormik[index])}
                  onBlur={() => setInputActive('')}
                  onChange={formik.handleChange} />

                <label className='form-label'> {label} {formik.errors[lstPropsFormik[index]] ? <FontAwesomeIcon className='error' icon={faExclamationTriangle} beat /> : <FontAwesomeIcon className='ok' icon={faCheck} />} </label>
                {inputActive === label.toLowerCase() && <span className="error-msj"> {formik.errors[lstPropsFormik[index]]} </span>}
              </div>
            ))}

            {lstInputsFileImage && lstInputsFileImage.map((inputFile, index) => (
              <div key={index}>
                <div className='form-group drag-drop-image'>

                  <input type='file' className='form-control form-control-sm' name={lstPropsFormikFile[index]} required={!formik.values[lstPropsFormikFile[index]]} accept={inputFile[1]}
                    onFocus={() => setInputActive(lstPropsFormikFile[index])}
                    onBlur={() => setInputActive('')}
                    onChange={(ev) => { formik.handleChange(ev); onHandleDrag(ev); }}
                  />

                  {/* {console.log(formik.values)} */}
                  {/* <p className='text-danger'> {console.log(formik.values.fileImagen)} </p> */}
                  {/* <p className='text-danger'> { console.log(contentUpload[index])} </p> */}

                  <div className="text-upload">
                    {formik.values[lstPropsFormikFile[index]] ? <img src={contentUpload} alt='image' className='img-drop' /> : <p> Arrastre o seleccione una imagen </p>}
                  </div>


                </div>
                <label className="form-label-file"> {inputFile[0]} {formik.errors[lstPropsFormikFile[index]] ? <FontAwesomeIcon className='error' icon={faExclamationTriangle} beat /> : <FontAwesomeIcon className='ok' icon={faCheck} />} </label>
                {inputActive === lstPropsFormikFile[index] && <span className="error-msj"> {formik.errors[lstPropsFormikFile[index]]} </span>}
              </div>
            ))}
            <button type='submit' className='btn btn-success d-block'> {dataEntity ? 'Modificar' : 'Agregar'} {nameEntity} </button>
          </form>

        </div>
      </div>
    </>
  )
}
