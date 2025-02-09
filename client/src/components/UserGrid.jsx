 import {Grid, Spinner} from "@chakra-ui/react"
 import data from '../dummy'
 import UserCard from './UserCard'
 import useUserStore from '../store.js'
 import {useEffect, useState} from 'react'
 const UserGrid =()=>{
    const { users, fetchUsers } = useUserStore();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchUsers(); // Fetch users on component mount
    }, []);


    if (users.length === 0) {
        return <Spinner size="xl" color="blue.500" textAlign={'center'} />;
    }
    return(
        <>
          <Grid
           templateColumns={{
            base:'1fr',
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)"
           }}
           gap={6}
          >
          {
            users.map((user)=>(
                <UserCard key={user.id} user={user}/>
            ))
          }
          </Grid>
        </>
    )
 }

 export default UserGrid;