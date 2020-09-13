import React, { Component } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Redirect , Link} from "react-router-dom";
import { FormControl, Button, InputLabel, Input, FormHelperText, Select, MenuItem } from '@material-ui/core';

const dateError =  "This is not a valid date.";
class Insured extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateValid: false,
      buttonDisabled: true, 
      insureId: "",
      walletID: "",
      dateCreated: new Date(),
      location: "",
      coveragePlan: "Coverage Plan",
      premium: 0,
      payout: 0,
      rainfall: ""
    };
  }

  async componentDidMount() {
    const users = (await axios.get("http://localhost:8081/")).data;
    this.setState({
      users
    });
  }

  handleSubmit=() => {
    axios.post("/upload", {
        insuredId: this.state.insureId,
        walletID: this.state.walletID,
        dateCreated: this.state.dateCreated,
        location: this.state.location,
        coveragePlan: this.state.coveragePlan,
        premium: this.state.premium,
        payout: this.state.payout,
        rainfall: this.state.rainfall
      })
      .then((response) => {
        console.log(response, 'response');
        this.setState({ buttonDisabled: true });
      })
      .catch((e) => {
        console.log(e.response);
      });
  }

  isValidDate = (dateString) => {
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

  render() {
    return (
      <div className="container">
      <h3 className="m-0">
                <Link style={{ textDecoration: 'none' }} to="/">
                  {"DISASTER VIBES"}
                </Link>
              </h3>
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Smart Contract Form</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <FormControl>
                <InputLabel htmlFor="my-input">Insure ID</InputLabel>
                <Input 
                    id="my-input" 
                    aria-describedby="my-helper-text" 
                    onChange = {(event) => {
                        this.setState({insureId: event.target.value})
                        if ((event.target.value).length > 0) {
                            this.setState({buttonDisabled: false})
                        }
                        else {
                            this.setState({buttonDisabled: true})
                        }
                    }}
                    />
                <FormHelperText id="my-helper-text">We'll never share your id.</FormHelperText>
            </FormControl>
            <div/>
            <FormControl>
                <InputLabel htmlFor="my-input">Wallet ID</InputLabel>
                <Input 
                    id="my-input" 
                    onChange = {(event) => {
                        this.setState({walletID: event.target.value})
                        if ((event.target.value).length > 0) {
                            this.setState({buttonDisabled: false})
                        }
                        else {
                            this.setState({buttonDisabled: true})
                        }
                    }}
                    />
            </FormControl>
            <div/>
            <FormControl>
                <InputLabel htmlFor="my-input">Date Created</InputLabel>
                <Input 
                    id="my-input" 
                    onChange = {(event) => {
                        if (this.isValidDate(event.target.value)) {
                            this.setState({dateCreated: event.target.value})
                            this.setState({buttonDisabled: false, dateValid: true})
                        }
                        else {
                            this.setState({buttonDisabled: true, dateValid: false})
                        }
                    }}
                    />
                    <FormHelperText id="my-helper-text">{this.state.dateValid ? "": dateError}</FormHelperText>
            </FormControl>
            <div/>
            <FormControl>
                <InputLabel htmlFor="my-input">Location</InputLabel>
                <Input 
                    id="my-input" 
                    onChange = {(event) => {
                        this.setState({location: event.target.value})
                        if ((event.target.value).length > 0) {
                            this.setState({buttonDisabled: false})
                        }
                        else {
                            this.setState({buttonDisabled: true})
                        }
                    }}
                    />
            </FormControl>
            <div/>
            <FormControl>
                <InputLabel style={{marginTop: 20, fontSize: 25}}>{this.state.coveragePlan == "Coverage Plan" ? this.state.coveragePlan : ""}</InputLabel>
                <Select
                    style={{width: 210}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.coveragePlan}
                    onChange = {(event) => {
                        this.setState({coveragePlan: event.target.value})
                        if ((event.target.value).length > 0) {
                            this.setState({buttonDisabled: false})
                        }
                        else {
                            this.setState({buttonDisabled: true})
                        }
                    }}
                    >
                    <MenuItem value={"Moving Precipitation Avg"}>Moving Precipitation Avg</MenuItem>
                    <MenuItem value={"Moving Temperature Avg"}>Moving Temperature Avg</MenuItem>
                </Select>
            </FormControl>
            <div/>
            <FormControl>
                <InputLabel htmlFor="my-input">Premium</InputLabel>
                <Input 
                    id="my-input" 
                    onChange = {(event) => {
                        this.setState({premium: event.target.value})
                        if ((event.target.value).length > 0) {
                            this.setState({buttonDisabled: false})
                        }
                        else {
                            this.setState({buttonDisabled: true})
                        }
                    }}
                    />
            </FormControl>
            <div/>
            <FormControl>
                <InputLabel htmlFor="my-input">Payout</InputLabel>
                <Input 
                    id="my-input" 
                    onChange = {(event) => {
                        this.setState({payout: event.target.value})
                        if ((event.target.value).length > 0) {
                            this.setState({buttonDisabled: false})
                        }
                        else {
                            this.setState({buttonDisabled: true})
                        }
                    }}
                    />
            </FormControl>
            <div/>
            <div/>
            <div className="col-lg-12 text-center">
                <h5 className="mt-10">Set Your Thresholds!</h5>
          </div>
          <div/>
            <FormControl>
                <InputLabel htmlFor="my-input">Rainfall</InputLabel>
                <Input 
                    id="my-input" 
                    onChange = {(event) => {
                        this.setState({rainfall: event.target.value})
                        if ((event.target.value).length > 0) {
                            this.setState({buttonDisabled: false})
                        }
                        else {
                            this.setState({buttonDisabled: true})
                        }
                    }}
                    />
            </FormControl>
            <div/>
            <Button 
            style={{marginTop: 20}}
            variant="outlined" 
            color="primary"
            onClick={e => {
                e.preventDefault();
                if (!this.state.buttonDisabled) {
                    this.handleSubmit();
                }
            }}
            >
            Submit
        </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Insured;
