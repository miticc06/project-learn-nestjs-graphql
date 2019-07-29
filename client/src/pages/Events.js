import React, { Component } from "react";
import { Row, Col } from "antd";

class EventPage extends Component {
    render() {
        return (
            <React.Fragment>
                <h1> Events Page</h1>
                <Row>
                    <Col span={12} offset={6}>
                        col-8
                </Col>
                </Row>
            </React.Fragment>


        );
    }
}

export default EventPage;