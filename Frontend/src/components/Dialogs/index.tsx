import React, {FC} from 'react';
import './Dialogs.scss'
import {DialogItem} from "@components/index";
import sortBy from 'lodash/sortBy'

const Dialogs: FC<any> = ({items, ownerId, onSearch, inputValue, onSelect}) => {

    return (
        <div className={'dialogs'}>
            {sortBy(items, ['created_at']).map((item) => {
                const {id, user, unreaded} = item
                return (
                    <DialogItem
                        key={id}
                        id={id}
                        user={user}
                        unreaded={unreaded}
                        message={item}
                        isMe={user.id === ownerId}
                    />
                )
            })
            }
        </div>
    );
};

export default Dialogs;