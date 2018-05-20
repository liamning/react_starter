var React = require('react');
var ReactDOM = require('react-dom'); 
var LocalPlugin = require('griddle-react').plugins.LocalPlugin;

import { InlineNumberField } from "../Base/Forms/InlineControl";

import { Griddle, RowDefinition, ColumnDefinition}  from 'griddle-react';

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


          // <RowDefinition>
          // <ColumnDefinition id="name" customComponent={InlineNumberField} />
          // <ColumnDefinition id="state" customHeading={InlineNumberField}/>
          // <ColumnDefinition id="country" customComponent={InlineNumberField}/>
        //</RowDefinition>
        
const TestComponent = (props) => {
  return (
    <div>
      <h1>Test</h1>
      <Griddle className="table table-striped" data={fakeData} plugins={[LocalPlugin]} />
    </div>
  );
}

export default TestComponent;
 