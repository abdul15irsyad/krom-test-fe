import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateApplicant } from '../../hooks/use-applicant';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import { useListRoles } from '../../hooks/use-role';
import { useEffect } from 'react';

const defaultValues = {
  name: '',
  email: '',
  phoneNumber: '',
  appliedRoleId: '',
  yearsOfExperience: 0,
  location: '',
  resumeURL: '',
};

const addApplicantSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  email: z
    .string()
    .min(1, { message: 'name is required' })
    .email({ message: 'email is not valid email' }),
  phoneNumber: z.string().min(1, { message: 'phone number is required' }),
  appliedRoleId: z
    .string()
    .min(1, { message: 'applied role is required' })
    .uuid({ message: 'applied role id must be an uuid' }),
  yearsOfExperience: z.number().min(0, {
    message: 'years of experience must be greater than or equal 0',
  }),
  location: z.string().min(1, { message: 'location is required' }),
  resumeURL: z
    .string()
    .min(1, { message: 'resume url is required' })
    .url({ message: 'resume url is not valid url' }),
});

export const AddApplicantPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    handleSubmit,
    setError,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(addApplicantSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const { data: rolesResponse } = useListRoles();

  const { mutateAsync: createApplicant, error: mutateApplicantError } =
    useCreateApplicant();

  const onSubmit = handleSubmit(async (data) => {
    console.log({ data });
    const { data: newApplicant } = await createApplicant(data);
    enqueueSnackbar(`success add applicantion`, { variant: 'success' });
    navigate(`/detail/${newApplicant.id}`);
  });

  useEffect(() => {
    const error = mutateApplicantError;
    if (!error) return;

    const { response } = error;
    const message = response?.data?.message ?? error?.message ?? error;
    console.log(message);
    if (response?.status === 400) {
      if (response?.data?.message === 'validation error') {
        const errors = response?.data?.errors;
        enqueueSnackbar(`${message}`, {
          variant: 'error',
          autoHideDuration: 3000,
        });

        errors?.forEach((error) =>
          setError?.(error?.path as 'name', {
            type: 'required',
            message: error.msg,
          }),
        );
      } else {
        enqueueSnackbar(`${message}`, {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }
    }
  }, [enqueueSnackbar, mutateApplicantError, setError]);

  return (
    <Container sx={{ padding: 2 }}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        paddingBottom={2}
      >
        <Typography variant="h5" fontWeight={600}>
          Upload a new candidate application
        </Typography>
      </Stack>
      <Card sx={{ padding: 3 }}>
        <form onSubmit={onSubmit}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              alignItems: 'center',
              gap: 3,
              paddingBottom: 3,
            }}
          >
            <FormControl
              sx={{
                flexShrink: 0,
              }}
            >
              <TextField
                {...register('name')}
                size="small"
                id="name"
                placeholder="name, example: stephen curry"
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </FormControl>
            <FormControl
              sx={{
                flexShrink: 0,
              }}
            >
              <TextField
                {...register('phoneNumber')}
                size="small"
                id="phoneNumber"
                placeholder="phone number, example: +62888012345678"
                label="Phone Number"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            </FormControl>
            <FormControl
              sx={{
                flexShrink: 0,
              }}
            >
              <TextField
                {...register('email')}
                size="small"
                id="email"
                placeholder="email, example: stephencurry@email.com"
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </FormControl>
            <FormControl
              size="small"
              sx={{
                flexShrink: 0,
              }}
            >
              <InputLabel>Applied Role</InputLabel>
              <Select
                {...register('appliedRoleId')}
                input={<OutlinedInput label="Applied Role" />}
                MenuProps={{
                  PaperProps: {
                    sx: { maxHeight: 240 },
                  },
                }}
                error={!!errors.appliedRoleId}
              >
                <MenuItem value={''}>-- Show All --</MenuItem>
                {rolesResponse?.data?.map((role) => (
                  <MenuItem key={role?.id} value={role.id}>
                    {role?.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={!!errors.appliedRoleId}>
                {errors.appliedRoleId?.message}
              </FormHelperText>
            </FormControl>
            <FormControl
              size="small"
              sx={{
                flexShrink: 0,
              }}
            >
              <TextField
                {...register('yearsOfExperience', {
                  valueAsNumber: true,
                })}
                type="number"
                size="small"
                id="yearsOfExperience"
                placeholder="Years of Experience, example: 3"
                label="Years of Experience"
                error={!!errors.yearsOfExperience}
                helperText={errors.yearsOfExperience?.message}
              />
            </FormControl>
            <FormControl
              size="small"
              sx={{
                flexShrink: 0,
              }}
            >
              <TextField
                {...register('location')}
                size="small"
                id="location"
                placeholder="Location, example: Indonesia"
                label="Location"
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            </FormControl>
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              padding="4rem 0rem"
              width={'100%'}
              gap={2}
              sx={{
                backgroundColor: '#efefef',
                gridColumn: '1 / -1',
                borderRadius: '.5rem',
              }}
            >
              <Typography>Upload Resume URL</Typography>
              <FormControl
                size="small"
                sx={{
                  width: '50%',
                }}
              >
                <TextField
                  {...register('resumeURL')}
                  size="small"
                  id="resumeURL"
                  placeholder="Resume URL, example: http://example.com"
                  // label="Resume URL"
                  error={!!errors.resumeURL}
                  helperText={errors.resumeURL?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                    },
                  }}
                />
              </FormControl>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" gap={2}>
            <Button
              startIcon={<Icon icon={'mingcute:arrow-left-line'} />}
              component={Link}
              color="inherit"
              to={`/`}
              variant="text"
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              startIcon={<Icon icon={`mingcute:add-line`} />}
            >
              Submit Application
            </LoadingButton>
          </Box>
        </form>
      </Card>
    </Container>
  );
};
