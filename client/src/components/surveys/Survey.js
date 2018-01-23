import React from 'react';

const Survey = ({survey: { body, dateSent, title, yes, no }}) => {
    
        return (
            <div className='card'>
                <div className='card-content'>
                    <span className='catd-title'>{title}</span>
                    <p>
                        {body}
                    </p>
                    <p className='right'>
                        Sent on: {new Date(dateSent).toLocaleDateString()}
                    </p>
                </div>
                <div className='card-action'>
                    <a>Yes: {yes}</a>
                    <a>No: {no}</a>
                </div>
            </div>
        );
}

export default Survey;