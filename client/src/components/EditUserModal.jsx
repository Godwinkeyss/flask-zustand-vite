import {Button,Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,useDisclosure, Flex, FormControl,
    FormLabel,
    Input,
    Textarea,
    
    
  } from "@chakra-ui/react"
import { FaRegEdit } from "react-icons/fa";
import {useState, useEffect} from 'react'
import useUserStore from '../store.js'
const EditUserModal =({user})=>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const updateUser = useUserStore((state) => state.updateUser);
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [role, setRole] = useState(user ? user.role : '');


    useEffect(() => {
        // Update state if user prop changes
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    const handleUpdateUser =async(e)=>{
        e.preventDefault()
        const newUser = {
            id:user.id,
            name,
            email,
            role
        }
        try{
            await updateUser(newUser);
            onClose();
        }catch(error){
            console.error("Error updating user:", error);
        // If error is network related, log further details
        if (error.response) {
            console.error("Response error:", error.response);
        } else if (error.request) {
            console.error("Request error:", error.request);
        } else {
            console.error("General error:", error.message);
        }
        }
        
    }
    return(

       <div>

        <Button onClick={onOpen}><FaRegEdit size={20}/></Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleUpdateUser}>
                <ModalContent>
                  <ModalHeader>Update BFF😘</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                   <Flex alignItems={'center'} gap={3} mb={4}>
                   <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input type='text' placeholder='John Doe' value={name} onChange={(e) => setName(e.target.value)} />
                  
                    </FormControl>
                   <FormControl >
                    <FormLabel>Role</FormLabel>
                    <Input type='text' placeholder='Data Analyst' value={role} onChange={(e) => setRole(e.target.value)}/>
                  
                    </FormControl>
                   </Flex>
                   <FormControl>
                     <FormLabel>Description</FormLabel>
                     <Textarea resize={'none'}
                       overflowY={'hidden'}
                       placeholder='He is a software'
                       value={email} onChange={(e) => setEmail(e.target.value)}
                     />
                   </FormControl>
                   
                  </ModalBody>
        
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} type='submit'>
                      Update
                    </Button>
                    <Button colorScheme='red' onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
                </form>
              </Modal>
       </div> 
    )
}

export default EditUserModal;