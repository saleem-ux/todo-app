import React from "react";
import {
    FormGroup,
    InputGroup,
    Button,
} from "@blueprintjs/core";
import { Container, Row, Col } from "react-bootstrap";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./todo.css";
import List from "./List";

const ToDo = (props) => {
    return (
        <>
            <div>
                <h2>Add To Do Item</h2>
                <Container>
                    <Row>
                        <Col xs={3}>
                            <form onSubmit={props.handleSubmit}>
                                <FormGroup label="To Do Item">
                                    <InputGroup
                                        onChange={props.handleChange}
                                        placeholder="Item Details"
                                        name="text"
                                        type="text"
                                        intent="success"
                                        round="true"
                                    />
                                </FormGroup>

                                <FormGroup label="Assigned To">
                                    <InputGroup
                                        onChange={props.handleChange}
                                        placeholder="Assignee Name"
                                        name="assignee"
                                        type="text"
                                        intent="warning"
                                        round="true"
                                    />
                                </FormGroup>
                                <FormGroup label="Difficulty">
                                    <InputGroup
                                        onChange={props.handleChange}
                                        defaultValue={3}
                                        type="range"
                                        min={1}
                                        max={5}
                                        name="difficulty"
                                        intent="danger"
                                        round="true"
                                    />
                                </FormGroup>

                                <Button
                                    text="Add Item"
                                    className="bp3-intent-primary"
                                    type="submit"
                                />
                            </form>
                        </Col>
                        <Col xs={9}>
                            <List
                                list={props.list}
                                toggleComplete={props.toggleComplete}
                                deleteItem={props.deleteItem}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ToDo;