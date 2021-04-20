interface BlogElement {
    id: number,
    title: string,
    body: string,
    userId: number,
} 

interface Comment {
    id: number,
    postId: number,
    name: string,
    body: string,
    email: string
}

interface Post extends BlogElement {
    comments?: Comment[]
}

export {
    Post,
    Comment
}