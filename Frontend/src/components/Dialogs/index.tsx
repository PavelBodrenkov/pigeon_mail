import React, {FC} from 'react';
import {DialogItem} from "@components/index";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import isToday from "date-fns/isToday";
import format from "date-fns/format";
import {Avatar} from "antd";
import {dialogItem} from "types/dialogTypes";

interface DialogsProps {
    dialogs:dialogItem[],
}

const Dialogs: FC<DialogsProps> = ({dialogs}) => {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth)



    return (
        <div className={'dialogs'}>
            {dialogs?.map((item) => {
                const {sender, convid} = item
                return (
                    <DialogItem
                        key={convid}
                        item={item}
                        isMe={user.id === sender}
                    />
                )
            })
            }
        </div>
    );
};

export default Dialogs;