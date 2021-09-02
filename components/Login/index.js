import Link from 'next/link'
import { Formik, FormikConsumer, useFormik } from 'formik'
import *as yup from 'yup'

import { 
  Container, 
  Box,
  Input, 
  Button, 
  Text, 
  FormControl,
  FormLabel,
  FormHelperText
} from '@chakra-ui/react'

import { Logo } from '../Logo'
import { firebaseClient, persistenceMode } from './../../config/firebase/client'

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
})

export const Login = () => {

  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit,
    isSubmitting  
  } = useFormik({
    onSubmit: async (values, form) => { 

      firebaseClient.auth().setPersistence(persistenceMode)

      try{
       const user = await firebaseClient.auth().signInWithEmailAndPassword(values.email, values.password)
       console.log(user)
       console.log(firebaseClient.auth().currentUser)
       
      }catch(error){
        console.log('ERROR', error)
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: ''
    }
  })

  return (
    <Container centerContent p={4}>
      <Logo/>
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      

        <FormControl id="email" p={4} isRequired>
          <FormLabel>E-mail</FormLabel>
          <Input size="lg" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
          {touched.email && <FormHelperText textColor="#ff1a00">{errors.email}</FormHelperText>}
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input size="lg" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
          {touched.password && <FormHelperText textColor="#ff1a00">{errors.password}</FormHelperText>}
        </FormControl>

        <Box p={4}>
          <Button width="100%" colorScheme="blue" color="#ffffff" onClick={handleSubmit} isLoading={isSubmitting}>Entrar</Button>
        </Box>
      </Box>

      <Link href='/signup'>Ainda não tem conta? Cadastre-se</Link>
    </Container>   
  )
}
