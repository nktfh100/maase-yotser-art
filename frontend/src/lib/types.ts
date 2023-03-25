

export interface ApiPost {
    id: string
    title: string
    imageFile: ApiFile,
    collections: ApiCollection[]
}

export interface ApiCollection {
    id: string
    name: string
    slug: string
    postsCount: number
    posts: ApiPost[]
}

export interface ApiFile {
    id: string
    extension: string
    filesize: number
    height: number
    width: number
    url: string
}

export interface ApiHomePage {
    header: string
    carouselImage1: ApiFile
    carouselImage2: ApiFile
    carouselImage3: ApiFile
    carouselImage4: ApiFile
    featuredPosts: ApiPost[]
}

export interface ApiAboutPage {
    header: string
    aboutName: string
    aboutDescription: string
    aboutImageRight: ApiFile
    aboutImageLeft: ApiFile
}