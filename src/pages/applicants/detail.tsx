import { Link, useParams } from 'react-router-dom';
import { useApplicant } from '../../hooks/use-applicant';
import { NotFoundPage } from '../notfound';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { PillStatus } from './list-row';
import { Icon } from '@iconify/react';
import { LoadingIllustration } from '../../components/loading-illustration/loading-illustration';

export const DetailApplicationPage = () => {
  const { id } = useParams();
  const { data: applicantResponse, isLoading, isError } = useApplicant(id!);

  if (isError) return <NotFoundPage />;

  return (
    <Container sx={{ padding: 2 }}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        paddingBottom={2}
      >
        <Typography variant="h5" fontWeight={600}>
          Detail Applicant
        </Typography>
      </Stack>
      <Card sx={{ padding: 3 }}>
        {!isLoading ? (
          <Box display={'flex'} columnGap={4}>
            <img
              src="/images/dummy-profile.jpg"
              width={200}
              height={200}
              style={{ borderRadius: '1rem' }}
            />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'fit-content(100%) 1fr',
                alignItems: 'center',
                gap: 1,
                columnGap: 5,
                paddingBottom: 3,
              }}
            >
              <>
                <Typography>Name</Typography>
                <Typography fontWeight={'bold'}>
                  {applicantResponse?.data?.name}
                </Typography>
              </>
              <>
                <Typography>Email</Typography>
                <Box>
                  <Typography
                    component={Link}
                    to={`mailto:${applicantResponse?.data?.email}`}
                    target="_blank"
                  >
                    {applicantResponse?.data?.email}
                  </Typography>
                </Box>
              </>
              <>
                <Typography>Phone Number</Typography>
                <Typography>{applicantResponse?.data?.phoneNumber}</Typography>
              </>
              <>
                <Typography>Years of Experience</Typography>
                <Typography>
                  {applicantResponse?.data?.yearsOfExperience} years
                </Typography>
              </>
              <>
                <Typography>Role Applied For</Typography>
                <Typography>
                  {applicantResponse?.data?.appliedRole.name}
                </Typography>
              </>
              <>
                <Typography>Resume</Typography>
                <Box>
                  <Typography
                    fontWeight="bold"
                    component={Link}
                    to={applicantResponse?.data?.resumeURL ?? '#'}
                    target="_blank"
                  >
                    Resume
                  </Typography>
                </Box>
              </>
              <>
                <Typography>Status</Typography>
                <Box>
                  <PillStatus
                    sx={{
                      fontSize: '14px',
                      borderRadius: '.5rem',
                      padding: '.3rem .75rem',
                    }}
                    name={
                      applicantResponse?.data?.applicationStatus?.name ?? ''
                    }
                  />
                </Box>
              </>
            </Box>
          </Box>
        ) : (
          <LoadingIllustration />
        )}
        <Stack direction="row" justifyContent={'space-between'}>
          <Button
            startIcon={<Icon icon={'mingcute:arrow-left-line'} />}
            component={Link}
            to={`/`}
            color="inherit"
            variant="text"
          >
            Back
          </Button>
          <Box display={'flex'} gap={2}>
            <Button
              startIcon={<Icon icon={'mingcute:calendar-2-line'} />}
              variant="contained"
            >
              Schedule Interview
            </Button>
            <Button
              startIcon={<Icon icon={'mingcute:file-check-fill'} />}
              variant="outlined"
            >
              Review
            </Button>
          </Box>
        </Stack>
      </Card>
    </Container>
  );
};
