import { getTodo, editTodo } from "../utils/data-todos";
import { useParams, useNavigate } from "react-router-dom";
import * as Icon from "react-feather";
import { formatDate } from "../utils/tools";
import { useState } from "react";

function DetailPage() {
  const params = useParams();
  const navigate = useNavigate();

  // Convert params.id to a number because params.id is a string
  const todo = getTodo(Number(params.id));

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");

  const badgeStatus =
    todo && todo.is_finished ? (
      <span className="badge bg-success">Selesai</span>
    ) : (
      <span className="badge bg-warning">Proses</span>
    );

  let resultRender;
  if (todo) {
    resultRender = (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card mt-3">
              <div className="card-body">
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      className="form-control mb-3"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                      className="form-control mb-3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                      className="btn btn-success me-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3>
                      {todo.title} {badgeStatus}
                    </h3>
                    <hr />
                    <div>
                      {todo.is_finished ? (
                        <div>
                          <Icon.Check /> Selesai pada:
                          <span className="ms-2 text-success">
                            {formatDate(todo.updated_at)}
                          </span>
                        </div>
                      ) : null}
                      <div className="text-middle">
                        <Icon.Clock /> Dibuat pada:
                        <span className="ms-2 text-muted">
                          {formatDate(todo.created_at)}
                        </span>
                      </div>
                    </div>
                    <hr />
                    <p>{todo.description}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    resultRender = <p>Tidak ada catatan</p>;
  }

  return resultRender;
}

export default DetailPage;
//try
