import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function AddCustomer(props) {
  const submit = e => {
    let name = e.target[0].value;
    let dob = e.target[1].value;
    let creditlimit = e.target[2].value;
    let data = {
      name,
      dob,
      creditlimit
    };
    postCustomer(data);
  };

  const postCustomer = data => {
    axios
      .post("http://localhost:8080/customer", data)
      .then(d => {
        console.log(d);
        props.history.push("/");
      })
      .catch(err => alert(err));
  };

  return (
    <div className="container my-3">
      <form
        onSubmit={e => {
          e.preventDefault();
          submit(e);
        }}
      >
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control form-control-sm" />
        </div>
        <div className="form-group">
          <label>DOB</label>
          <input type="text" className="form-control form-control-sm" />
        </div>
        <div className="form-group">
          <label>CreditLimit</label>
          <input type="text" className="form-control form-control-sm" />
        </div>

        <button type="submit" className="btn btn-primary btn-sm">
          Submit
        </button>
      </form>
    </div>
  );
}

export default withRouter(AddCustomer);
