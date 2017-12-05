import React, {Component} from 'react';
import docComponents from "doc/docComponents";
import {Link} from "react-router-dom";

class ComponentPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: ""
    };
  }

  render() {
    const {
      match
    } = this.props;

    const {
      searchString
    } = this.state;

    const searchResult = Object.keys(docComponents)
      .filter((name) => name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
      .map((name) => {
        const isSelected = (match && match.params.component) === name;
        return (
          <li key={name} className={isSelected ? "selected" : null}>
            <Link to={"/components/" + name}>
              {name}
            </Link>
          </li>
        );
      });

    return (
      <div className="ComponentPicker">
        <input
          placeholder={"Find component..."}
          style={{width: "100%"}}
          type="search"
          value={searchString}
          onChange={(e) => this.setState({searchString: e.target.value})}
        />
        <ul>
          {searchResult}
        </ul>
      </div>
    );
  }
}

export default ComponentPicker;
