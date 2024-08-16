import React from "react";

function Card() {
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src="/burger.jpg" className="card-img-top" alt="okk" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Important info</p>
          <select className="m-2 p-1 rounded bg-success h-100">
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select className="m-2 h-100 bg-success rounded p-1">
            <option value="Half">Half</option>
            <option value="Full">Full</option>
          </select>
          <div className="d-inline h-100 fs-5">Total Price</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
