import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";

const Record = (props) => (
    <tr>
        <td>{props.record.person_name}</td>
        <td>{props.record.person_position}</td>
        <td>{props.record.person_level}</td>
        <td>
            <Link to={"/edit/" + props.record._id}>Edit</Link>
            <a
                href="/"
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}>
                Delete
             </a>
        </td>
    </tr>
)

export default class RecordList extends Component {
    constructor(props) {
        super(props);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.state = { records: [] };
    }

    componentDidMount() {
        axios
            .get("https://localhost:3000/record/")
            .then((response) => {
                this.setState({ records: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteRecord(id) {
        axios.delete("https://localhost:3000/" + id).then((response) => {
            console.log(response.data);
        });

        this.setState({
            record: this.state.records.filter((el) => el._id !== id),
        });
    }

    recordList() {
        return this.state.records.map((currentRecord) => {
            return (
                <Record
                    record={currentRecord}
                    deleteRecord={this.deleteRecord}
                    key={currentRecord._id}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <h3>Record List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Level</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{this.recordList()}</tbody>
                </table>
            </div>
        );
    }
}
