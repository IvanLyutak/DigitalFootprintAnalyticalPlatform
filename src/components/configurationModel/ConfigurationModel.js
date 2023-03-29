import { Modal, Form } from 'react-bootstrap';
import { useState } from 'react';

import "./ConfigurationModel.css"
import { Colors } from "../../colors/colors"
import CustomDropdown from '../customDropdown/CustomDropdown'

function ConfigurationModel({show, onHide, sources, formats, configurateModel }) {
    const [selectedFiles, setSelectedFiles] = useState([])
    const [source, setSource] = useState("Выберите формат источника данных")
    const [formatReport, setFormatReport] = useState("Выберите формат отчета")

    return (

                <Modal
                    show={show}
                    onHide={onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="configurationModel"
                >

                <Modal.Header closeButton>
                    <h4 className="titleConfigurationModel">
                        Конфигурация модели
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="sourceDataConfigurationModel">
                            <div className="label"> Источник данных </div>
                            <div className="input">  
                                <CustomDropdown selectedType={source} setSelectedType={(source) => { setSource(source) }} options={sources}/>
                            </div>
                    </div>

                    {source === "Из файла" ?
                    <>
                         <div className="fileDataConfigurationModel">
                            <div className="label"> Файл с данными (.json)</div>
                            <div className="input">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control type="file" accept=".json" onChange={e => { setSelectedFiles(e.target.files) }} />
                            </Form.Group>
                        </div>
                    </div>
                    </> :
                    <>
                    </>}

                    <div className="formatReportConfigurationModel">
                            <div className="label"> Формат отчета </div>
                            <div className="input">  
                                <CustomDropdown selectedType={formatReport} setSelectedType={(formatReport) => { setFormatReport(formatReport) }} options={formats}/>
                            </div>
                    </div>
                    <button className="buttonConfigurationModel" onClick={() => configurateModel(source, selectedFiles, formatReport)} style={{backgroundColor: Colors.Blue}}>Построить прогноз</button>
                </Modal.Body>
                </Modal>
    );
}

export default ConfigurationModel