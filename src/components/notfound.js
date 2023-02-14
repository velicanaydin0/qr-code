import react from "react";

function notfound() {
  return (
    <div className="App">
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
          display: "flex",
        }}
      >
        <div
          style={{ margin: "8px" }}
          className="spinner-grow text-success"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>

        <div
          style={{ margin: "8px" }}
          className="spinner-grow text-danger"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          style={{ margin: "8px" }}
          className="spinner-grow text-warning"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default notfound;
