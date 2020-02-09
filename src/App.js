import React from "react";
import Header from "./layout/header/Header";
import Customer from "./component/customer/Customer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddCustomer from "./component/customer/AddCustomer/AddCustomer";
import EditCustomer from "./component/customer/EditCustomer/EditCustomer";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Customer />
          </Route>
          <Route exact path="/add">
            <AddCustomer />
          </Route>
          <Route exact path="/edit/:id" render={props => <EditCustomer />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
