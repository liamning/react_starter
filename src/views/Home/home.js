import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody
} from 'reactstrap'
import Chart from './D3Test'


class Home extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col  xs="6">
            <Card>
              <CardBody>
                <Chart id="Test1"></Chart>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6">
            <Card>
              <CardBody>
                <Chart id="Test2"></Chart>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
