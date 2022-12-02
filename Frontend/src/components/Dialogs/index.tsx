import React, {FC} from 'react';
import './Dialogs.scss'
import {DialogItem} from "@components/index";
import sortBy from 'lodash/sortBy'

const Dialogs: FC<any> = ({items, ownerId}) => {

    return (
        <div className={'dialogs'}>
            {sortBy(items, ['created_at']).map((item) => {
                return (
                    <DialogItem
                        user={item.user}
                        unreaded={item.unreaded}
                        message={item}
                        isMe={item.user.id === ownerId}
                    />
                )
            })
            }
        </div>
    );
};

export default Dialogs;