//var React = require('react');
import React from 'react'
//var ReactDOM = require('react-dom');
import ReactDOM from 'react-dom'
//var Griddle = require('griddle-react').default;
import{ Griddle, RowDefinition, ColumnDefinition, LocalPlugin } from 'griddle-react'
//var RowDefinition = require('griddle-react');
//var ColumnDefinition = require('griddle-react');
//var LocalPlugin = require('griddle-react').plugins.LocalPlugin;
import { InlineNumberField } from "../Base/Forms/InlineControl";

var fakeData =  [
  {
    "id": 0,
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  },
  {
    "id": 1,
    "name": "Koch Becker",
    "city": "Johnsonburg",
    "state": "New Jersey",
    "country": "Madagascar",
    "company": "Eventage",
    "favoriteNumber": 2
  },
  {
    "id": 2,
    "name": "Lowery Hopkins",
    "city": "Blanco",
    "state": "Arizona",
    "country": "Ukraine",
    "company": "Comtext",
    "favoriteNumber": 3
  },
  {
    "id": 3,
    "name": "Walters Mays",
    "city": "Glendale",
    "state": "Illinois",
    "country": "New Zealand",
    "company": "Corporana",
    "favoriteNumber": 6
  },
  {
    "id": 4,
    "name": "Shaw Lowe",
    "city": "Coultervillle",
    "state": "Wyoming",
    "country": "Ecuador",
    "company": "Isologica",
    "favoriteNumber": 2
  }
]; 

const TestComponent = (props) => {
  
  customerCol = ()=>{

    return <InlineNumberField/>
  }

  return (
    <div>
      <h1>Test</h1>
      

      <Griddle data={fakeData}>
        <RowDefinition>
          <ColumnDefinition id="name" customComponent={this.customerCol} /> 
          <ColumnDefinition id="company" />
        </RowDefinition>
    </Griddle>

    </div>
  );
}

export default TestComponent;
 