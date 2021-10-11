import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Latex from "react-latex-next";
import firebase from "firebase";
import { storage } from "./firebase";

const Typer = (props) => {
  var [text, setText] = useState("");
  var [type, setType] = useState("1");
  var [file, setFile] = useState("")

  function questionDetailSubmit() {
    if (text !== "") {
      props.setInfo([...props.info, { type: type, data: text }]);
      setText("");

    }
  }


  function uploadImage(){
   const ref = storage.ref('previousYear')
   ref.child(file.name).put(file).then(e =>{
    storage.ref(`previousYear/${file.name}`).getDownloadURL()
    .then(url => {
      console.log(url);
      if(url){  
        props.setInfo([...props.info, { type: type, data: url }]);
      }
    })
   }).catch(e=>{
     console.log(e)
   })
  alert(file) 
  console.log(file);     
  setFile("")  
  }

  const onChangeValue = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
      <Container>
        <br />
        <div>
          <div>
            <h4>{props.title}</h4>
            <br />
            <div style={{ wordWrap: "break-word" }}>
              {props.info !== "" ? (
                props.info.map((e, index) => {
                  var { data, type } = e;
                  const LaTeX = "$" + data + "$ ";
                  return (
                    <div style={{ display: "inline" }}>
                      {type === "1" ? (
                        <text>{data} </text>
                      ) : type === "2" ? (
                        <Latex>{LaTeX}</Latex>
                      ) : (
                        <div>
                          <img src={data} alt ="img"/>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <br />
            <Row style={{ display: "flex" }}>
              <Col md={3}>
                <div onChange={onChangeValue}>
                  <input
                    type="radio"
                    value="1"
                    name={props.title}
                    defaultChecked="true"
                  />
                  text
                  <br />
                  <input type="radio" value="2" name={props.title} />
                  formula
                  <br />
                  <input type="radio" value="3" name={props.title} />
                  image
                  <br />
                </div>
              </Col>
              <Col>
              {
                type === "1" || type === "2"? (   <div>
                  <form
                     className="form"
                     onSubmit={(elm) => {
                       elm.preventDefault();
                       questionDetailSubmit();
                     }}
                   >
                     <textarea
                       placeholder="Write Here"
                       value={text}
                       onChange={(e) => setText(e.target.value)}
                     ></textarea>
                     <button type="submit">Add</button>
                   </form>
                  </div>):
                  (
                    <div>
                    <Form.Group controlId="formFileLg" className="mb-3" >
         <Form.Label>Large file input example</Form.Label>
         <Form.Control type="file" size="lg"
         onChange={
           (e)=>{
              setFile(e.target.files[0])
           }
         }
         />
         <Button type="submit" 
         onClick={
          (elm)=> {
    
         uploadImage()   
              }
        }>Add Image</Button>
       </Form.Group>
                    </div>
                  )

              }
            
     
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Typer;
