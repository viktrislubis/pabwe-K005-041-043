import React from "react";
import TodoList from "../components/TodoList";
import { getAllTodo, getTodo, editTodo, deleteTodo } from "../utils/data-todos";
import PropTypes from "prop-types";
import Swal from "sweetalert2"; // Import SweetAlert2

function HomePageWrapper({ keyword }) {
  return <HomePage keyword={keyword} />;
}

HomePageWrapper.propTypes = {
  keyword: PropTypes.string.isRequired,
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: getAllTodo(),
      isEditing: null, // store the id of the todo being edited
      title: "",
      description: "",
    };
    this.onTodoFinished = this.onTodoFinished.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onEditHandler = this.onEditHandler.bind(this);
    this.onSaveEditHandler = this.onSaveEditHandler.bind(this);
    this.onCancelEditHandler = this.onCancelEditHandler.bind(this);
  }

  onDeleteHandler(id) {
    deleteTodo(id);
    this.setState({
      todos: getAllTodo(),
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Todo berhasil dihapus!",
      showConfirmButton: false,
      timer: 700,
    });
  }

  onTodoFinished(id, status) {
    const targetTodo = getTodo(id);
    if (targetTodo) {
      editTodo({
        id,
        title: targetTodo.title,
        description: targetTodo.description,
        is_finished: status,
      });
      this.setState({
        todos: getAllTodo(),
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Berhasil mengubah status todo!`,
        showConfirmButton: false,
        timer: 700,
      });
    }
  }

  // Trigger editing mode
  onEditHandler(id) {
    const targetTodo = getTodo(id);
    this.setState({
      isEditing: id,
      title: targetTodo.title,
      description: targetTodo.description,
    });
  }

  // Save edited todo
  onSaveEditHandler(id) {
    editTodo({
      id,
      title: this.state.title,
      description: this.state.description,
      is_finished: getTodo(id).is_finished,
    });
    this.setState({
      todos: getAllTodo(),
      isEditing: null,
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Todo berhasil diperbarui!",
      showConfirmButton: false,
      timer: 700,
    });
  }

  // Cancel editing
  onCancelEditHandler() {
    this.setState({
      isEditing: null,
      title: "",
      description: "",
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <TodoList
            todos={this.state.todos}
            onDelete={this.onDeleteHandler}
            onTodoFinished={this.onTodoFinished}
            keywordSearch={this.props.keyword}
            onEdit={this.onEditHandler} // Pass the edit handler
          />
          {this.state.isEditing && (
            <div className="col-12">
              <div className="card mt-3">
                <div className="card-body">
                  <h4>Edit Todo</h4>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                  />
                  <textarea
                    className="form-control mb-3"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  />
                  <button
                    className="btn btn-success me-2"
                    onClick={() => this.onSaveEditHandler(this.state.isEditing)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={this.onCancelEditHandler}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default HomePageWrapper;
