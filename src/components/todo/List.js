import React from "react";
import { Card } from "@blueprintjs/core";
import { Button } from "react-bootstrap";
import "./todo.css";

function List(props) {
    return (
        <div>
            {props.list.map((item, idx) => (
                <div key={idx}>
                    <Card interactive elevation={2} >
                        {item.complete ? (
                            <span className="span1">Completed</span>
                        ) : (
                            <span className="span2">pending</span>
                        )}
                        <h3>{item.text}</h3>
                        <p>
                            <small>Assigned to: {item.assignee}</small>
                        </p>
                        <p>
                            <small>Difficulty: {item.difficulty}</small>
                        </p>
                        <Button
                            onClick={() => props.toggleComplete(idx)}
                            className="btn btn-md btn-warning"
                        >
                            Complete: {item.complete.toString()}
                        </Button><br />
                        <Button
                            className="btn btn-md btn-danger"
                            id="btn"
                            onClick={() => props.deleteItem(idx)}
                        >
                            X
                        </Button>
                    </Card>
                </div>
            ))}
        </div>
    );
}

export default List;