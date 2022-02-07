import {
  Button,
  Center,
  Container,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { memo, useState } from "react";

// ここまで「import」
//
//
//
// ここから

const SignIn: NextPage = memo(() => {
  const [email, setEmail] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSpinnerOpen,
    onOpen: onSpinnerOpen,
    onClose: onSpinnerClose,
  } = useDisclosure();

  const onClickSignIn = async () => {
    onSpinnerOpen();
    try {
      const { error } = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: `${window.location.origin}/`,
      });
      if (error) {
        throw new Error(error);
      }
      onSpinnerClose();
      onOpen();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Center minH={"100vh"}>
          <HStack>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              w={400}
            />
            <Button onClick={onClickSignIn}>Sign In</Button>
          </HStack>
        </Center>
      </Container>

      <Modal isOpen={isSpinnerOpen} onClose={onSpinnerOpen}>
        <ModalOverlay>
          <Center minH={"100vh"}>
            <Spinner size={"xl"} emptyColor={"white"} />
          </Center>
        </ModalOverlay>
      </Modal>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent my={"auto"}>
          <ModalBody>
            <Text>
              We emailed a magic link to{" "}
              <strong>{email}</strong>. Check your inbox and
              click the link in the email to login.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
SignIn.displayName = "SignIn";

export default SignIn;
