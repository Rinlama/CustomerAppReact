import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerRow from "./CustomerRow";
import { Link } from "react-router-dom";

function Customer() {
  const [stateCustomer, setCustomerState] = useState([]);

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = () => {
    axios
      .get("http://localhost:8080/customers")
      .then(data => {
        let customer = data.data;
        setCustomerState(
          customer.map(d => {
            return {
              select: false,
              id: d.id,
              name: d.name,
              dob: new Date(d.dob).toDateString(),
              creditlimit: d.creditlimit
            };
          })
        );
      })
      .catch(err => alert(err));
  };

  const deleteCustomerByIds = () => {
    let arrayids = [];
    stateCustomer.forEach(d => {
      if (d.select) {
        arrayids.push(d.id);
      }
    });
    axios
      .delete(`http://localhost:8080/customers/${arrayids}`)
      .then(data => {
        console.log(data);
        getCustomer();
      })
      .catch(err => alert(err));
  };

  return (
    <div>
      <Link to="/add">
        <button className="btn btn-primary btn-sm m-2">Add Customer</button>
      </Link>
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => {
          deleteCustomerByIds();
        }}
      >
        Delete Customer
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={e => {
                  let value = e.target.checked;
                  setCustomerState(
                    stateCustomer.map(d => {
                      d.select = value;
                      return d;
                    })
                  );
                }}
              />
            </th>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Dob</th>
            <th scope="col">CreditLimit</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          <CustomerRow
            stateCustomer={stateCustomer}
            setCustomerState={setCustomerState}
          />
        </tbody>
      </table>
    </div>
  );
}

export default Customer;
