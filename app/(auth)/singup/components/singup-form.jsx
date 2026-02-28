'use client'

import { useForm, Controller } from "react-hook-form"
import { Button, TextField, Box, Typography, Divider } from "@mui/material"
import Link from '@/components/Link'
import {signup} from '@/features/auth/singup'
import { decodeToken } from "@/lib/auth/ecode-token"

export default function SingupForm() {
  
  const {control, handleSubmit} = useForm({
    defaultValues: {
      username: '',
      password1: '',
      password2: '',
    }
  })

  const onSubmit = async (data) => {
  
    console.log(data);

    try {
      const result = await signup(data);
      
      console.log(result);

      const accessPayload  = decodeToken(result.access_token);
      const refreshPayload = decodeToken(result.refresh_token);

      console.log('Access token payload:',  accessPayload);
      console.log('Refresh token payload:', refreshPayload);
      

    } catch (error) {
      console.error('Error during signup:', error);

    }

  }
  
  return (
    <>
      <Box sx={{
        display:'flex',
        justifyContent:'center'
      }}>
        <Box 
          component={'form'}  
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display:'flex',
            flexDirection:'column',
            gap:4,
            width: '50vw',
            mt: 8,
          }}
        >
          
          <Box>
            <Typography variant="h4">Sign Up</Typography>
          </Box>

          <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:2
          }}>
            
            
            <Controller
              name='username'
              control={control}
              render={({field, formState:{errors}} ) => (
                <TextField
                  {...field}
                  label='Username'
                  variant="outlined"
                  fullWidth
                  error={!!errors.username}
                  helperText={!!errors.username ? errors.username.message : ''}
                />
              )}
              rules={{
                required: 'This field is required',
                minLength:{value: 3, message:'field must be at least 3 characters long'},
              }}
            />


            <Controller
              name="password1"
              control={control}
              render={({field, formState:{errors}}) => (
                <TextField
                  {...field}
                  label='Password'
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={!!errors.password1}
                  helperText={!!errors.password1 ? errors.password1.message : ''}
                />
              )}
              rules={{
                required: 'This field is required',
                minLength:{value: 8, message:'field must be at least 8 characters long'},
              }}
            />

            <Controller
              name="password2"
              control={control}
              render={({field, formState:{errors}}) => (
                <TextField
                  {...field}
                  label='Confirm Password'
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={!!errors.password2}
                  helperText={!!errors.password2 ? errors.password2.message : ''}
                />
              )}
              rules={{
                required: 'This field is required',
                minLength:{value: 8, message:'field must be at least 8 characters long'},
              }}
            />

          </Box>

          <Box sx={{
            display:'flex',
            flexDirection: 'column',
            gap:2
          }}>
            <Button type="submit" variant="contained" color="success" fullWidth>
              Sign Up
            </Button>

            <Divider>
              Or
            </Divider>
            
            <Button component={Link} href="/login" variant="contained" fullWidth>
              Login
            </Button>

          </Box>

        </Box>
      </Box>
    </>
  )
}