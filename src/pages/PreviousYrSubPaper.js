import React, {useState} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styl from '../components/css/QuePaper.module.css';
import "../components/css/myCss.css";

const PreviousYrSubPaper = () => {

    return (
        <div>
            <Container style={{marginTop:"10%", textAlign:"center", color:"rgb(88, 88, 88)"}}>
            <h1>Previous Year Subject Wise</h1>
            <div style={{ marginTop:"50px",display: "flex", justifyContent: "center"}}>
                <Row>
                    <Col>
                  <a href={`/previousYear/0`}>
                  <div className={styl.subjects}>
                        <h4>Physics</h4>
                    </div>
                  </a>
                    </Col>
                    <Col>
                    <a href={`/previousYear/1`}>
                  <div className={styl.subjects}>
                        <h4>Chemistry</h4>
                    </div>
                  </a>
                    </Col>
                    <Col>
                    <a href={`/previousYear/2`}>
                  <div className={styl.subjects}>
                        <h4>Maths</h4>
                    </div>
                  </a>
                    </Col>
                </Row>
            </div>
            </Container>
        </div>
    );
};

export default PreviousYrSubPaper;