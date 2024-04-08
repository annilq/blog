import { auth } from '@/auth';
import SignIn from '@/components/SignIn';


export default async function Comment() {
  const session = await auth();

  return (
    <div>
      <SignIn />
    </div>
  )
}
