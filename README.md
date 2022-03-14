# TSIt

Get TS type defentions from json end-point

- Open command palette
- Search for Get Types
- insert valid URL

## Outut

```typescript
// https://jsonplaceholder.typicode.com/users
interface Users {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}
interface Company {
  name: string
  catchPhrase: string
  bs: string
}
interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}
interface Geo {
  lat: string
  lng: string
}
```
