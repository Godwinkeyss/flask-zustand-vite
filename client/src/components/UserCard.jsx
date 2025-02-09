import { Card, CardHeader, CardBody, CardFooter, Flex, Box, Heading, Text, IconButton, useToast } from '@chakra-ui/react'
import { GoTrash } from "react-icons/go";
import EditUserModal from './EditUserModal'
import axios from 'axios'
import useUserStore from '../store';

const UserCard=({user})=>{
    const removeUser = useUserStore((state) => state.removeUser);
     const toast = useToast();
    const handleDeleteUser =async()=>{
        try {
            await removeUser(user.id); // Call Zustand function to delete user
            toast({
                title: "User deleted.",
                description: `${user.name} has been successfully deleted.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error deleting user.",
                description: "There was an issue deleting the user. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }

     
    }


    return(
        <>
        <Card w="100%" maxW="400px" p={4} boxShadow="md">
         <CardHeader>
            <Flex gap={4} justifyContent={'space-between'}>
                {/* left */}
                <Flex flex={'1'} gap={'4'} alignItems={'center'}>
                    <img src={user.imageUrl} alt='img' width={'40'} height={'40'} />
                    <Box>
                      <Heading size='sm'>{user.name}</Heading>
                      <Text>{user.role}</Text>
                    </Box>
                </Flex>
                {/* right */}
                <Flex alignItems={'center'}>
                <EditUserModal user={user} />
                <IconButton 
                variant='ghost'
                colorScheme='red'
                size={'sm'}
                arial-label='see menu'
                icon={<GoTrash size={20}/>}
                onClick={handleDeleteUser}
                />
                </Flex>
            </Flex>
         </CardHeader>
         <CardBody>
            <Text>{user.email}</Text>
         </CardBody>
        </Card>
        </>
    )
}

export default UserCard