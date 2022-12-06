import React from 'react';
import {Message} from "@components/index";

const Messages = ({items}) => {
    return items ? (
            <div>
                {items.map((message) => {
                    return (
                        <Message {...message} />
                    )
                })}
            </div>
        )
        :
        (<div>Откройте диалог</div>)
};

export default Messages;