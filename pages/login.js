import { getProviders, signIn } from 'next-auth/react'

function Login({ providers }) {
  return (
    <div className='bg-black h-screen overflow-hidden flex flex-col items-center justify-center'>
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="Spotify" />
      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button
            className='bg-[#18D860] text-white py-2 px-5 rounded-full'
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login

export async function getServerSideProps({ }) {
  const providers = await getProviders();
  return {
    props: {
      providers
    }
  }
}