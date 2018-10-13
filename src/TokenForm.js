import React from "react";
import PropTypes from "prop-types";
import { Input } from "@progress/kendo-react-inputs";

export default class TokenForm extends React.Component {
  static propTypes = {
    setToken: PropTypes.func.isRequired
  };

  handleSubmit = event => {
    event.preventDefault();
    const { setToken } = this.props;
    const token = this.tokenInput.value;
    if (token) {
      setToken(token);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="token"
          placeholder="Enter your GitHub token"
          ref={input => {
            this.tokenInput = input;
          }}
        />
      </form>
    );
  }
}
