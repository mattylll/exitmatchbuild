import { redirect } from 'next/navigation'

// Redirect buyers/register to the main register page
// Users can select "Buy" option during registration
export default function BuyerRegisterPage() {
  redirect('/auth/register')
}