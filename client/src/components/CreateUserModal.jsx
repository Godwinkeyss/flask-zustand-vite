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
    RadioGroup,
    Radio
    
  } from "@chakra-ui/react"
import { MdAddBox } from "react-icons/md";
import useUserStore from '../store.js'
import {useState} from 'react'
const CreateUserModal =()=>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const addUser = useUserStore((state) => state.addUser);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault()
      const newUser = {
          name,
          email,
          role,
          gender,
          
      };
      await addUser(newUser); // Call Zustand function
      onClose(); // Close modal
      setName(""); setEmail(""); setRole(""); setGender(""); // Clear form
  };

   return (
    <>
    <Button onClick={onOpen}><MdAddBox size={20}/></Button>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>My New BFF😘</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
           <Flex alignItems={'center'} gap={3} mb={4}>
           <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input type='text' placeholder='John Doe' onChange={(e) => setName(e.target.value)} />
          
            </FormControl>
           <FormControl >
            <FormLabel>Role</FormLabel>
            <Input type='text' placeholder='Data Analyst' onChange={(e) => setRole(e.target.value)} />
          
            </FormControl>
           </Flex>
           <FormControl>
             <FormLabel>Description</FormLabel>
             <Textarea resize={'none'}
               overflowY={'hidden'}
               placeholder='He is a software'
               onChange={(e) => setEmail(e.target.value)}
             />
           </FormControl>
           <RadioGroup mt={4}>
             <Flex gap={5}>
                <Radio value='male' onChange={(e) => setGender(e.target.value)}>Male</Radio>
                <Radio value='female' onChange={(e) => setGender(e.target.value)}>Female</Radio>
             </Flex>
           </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type='submit'>
              Submt
            </Button>
            <Button colorScheme='red' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
        </form>
      </Modal>
    </>
   )
}
export default CreateUserModal;