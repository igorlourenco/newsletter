import {FormEvent, useState} from 'react'
import {Flex, Button, Text, useToast} from '@chakra-ui/core'
import Input from '../components/Input'
import axios from 'axios'

export default function Home() {

    const toast = useToast();

    const [email, setEmail] = useState();

    const [loading, setLoading] = useState(false);
    const handleLoading = () => setLoading(!loading);

    async function handleSignUpToNewsletter(event: FormEvent) {
        event.preventDefault()
        handleLoading()
        const response = await axios.post('/api/subscribe', {email})
        if (response.status === 201) {
            setLoading(false)
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
            toast({
                title: "Inscrição concluída",
                description: "Você foi incluído na lista de recebimento da newsletter!",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        }
    }


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
                    as="input"
                    placeholder="Seu e-mail"
                    id="email"
                    marginTop={2}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Button
                    isLoading={loading}
                    type="submit"
                    backgroundColor="blue.500"
                    height="50px"
                    borderRadius="sm"
                    marginTop={6}
                    _hover={{backgroundColor: 'blue.600'}}
                >
                    INSCREVER
                </Button>
            </Flex>
        </Flex>
    )
}
