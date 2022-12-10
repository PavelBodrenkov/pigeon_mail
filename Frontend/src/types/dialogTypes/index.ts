export interface dialogItem {
    userid: number,
    fullname: string,
    readed:number,
    avatar: null | string,
    convid: number,
    sender: number,
    unread: number,
    message: string,
    date: string
}

export interface dialogProps {
    items:dialogItem[],
    ownerId: number
}



