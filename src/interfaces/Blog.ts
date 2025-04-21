export interface Post {
  id: number,
  userId: number
  title: string,
  body: string,
}
  
export interface Author {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    sreet: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}