import { Modal, Form } from 'react-bootstrap';

import "./ManagerModel.css"
import { Colors } from "../../colors/colors"

function ManagerModel({show, onHide, data}) {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="managerModel"
        >

        <Modal.Header closeButton>
            <h4 className="titleManagerModel">
                Управление модулем
            </h4>
        </Modal.Header>
        <Modal.Body>
            <div className='bodyManagerModel'>
                <div className='title'> {show} </div>
                <div className='description'> {data.Description} </div>
                <div className='type'>
                    <span className="type_title">Тип модуля:</span> <span className="type_text">{data.Type}</span>
                </div>
                <div className="labelOptions">
                    <div className="labelDeveloperModule"> Разработчик модуля </div>
                    <div className="labelDateChangeModule"> Дата изменения </div>
                </div>
                <div className="textOptions">
                    <div className="textDeveloperModule"> {data.Loader} </div>
                    <div className="textDateChangeModule"> {data.Date} </div>
                </div>
            </div>
            { data.Status === "verified" ?
            <>
                <button className="buttonManagerModel" onClick={onHide} style={{backgroundColor: Colors.Yellow}}>Верифицировать модуль</button>
            </>
                : 
                <>
                    { data.Status === "stopped" ?
                    <>
                        <button className="buttonManagerModel" onClick={onHide} style={{backgroundColor: Colors.Green}}>Запустить модуль</button>
                    </>
                    :
                    <>
                         <button className="buttonManagerModel" onClick={onHide} style={{backgroundColor: Colors.Red}}>Остановить модуль</button>
                    </>
                }       
                </>  
            }
        </Modal.Body>
        </Modal>
    );
}

export default ManagerModel