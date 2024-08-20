import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './FormCreateEdit.css';

export default function FormCreateEdit({ nameEntity, lstNameLabels, lstInputsFileImage, formik, dataEntity, redirectBack }) {

  const navigate = useNavigate();
  //dataEntity is a object with the data of the entity is for modify

  //Structure lstInputsFileImage = [ [name, accept], ... ]
  const lstPropsFormik = Object.keys(formik.values);
  // console.log(lstPropsFormik);
  const lstPropsFormikFile = lstPropsFormik.filter(prop => prop.includes('file'));
  // console.log(lstPropsFormikFile);
  const [inputActive, setInputActive] = useState('');
  //This variable is used for show the image in screen
  const [contentUpload, setContentUpload] = useState(dataEntity ? lstPropsFormikFile.map(prop => dataEntity[prop]).toString() : null);
  // console.log(contentUpload);

  //This function is for show the image in screen when is dragged or selected
  const onHandleDrag = (ev, formikValue) => {
    
    if (ev.target.files[0]) {//Ask if exist a image
      
      formik.setFieldValue(formikValue, ev.target.files[0]); //We add the image to formik.values[image]
      
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
    formik.handleSubmit();
  }

  return (
    <>
      <div className='form-create-edit-component'>
        <div className="container-form-create-edit bg-dark">

          <h2 className='form-title'>  {dataEntity ? `Modificar ${nameEntity}` : `Agregar ${nameEntity}`} </h2>
          <form className='form-create-edit' onSubmit={(ev) => onHandleSubmit(ev)}>

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
                    onChange={(ev) => { formik.handleChange(ev); onHandleDrag(ev, lstPropsFormikFile[index]); }}
                  />

                  {/* {console.log([lstPropsFormikFile[index]])} */}
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
            <div className="container-buttons-form">
              <button type='submit' className='btn btn-success'> {dataEntity ? 'Modificar' : 'Agregar'} {nameEntity} </button>
              <button type='button' className='btn btn-primary' onClick={() => navigate(redirectBack)}> Regresar </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}
