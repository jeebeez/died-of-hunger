function Nav() {
  return (
    <nav className=' top-0 z-50 border-gray-200 px-2 sm:px-4 py-5 md:sticky bg-gray-800'>
      <div className=' flex justify-center items-center'>
        <a
          href='https://atlas.kitchen/'
          target='_blank'
          className='flex items-center'
          rel='noreferrer'
        >
          <img
            src='https://media-exp1.licdn.com/dms/image/C560BAQGWhcfZEh_X_g/company-logo_200_200/0/1629390602015?e=2147483647&v=beta&t=8P3FQOePk7cqs_5RCBqnA7N9n57QJPmEYvOJ26sLwP4'
            className='mr-3 h-6 sm:h-9'
            alt='AtlasKitchen Logo'
          />
          <span className='self-center text-xl font-semibold  whitespace-nowrap text-white'>
            AtlasKitchen
          </span>
        </a>
      </div>
    </nav>
  )
}

export default Nav
