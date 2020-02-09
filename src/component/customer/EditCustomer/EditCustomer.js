import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

function EditCustomer(props) {
  const [stateCust, setstateCust] = useState({});
  useEffect(() => {
    let id = props.match.params.id;
    getCustomerById(id);
  }, []);
  const getCustomerById = id => {
    axios
      .get(`http://localhost:8080/customer/${id}`)
      .then(d => {
        let customer = d.data;
        setstateCust({
          id: customer.id,
          name: customer.name,
          dob: new Date(customer.dob).toISOString().split("T")[0],
          creditlimit: customer.creditlimit
        });
      })
      .catch(err => alert(err));
  };
  const putCustomer = e => {
    console.log(stateCust);
    axios
      .put(`http://localhost:8080/customer/${stateCust.id}`, stateCust)
      .then(d => {
        props.history.push("/");
      })
      .catch(err => alert(err));
  };

  return (
    <div className="container my-3">
      <form
        onSubmit={e => {
          e.preventDefault();
          putCustomer(e);
        }}
      >
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={stateCust.name}
            onChange={e => {
              let value = e.target.value;
              setstateCust({
                name: value,
                id: stateCust.id,
                dob: stateCust.dob,
                creditlimit: stateCust.creditlimit
              });
            }}
            className="form-control form-control-sm"
          />
        </div>
        <div className="form-group">
          <label>DOB</label>
          <input
            value={stateCust.dob}
            onChange={e => {
              let value = e.target.value;
              setstateCust({
                dob: value,
                name: stateCust.name,
                id: stateCust.id,
                creditlimit: stateCust.creditlimit
              });
            }}
            type="text"
            className="form-control form-control-sm"
          />
        </div>
        <div className="form-group">
          <label>CreditLimit</label>
          <input
            onChange={e => {
              let value = e.target.value;
              setstateCust({
                dob: stateCust.dob,
                name: stateCust.name,
                id: stateCust.id,
                creditlimit: value
              });
            }}
            value={stateCust.creditlimit}
            type="text"
            className="form-control form-control-sm"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-sm">
          Submit
        </button>
      </form>
    </div>
  );
}

export default withRouter(EditCustomer);
