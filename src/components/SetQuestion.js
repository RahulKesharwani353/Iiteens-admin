import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Latex from "react-latex-next";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Typer from "./Typer.js";
import {
  FormControlLabel,
  FormLabel,
  Checkbox,
  Button,
  TextField,
} from "@material-ui/core";
import { db } from "./firebase";
import "../components/css/myCss.css";
import { render } from "@testing-library/react";

const SetQuestion = (props) => {
  var [type, setType] = useState("1");
  var [text, setText] = useState("");
  var [questionDetail, setQuestionDetail] = useState("");
  var [option1, setOption1] = useState("");
  var [option2, setOption2] = useState("");
  var [option3, setOption3] = useState("");
  var [option4, setOption4] = useState("");
  var [questionType, setQuestionType] = useState("1");
  var [correct, setCorrect] = useState([]);
  var [editPaper, setEditPaper] = useState("");
  var [solution, setSolution] = useState("");
  var [hint, setHint] = useState("");
  var [year, setYear] = useState("");
  const [multiOption, setMultiOption] = React.useState([
    false,
    false,
    false,
    false,
  ]);

  // const Class = props.match.params.Class
  // const Id = props.match.params.Id
  // const QuestionNo = props.match.params.questionNo
  // const Subject = props.match.params.subject
  // const Chapter = props.match.params.chapter
  // alert(props.match.params.Id)

  // console.log(props.location.state);
  const Class = props.location.state.Class;
  const Id = props.location.state.id;
  const QuestionNo = props.location.state.QuestionNo;
  const Subject =  props.location.state.Subject;
  const Chapter =  props.location.state.Chapter;
  useEffect(() => {
    fetchPaper();
  }, []);

  const submitPaper = (e) => {
    db.collection("PYSV")
      .doc(Class)
      .collection(Subject)
      .doc(Chapter)
      .collection("question")
      .add({
        question: questionDetail,
        questionType: questionType,
        option2: option2,
        option1: option1,
        option3: option3,
        option4: option4,
        correct: correct,
        hint: hint,
        solution: solution,
        year: year,
        questionNumber: `${QuestionNo}`,
      })
      .then(() => {
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const updatePaper = (e) => {
    db.collection("PYSV")
      .doc(Class)
      .collection(Subject)
      .doc(Chapter)
      .collection("question")
      .doc(Id)
      .update({
        question: questionDetail,
        questionType: questionType,
        option2: option2,
        option1: option1,
        option3: option3,
        option4: option4,
        correct: correct,
        solution: solution,
        hint: hint,
        questionNumber: `${QuestionNo}`,
      })
      .then(() => {
        alert("Updated paper");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleCheck = (index) => {
    const ans = [...multiOption];
    // if(ans[index]===true){

    // }
    ans[index] = !ans[index];
    setMultiOption(ans);
    // setCorrect(...correct,index)
    if (ans[index] === true) {
      setCorrect((current) => [...current, index]);
    } else {
      setCorrect(correct.filter((item) => item !== index));
    }
    console.log(correct);
  };

  function handleOnDragEnd(array, result) {
    if (array === option1) {
      const items = Array.from(option1);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption1(items);
    }
    if (array === questionDetail) {
      const items = Array.from(questionDetail);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setQuestionDetail(items);
    }
    if (array === option1) {
      const items = Array.from(option1);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption1(items);
    }
    if (array === option2) {
      const items = Array.from(option2);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption2(items);
    }
    if (array === option3) {
      const items = Array.from(option3);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption3(items);
    }
    if (array === option4) {
      const items = Array.from(option4);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption4(items);
    }
    if (array === solution) {
      const items = Array.from(solution);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setSolution(items);
    }
    if (array === hint) {
      const items = Array.from(hint);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setHint(items);
    }
  }

  function deleteElement(index, field) {
    const updateItems = field.filter((elm, ind) => {
      return index !== ind;
    });
    if (field === questionDetail) {
      setQuestionDetail(updateItems);
    }
    if (field === option1) {
      setOption1(updateItems);
    }
    if (field === option2) {
      setOption2(updateItems);
    }
    if (field === option3) {
      setOption3(updateItems);
    }
    if (field === option4) {
      setOption4(updateItems);
    }
    if (field === solution) {
      setSolution(updateItems);
    }
    if (field === hint) {
      setHint(updateItems);
    }

    return updateItems;
  }

  async function fetchPaper() {
    if (Id) {
      db.collection("PYSV")
        .doc(Class)
        .collection(Subject)
        .doc(Chapter)
        .collection("question")
        .doc(Id)
        .get()
        .then((snap) => {
          if (snap.exists) {
            setEditPaper(snap.data());
          } else {
            alert("no");
          }
          alert(`${Chapter}, ${Class}, ${Id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(()=>{
    if (editPaper !== "") {
      console.log(editPaper);
      setQuestionDetail(editPaper.question);
      setOption1(editPaper.option1);
      setOption2(editPaper.option2);
      setOption3(editPaper.option3);
      setOption4(editPaper.option4);
      setQuestionType(editPaper.questionType);
      setCorrect(editPaper.correct);
      setYear(editPaper.year);
      setHint(editPaper.hint);
      setSolution(editPaper.solution);
      // render();
    }
  },[correct, editPaper])
  const DragContain = (props) => {
    console.log("aya bab");
    return (
      <Container>
        <DragDropContext
          onDragEnd={(result) => {
            if (!result.destination) return;
            handleOnDragEnd(props.filed, result);
          }}
        >
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ marginTop: "50px" }}
              >
                {props.filed !== "" ? (
                  props.filed.map((e, index) => {
                    var { data } = e;
                    var keyBla= data+index;
                    return (
                  
                      <Draggable key={keyBla} draggableId={keyBla} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="drag-card">
                              {data}
                              <button
                                onClick={() =>
                                deleteElement(index, props.filed)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })
                ) : (
                  <></>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    );
  };

  return (
    <div>
      <h1 style={{textAlign:'center'}}> Question Paper - {QuestionNo} </h1>
      <br />
      <Typer
        info={questionDetail}
        setInfo={setQuestionDetail}
        title="question"
      />

      <DragContain filed={questionDetail} />

      {/* ---------------------------------------Question End------------------------------------- */}

      <Container>
        <div>
          <h4>Select Question type</h4>
          <div
            style={{
              display: "inline-flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <input
              type="radio"
              value="1"
              name="questionType"
              defaultChecked="true"
            />
            Single Correct
            <br />
            <input type="radio" value="2" name="questionType" 
            // defaultChecked={ questionType==="2"?"true":"false" }
             />
            Multiple Correct
            <br />
            <input type="radio" value="3" name="questionType" />
            Integers
            <br />
            <input type="radio" value="4" name="questionType"  />
            Numerical
            <br />
          </div>
        </div>
        <div>
          {questionType === "4" ? (
            <div style={{ margin: "50px" }}>
              <h4>Enter Answer</h4>
              <input
                placeholder="Correct answer"
                value={correct}
                onChange={(e) => setCorrect(e.target.value)}
              ></input>
            </div>
          ) : questionType === "3" ? (
            <div>
              <h4>Enter Answer</h4>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Upper Limit"
                onChange={(e) => setCorrect(e.target.value)}
              />
              <br />
            </div>
          ) : questionType === "1" || questionType === "2" ? (
            <div>
              <hr />
              <Row>
                <Col>
                  <Typer info={option1} setInfo={setOption1} title="option 1" />
                </Col>
                <Col>
                  <DragContain filed={option1} />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <Typer info={option2} setInfo={setOption2} title="option 2" />
                </Col>
                <Col>
                  <DragContain filed={option2} />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <Typer info={option3} setInfo={setOption3} title="option 3" />
                </Col>
                <Col>
                  <DragContain filed={option3} />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <Typer info={option4} setInfo={setOption4} title="option 4" />
                </Col>
                <Col>
                  <DragContain filed={option4} />
                </Col>
              </Row>
              <hr />

              <div>
                <h4>
                  <h4>Correct Answer</h4>
                </h4>
                <FormLabel component="legend" style={{ color: "black" }}>
                  Select Options
                </FormLabel>
                <FormControlLabel
                  checked={multiOption[0]}
                  onChange={() => handleCheck(0)}
                  control={<Checkbox />}
                  label="1"
                />
                <FormControlLabel
                  checked={multiOption[1]}
                  onChange={() => handleCheck(1)}
                  control={<Checkbox />}
                  label="2"
                />
                <FormControlLabel
                  checked={multiOption[2]}
                  onChange={() => handleCheck(2)}
                  control={<Checkbox />}
                  label="3"
                />
                <FormControlLabel
                  checked={multiOption[3]}
                  onChange={() => handleCheck(3)}
                  control={<Checkbox />}
                  label="4"
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Container>

      <Container>
        <hr />
        <Row>
          <Col>
            <Typer info={solution} setInfo={setSolution} title="Solution" />
          </Col>
          <Col>
            <DragContain filed={solution} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Typer info={hint} setInfo={setHint} title="Hint" />
          </Col>
          <Col>
            <DragContain filed={hint} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h4>Year Of Paper</h4>
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            ></TextField>
          </Col>
        </Row>
      </Container>
      {Id ? (
        <Container>
          <Button className="shadow-btn" onClick={updatePaper}style={{margin:'30px', width:'100%', background:'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'}}>
            Update Paper
          </Button>
        </Container>
      ) : (
        <Container>
          <Button className="shadow-btn" onClick={submitPaper} style={{margin:'30px', width:'100%', background:'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'}}>
            Create New Paper
          </Button>
        </Container>
      )}
    </div>
  );
};

export default SetQuestion;
