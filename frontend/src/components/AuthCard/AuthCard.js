import React, { Component } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import './AuthCard.css';
import { Link } from 'react-router-dom';
import { saveAuth, signin, signup } from '../../lib/auth';

class AuthCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: false,
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async authFn() {
    let res = null;

    try {
      if (this.props.authMode === 'signup') {
        res = await signup(this.state.username, this.state.password);
      } else if (this.props.authMode === 'signin') {
        res = await signin(this.state.username, this.state.password);
      } else {
        console.error('Unknown auth mode');
      }

      if (res.success && res.token) {
        saveAuth(res.token);
        this.props.onAuth();
      } else {
        console.error('Auth Error: ', res);
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { className, title, showPasswordReset, btnText } = this.props;

    return (
      <div className={`${className}`}>
        <Card className="authCard">
          <CardContent>
            <form
              /**
               * You have to wrap this inside an arrow
               * function because of the following reason
               * https://stackoverflow.com/questions/45737145/cannot-read-property-onclick-of-undefined-in-react-component
               */
              onSubmit={(e) => {
                e.preventDefault();
                this.authFn();
              }}
            >
              <Typography
                className="authCard__title"
                variant="h5"
                component="h1"
              >
                {title}
              </Typography>
              <div className="authCard__inputs">
                <TextField
                  className="authCard__input"
                  label="Phone"
                  placeholder="Phone"
                  variant="outlined"
                  type="number"
                  value={this.state.username}
                  required
                  onChange={this.handleChange('username')}
                />
                <FormControl
                  className="authCard__input"
                  variant="outlined"
                  required
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    placeholder="Password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    labelWidth={70}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {showPasswordReset && (
                  <Link to="/login" className="authCard__resetPass">
                    Forgot Password ?
                  </Link>
                )}
              </div>
              <div className="authCard__footer">
                <Button
                  className="authCard__btn"
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth={true}
                >
                  {btnText}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

AuthCard.defaultProps = {
  onAuth: () => {},
};

export default AuthCard;
