import { SignIn } from '@clerk/clerk-react'
import './signInPage.css'

export default function SignInPage() {
  return (
    <div className="signInPage">
      <SignIn path="/sign-in" signUpUrl="/sign-up" />
    </div>
  )
}
