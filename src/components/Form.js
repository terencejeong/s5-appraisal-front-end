import React, { Component } from 'react';
import { postAppraisal } from '../api/server.js'

class Form extends Component {
    state = {
        form: {
            appraisal: ''
        },
        loading: false
    }

    handleChange = event => {
        const value = event.target.value
        this.setState(() => ({ form: { appraisal: value } }))
    }

    handleSubmit = async(event) => {
        let { form } = this.state
        event.preventDefault();
        this.setState(() => ({ loading: true }))
        let appraisal = await postAppraisal(form)
        this.setState(() => ({ form: { appraisal: '' }, loading: false }))
    }

    render() {
        const { form: { appraisal }, loading } = this.state;

        return(
            <div className="form form__appraisal">
                <form 
                    onSubmit={this.handleSubmit}
                    className="form__appraisal__form"
                >
                    <input 
                        name="appraisal"
                        placeholder="Leave a compliment"
                        type="text"
                        value={appraisal}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                </form>
                <button 
                    className="button" 
                    type="submit" 
                    onClick={this.handleSubmit}
                    disabled={appraisal === ''}
                >
                    Submit
                </button>
                {loading &&
                    <div>
                        hello
                    </div>
                }
            </div>
        )
    }
}

export default Form