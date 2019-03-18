import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Layout from "../components/Layout";
import RealtyList from "../components/RealtyList";

import {
  Alert,
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row
} from "reactstrap";

class Index extends React.Component {
  constructor(props) {
    super(props);
    //query state will be passed to RealtyList for the filter query
    this.state = {
      query: ""
    };
  }
  onChange(e) {
    //set the state = to the input typed in the search Input Component
    //this.state.query gets passed into RealtyList to filter the results
    this.setState({ query: e.target.value.toLowerCase() });
  }
  render() {
    return (
      <div className="container-fluid">
        <Row>
          <Col>
            <div className="search">
              <InputGroup>
                <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                <Input onChange={this.onChange.bind(this)} />
              </InputGroup>
            </div>
            <RealtyList search={this.state.query} />
          </Col>
        </Row>
        <style jsx>
          {`
            .search {
              margin: 20px;
              width: 500px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Index;
