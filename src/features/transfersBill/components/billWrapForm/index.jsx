import React from 'react';
import BillForm from '../billForm';

BillWrapForm.propTypes = {

};

function BillWrapForm(props) {
    const handleSubmit = (values) => {
        console.log('values', values);


    }
    return (
        <div>
            <BillForm onSubmit={handleSubmit} />
        </div>
    );
}

export default BillWrapForm;