import React from 'react';
import ComponentDocs from '../../ComponentDocs';
import ExampleSection from '../../ExampleSection';
// autogenerated docs data containing descriptions of this component's props
import propDocs from './propDocs.json';

const examples = [
  {
    id: 'basic',
    label: 'Basic PieChart',
    codeText: require('./examples/PieChart.js.example').default,
  },
];

export default class PieChartExamples extends React.Component {
  render() {
    return (
      <ComponentDocs name="PieChart" propDocs={propDocs}>
        {/* documentation goes here. intersperse docs with examples or leave examples loop below */}

        {examples.map(example => {
          return <ExampleSection {...example} key={example.id} />;
        })}
      </ComponentDocs>
    );
  }
}
