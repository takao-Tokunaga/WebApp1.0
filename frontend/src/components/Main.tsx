'use client'

import { jwtDecode } from 'jwt-decode'
import Header from './Header'
import TaskTable from './TaskTable'
import { Payload } from '../types/payload'
import { useQuery } from '@apollo/client'
import { GET_TASKS } from '../queries/taskQueries'
import { Task } from '../types/task'
import { Stack, Typography } from '@mui/material'
import AddTask from './AddTask'
import Loading from './Loading'

const Main = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode<Payload>(token!);
    const userId = decodedToken.sub;

    const { loading, data, error } = useQuery<{getTasks: Task[]}>(GET_TASKS, {
      variables: {userId}
    });
    console.log(data)
    return (
        <>
          <Header />
          <Stack spacing={4} direction='column' m={8} alignItems='center'>
           { loading && <Loading /> }
           { error && <Typography color='red'>エラーが発生しました</Typography> }
           { !loading && !error &&  (
            <>
              <AddTask userId={userId} />
              <TaskTable tasks={data?.getTasks} userId={userId}/>
            </>
         )}
         
          </Stack>
        </>
    )
}

export default Main