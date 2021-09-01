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
  FormHelperText,
  InputLeftAddon,
  InputGroup 
} from '@chakra-ui/react'

import { Logo } from './../components'
import firebase from './../config/firebase'

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório'),
})

export default function Home() {

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
      try{
       const user = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
       console.log(user)
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
console.log(isSubmitting)
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


          <FormControl id="username" p={4} isRequired>
            <InputGroup size="lg">
              <InputLeftAddon>clocker.work/</InputLeftAddon>
              <Input type="username" value={values.username} onChange={handleChange} onBlur={handleBlur}/>
            </InputGroup>
            {touched.username && <FormHelperText textColor="#ff1a00">{errors.username}</FormHelperText>}
        </FormControl>
        <Box p={4}>
          <Button width="100%" colorScheme="blue" color="#ffffff" onClick={handleSubmit} isLoading={isSubmitting}>Entrar</Button>
        </Box>
      </Box>

      <Link href='/'>Já tem uma conta? Acesse!</Link>
    </Container>   
  )
}
