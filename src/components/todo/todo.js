import React, { useState, useEffect } from "react";
import Form from "./form";
import Pagination from "./context/pagination";
import useForm from "../../hooks/form";
import { v4 as uuid } from "uuid";
function TODO(props) {
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  const [currentPage, setCurrentPage] = useState(1);
  const [listPerPage] = useState(3);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    let items = [];
    list.map((ele, idx) => {
      if (id === idx) {
        return 0;
      } else {
        items.push(ele);
      }
    });
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item, idx) => {
      if (idx === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [incomplete, list]);

  const indexOfLastCard = currentPage * listPerPage;
  const indexOfFirstCard = indexOfLastCard - listPerPage;
  const currentCard = list.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Form
        incomplete={incomplete}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        list={currentCard}
        toggleComplete={toggleComplete}
        deleteItem={deleteItem}
      />
      <br />
      <Pagination
        listPerPage={listPerPage}
        totalCards={list.length}
        paginate={paginate}
      />
    </div>
  );
}

export default TODO;