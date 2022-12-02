import React, {FC} from 'react';
// @ts-ignore
import readedSvg from '../../assets/img/readed.svg';
// @ts-ignore
import noReadedSvg from '../../assets/img/noreaded.svg';

interface MessageStatusProps {
    isMe:boolean,
    isReaded:boolean
}

const MessageStatus:FC<MessageStatusProps> = ({isMe, isReaded}) => {
    return (
        <div>
            {isMe &&
                (isReaded ? (
                    <img
                        className={'message__icon-readed'}
                        src={readedSvg}
                        alt={'readed icon'}
                    />
                ) :
                (
                    <img
                        className={'message__icon-readed message__icon-readed--no'}
                        src={noReadedSvg}
                        alt={'No readed icon'}
                    />
                ))
            }
        </div>
    );
};

export default MessageStatus;