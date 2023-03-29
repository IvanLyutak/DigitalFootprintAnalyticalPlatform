import React from 'react';

import "./AnalyticsPage.css"

import { Form, Stack } from 'react-bootstrap';

import CustomDropdown from '../../components/customDropdown/CustomDropdown'
import GridCards from '../../components/gridCards/GridCards'
import { Colors } from "../../colors/colors"
import ConfigurationModel from "../../components/configurationModel/ConfigurationModel"

import getLaunchedAnalyticsModules from "../../services/api/getAnalyticsModules"
import modelService from '../../services/api/modelService';

export default class AnalyticsPage extends React.Component {

    constructor() {
        super()
        this.state = {
            modalShow: false,
            selectedType: "Сортировать",
            selectedModule: "",
            sources: ["Из базы данных Цифрового следа", "Из файла"],
            formats: ["В новой вкладке"],
            options: ["Сначала старые", "Сначала новые"],
            objects: []
        }
        this.setSelectedType = this.setSelectedType.bind(this);
        this.setModalShow = this.setModalShow.bind(this);
        this.configurateModel = this.configurateModel.bind(this);
    }

    componentDidMount() {
        
        if (sessionStorage.getItem('myUserEntity') !== null) {
            getLaunchedAnalyticsModules((data) => {
                console.log("data:", data) 
                this.setState({objects: data})
            }) 
        }
    }

    configurateModel(moduleName, source, file, report) {

        if (source === "Из файла") {
            var reader = new FileReader();
            reader.onload = function(event) {
                const data = {
                    "ModuleName": moduleName,
                    "Source": source,
                    "Data": JSON.parse(event.target.result),
                    "FormatReport": report
                }

                console.log(data)
                localStorage.setItem("configurationModel", JSON.stringify(data))

                window.location.pathname = "/results"
        }
        reader.readAsText(file[0]);
        this.setModalShow(false)
        } else {
            const data = {
                "ModuleName": moduleName,
                "Source": source,
                "Data": {},
                "FormatReport": report
            }

            console.log(data)
            localStorage.setItem("configurationModel", JSON.stringify(data))

            window.location.pathname = "/results"
        }
    }

    setSelectedType(e){
        if (e === "") {
            this.setState({selectedType: "Сортировать"})
        } else {
            this.setState({selectedType: e})
        }
    }

    setModalShow(e) {
        this.setState({modalShow: e})
    }

    choiceModule(e) {
        console.log("Выбор")
        console.log(e)
        this.setState({selectedModule: e})
        this.setModalShow(true)
    }

    render() {
        return(
            <>
            { sessionStorage.getItem('myUserEntity') !== null ?
            <>
            <div className="analyticsPage">
                <div className="LabelModuleAnalytics"> Модули аналитики </div>

                <Stack direction="horizontal" gap={2} className="searchModule">
                    <Form.Control placeholder="Введите название модуля" className="name_module_input"/> 
                    <button className="module_search_button" style={{backgroundColor: Colors.Yellow}}> Найти </button>
                </Stack>
                <div className="bottomPartMenu">
                    <div className="dropdownSorted">
                        <CustomDropdown selectedType={this.state.selectedType} setSelectedType={this.setSelectedType} options={this.state.options}/>
                    </div>
                    <div className="foundView"> 
                        Найдено {this.state.objects.length} модулей
                    </div>
                </div>

                <div className="gridCards">
                    <GridCards objects={this.state.objects} choiceModule={(e) => this.choiceModule(e)}/>
                </div>
            </div>
            <ConfigurationModel
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                sources={this.state.sources}
                formats={this.state.formats}
                configurateModel = {(source, file, report) => this.configurateModel(this.state.selectedModule, source, file, report)}
            />
            </>
            : <div> Для продолжения работы необходимо авторизоваться</div>}
          </>
        )
    }

}