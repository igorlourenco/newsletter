import {useState} from 'react'
import { Flex, Button, Image, Text } from '@chakra-ui/core'
import Input from '../components/Input'

export default function Home() {
  const [email, setEmail] = useState();

  function handleSignUpToNewsletter(){}


  return (
      <Flex
          as="main"
          height="100vh"
          justifyContent="center"
          alignItems="center"
      >
        <Flex
            as="form"
            onSubmit={handleSignUpToNewsletter}
            backgroundColor="gray.700"
            borderRadius="md"
            flexDir="column"
            alignItems="stretch"
            padding={8}
            marginTop={4}
            width="100%"
            maxW="400px"
        >
          {/*<Image marginBottom={8} src="/rocketseat.svg" alt="Rocketseat" />*/}

          <Text textAlign="center" fontSize="sm" color="gray.400" marginBottom={2}>
            Assine a newsletter e receba os melhores conteúdos!
          </Text>

          <Input
              placeholder="Seu e-mail"
              marginTop={2}
              value={email}
              onChange={e => setEmail(e.target.value)}
          />

          <Button
              type="submit"
              backgroundColor="blue.500"
              height="50px"
              borderRadius="sm"
              marginTop={6}
              _hover={{ backgroundColor: 'blue.600' }}
          >
            INSCREVER
          </Button>
        </Flex>
      </Flex>
  )
}
