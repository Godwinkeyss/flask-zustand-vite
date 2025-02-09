import {Container, Box, Flex, Text, useColorMode, Button, useColorModeValue} from "@chakra-ui/react"
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";
import CreateUserModal from './CreateUserModal'

const Navbar = () =>{

    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Container maxW={'900px'}>
            <Box bg={useColorModeValue("gray.200", "gray.700")} borderRadius={5} my={6}>
                <Flex px={4} py={3} h='16'
                      alignItems={"center"}
                      justifyContent={"space-between"}
                     >
                   {/* left */}
                     <Flex
                     alignItems={"center"}
                     justifyContent={"center"}
                     gap={3}
                     display={{base:'none', sm:'flex'}}
                     >
                      <img src='./python.jpg' alt='python logo' width={40} height={40} objectFit={"cover"} />
                      <Text color={"white"} fontSize={"40px"}>+</Text>
                      <img src='./react.png' alt='python logo' width={40} height={40} objectFit={"cover"}/>
                      <Text color={"white"} fontSize={"40px"}>=</Text>
                      <img src='./js.png' alt='python logo' width={40} height={40} objectFit={"cover"} />
                     </Flex>

                   {/* right */}
                   <Flex 
                   alignItems={"center"}
                   gap={3}
                   >
                    <Text color={"white"} fontSize={"lg"} fontWeight={500} display={{base:'none', md:'block'}}>BFFship</Text>
                    <Button  onClick={toggleColorMode}>{colorMode === 'light' ? <BsFillMoonStarsFill size={20} /> : <IoSunny />}</Button>
                    <CreateUserModal  />
                   </Flex>
                </Flex>
            </Box>
        </Container>
    )
}

export default Navbar;