import React, {FC} from 'react';
import distanceInWordsToNow from 'date-fns/formatDistanceToNow'
import ruLocale from 'date-fns/locale/ru';

const Time: FC<{date:string}> = ({date}) => {

    return (
        <>
            {
                distanceInWordsToNow(new Date(date),
                    {
                        addSuffix: true,
                        locale: ruLocale
                    }
                )
            }
        </>
    )
}

export default Time;