import React from 'react';

import { Form, FloatingLabel } from 'react-bootstrap';

import "./UploadPage.css"
import { Colors } from "../../colors/colors"
import CustomDropdown from '../../components/customDropdown/CustomDropdown'

import { uploadService } from '../../services/api/modelService';

export default class UploadPage extends React.Component {

    constructor() {
        super()
        this.state = {
            selectedType: "Выберите тип модели",
            sentimentFormatType: "Выберите формат",
            options: ["Классификация", "Прогнозирование", "Кластеризация"],
            sentimentFormats: ["синглетон - синглетон", "синглетон - множество", "множество - синглетон", "множество - множество"]
        }
        this.setSelectedType = this.setSelectedType.bind(this);
        this.setSentimentFormatType = this.setSentimentFormatType.bind(this);
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    uploadModule = () => {
        const formData = new FormData();
    
        formData.append(
          "userModel",
          this.state.selectedFile
        );

        const data = {
            "ModuleName": document.getElementById('inputNameUploadModule').value,
            "Type": this.state.selectedType,
            "FileName": this.state.selectedFile.name,
            "Description": document.getElementsByClassName('inputDescriptionUploadModule')[0].value
        }

        formData.append(
            "data",
            JSON.stringify(data)
          );

        uploadService(formData, (data) => {
            console.log(data)

            document.getElementById('inputNameUploadModule').value = ""
            document.getElementsByClassName('inputDescriptionUploadModule')[0].value = ""
            document.getElementsByClassName('fileInput')[0].value = ""
            this.setState({
                selectedType: "Выберите тип модели",
                selectedFile: "Выберите формат"
            })
        })
      };

    setSelectedType(e){
        if (e === "") {
            this.setState({selectedType: "Выберите тип модели"})
        } else {
            this.setState({selectedType: e})
        }
    }

    setSentimentFormatType(e){
        if (e === "") {
            this.setState({sentimentFormatType: "Выберите формат"})
        } else {
            this.setState({sentimentFormatType: e})
        }
    }

    render() {
        return(
            <div className="UploadPage">
                <div className="formUploadModule"> 
                    <div className="labelUploadModule">
                        Форма запроса для загрузки аналитической модели
                    </div>
                    <div className="linkUploadModule">
                        <div className="label"> Ссылка на репозиторий с моделью вместе с Docker-file </div>
                        <div className="input">
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" onChange={this.onFileChange} className="fileInput"/>
                        </Form.Group>
                        </div>
                    </div>
                    <div className="nameUploadModule">
                        <div className="label"> Название загружаемого модуля </div>
                        <Form.Control placeholder="Введите название модуля" className="input" id="inputNameUploadModule"/> 
                    </div>
                    <div className="typeUploadModule">
                        <div className="label"> Тип загружаемого модуля </div>
                        <div className="input">  
                            <CustomDropdown selectedType={this.state.selectedType} setSelectedType={this.setSelectedType} options={this.state.options}/>
                        </div>
                    </div>

                    {this.state.selectedType === "Классификация" ? 
                    <>
                         <div className="typeUploadModule">
                            <div className="label"> Формат входа-выхода </div>
                            <div className="input">  
                                <CustomDropdown selectedType={this.state.sentimentFormatType} setSelectedType={this.setSentimentFormatType} options={this.state.sentimentFormats}/>
                            </div>
                        </div>
                    </> : 
                    <></>}

                    <div className="descriptionUploadModule">
                        <div className="label"> Описание модуля </div>
                        <FloatingLabel controlId="floatingTextarea2" label="Введите текст описания модуля" className="input">
                            <Form.Control
                            as="textarea"
                            className="inputDescriptionUploadModule"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                    </div>

                    <button className="buttonUploadModule" style={{backgroundColor: Colors.Blue}} onClick={this.uploadModule}> Загрузить модель </button>
                </div>
            </div>
        )
    }

}