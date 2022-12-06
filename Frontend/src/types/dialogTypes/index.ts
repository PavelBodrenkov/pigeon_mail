export interface dialogItem {
    id: number,
    text: string,
    isReaded: boolean,
    created_at: Date,
    user: {
        id: number,
        isOnline: boolean,
        fullname: string,
        avatar: string
    },
    unreaded: number
}

export interface dialogProps {
    items:dialogItem[],
    ownerId: number
}



