import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import "./GridCards.css"
import { Colors } from "../../colors/colors"

function GridCards({objects, choiceModule}) {
  
  return (
    <Row xs={1} md={2} className="g-4">
        {objects.map((object) => (
            <Col key={Math.random()}>
                <Card onClick={() => choiceModule(object["ModuleName"])}>
                    <Card.Body>
                        { object["Status"] === "launched" ?
                            <div className="viewStatusModule" style={{backgroundColor: Colors.Green}}> 
                                <div className="statusModule"> Запущено </div>
                            </div> 
                        : ( object["Status"] === "verified" ?
                            <div className="viewStatusModule" style={{backgroundColor: Colors.Yellow}}> 
                                <div className="statusModule"> Верификация </div>
                            </div> :
                            <div className="viewStatusModule" style={{backgroundColor: Colors.Red}}> 
                                <div className="statusModule"> Остановлено </div>
                            </div>
                        )
                        }
                        <div className="titleModule"> {object["ModuleName"]} </div>
                        <div className="labelOptions">
                            <div className="labelDeveloperModule"> Разработчик модуля </div>
                            <div className="labelDateChangeModule"> Дата изменения </div>
                        </div>
                        <div className="textOptions">
                            <div className="textDeveloperModule"> {object["Loader"]} </div>
                            <div className="textDateChangeModule"> {object["Date"]} </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </Row>
  );
}

export default GridCards;