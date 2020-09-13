import React from 'react';

export default class Test extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        testText: ""
      };
    }

    componentDidMount() {
        fetch('http://localhost:5000/test', {
            method: 'get',
            headers: {
                'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/json',
                // 'Accept': 'application/json',
            }
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ testText: data.test });
            })
            .catch(e=> {
                console.error("Request error", e)
            });
        console.log(this.state.testText);
    }

    render() {
      return (
        <div>
          <p>Displaying {this.state.testText} from backend</p>
        </div>
      );
    }
  }