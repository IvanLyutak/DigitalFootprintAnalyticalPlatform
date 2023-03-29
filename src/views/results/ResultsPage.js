import React from "react";
import "./ResultsPage.css"

import Table from "../../components/table/Table";
import Highcharts from 'highcharts/highstock';

import modelService from "../../services/api/modelService";

export default class ResultsPage extends React.Component {
    constructor() {
        super();

        this.state = {
            title: "классификации",
            sourceData: "recommendation.json",
            modelName: "recommendation",
            data_table: [],
            data_head: <tr></tr>,
        }
    }

    componentDidMount() {

        const data = JSON.parse(localStorage.getItem("configurationModel"))

        modelService(data, (data) => {
            this.setState({
                data_table: [{"number": 1,"result": 'Blockchain Revolution',"value": 0.071199912393}, {"number":2,"result": 'Programming for everybody',"value": 0.04546438346}],
                data_head:  <tr><th>Номер строки</th><th>Результат</th><th>Значение вероятности</th></tr>
            })
            this.printGraph()
        })
    }

    printGraph() {
        Highcharts.chart('containerGraph', {
            title: {
              text: ''
            },
            xAxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Количеcтво'
                }
        
            },
            series: [{
              type: 'column',
              name: 'Количество',
              colorByPoint: true,
              data: [5412, 4977, 4730, 4437, 3947, 3707, 4143, 3609,
                3311, 3072, 2899, 2887],
              showInLegend: false
            }]
          });
    }

    render() {
        return(
            <div className="resultsPage">
                <div className="mainResultsPage">
                    <div className="configurationModel" >
                        <div className="mainTitle"> Конфигурация модели {this.state.title}</div>
                        <div className="configurationModelData">
                            <div className="titleData">
                                <div className="sourceData"> Источник данных </div>
                                <div className="modelData"> Аналитическая модель </div>
                            </div>
                            <div className="nameData">
                                <div className="sourceText"> {this.state.sourceData} </div>
                                <div className="modelText"> {this.state.modelName} </div>
                            </div>
                        </div>
                    </div>
                    <div className="results">
                        <div className="table">
                            <div className="title"> Результаты работы аналитической модели</div>
                            <div className="tableData" >
                                <Table
                                    data={this.state.data_table}
                                    head={this.state.data_head}
                                />
                            </div>
                        </div>
                        <div className="graphs">
                            <div className="title"> Сводные графики</div>
                            <div className="graphData" >
                                <div id="containerGraph"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

