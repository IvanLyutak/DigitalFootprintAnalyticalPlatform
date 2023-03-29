import React from 'react';

import "./ManagerPage.css"

import { Form, Stack } from 'react-bootstrap';

import CustomDropdown from '../../components/customDropdown/CustomDropdown'
import GridCards from '../../components/gridCards/GridCards'
import { Colors } from "../../colors/colors"

import ManagerModel from '../../components/managerModel/ManagerModel';

import { getAllAnalyticsModules, getDataAnalyticsModule } from "../../services/api/getAnalyticsModules"

export default class ManagerPage extends React.Component {

    constructor() {
        super()
        this.state = {
            modalShow: false,
            selectedType: "Сортировать",
            options: ["Сначала старые", "Сначала новые"],
            objects: [],
            data: {}
        }
        this.setSelectedType = this.setSelectedType.bind(this);
        this.setModalShow = this.setModalShow.bind(this);
    }

    componentDidMount() {
        
        if (sessionStorage.getItem('myUserEntity') !== null) {
            getAllAnalyticsModules((data) => {
                console.log("data:", data) 
                this.setState({objects: data})
            }) 
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
        console.log(e)

        getDataAnalyticsModule({"name": e}, (data) => {
            console.log(data)

            this.setState({data: data})
            this.setModalShow(e)
        })
    }

    render() {
        return(
            <>
            <div className="managerPage">
                <div className="LabelModuleAnalytics"> Управление модулями </div>

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
             <ManagerModel
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                data={this.state.data}
            />
         </>
        )
    }

}