function HomePage() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white max-w-md w-full p-10 rounded-md'>
        <h1 className='text-3xl font-bold my-3 text-center'>
          Sistema Social Netork
        </h1>
        <h1 className='text-3xl font-bold my-3 text-center'>Web Language</h1>

        <div>
          <p className='gap-x-2 text-justify pt-5 mt-5 text-sm'>
            This system has been created in the field of Web Languages for the
            thesis Implementation of tests according to ISTQB for the analysis
            and comparison of web applications.
          </p>
          <hr
            className='my-5 h-px border-t-0 bg-transparent bg-gradient-to-r 
                    from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100'
          />
          <p className='text-center text-xs'>
            Derechos reservados JILV 9400; 2023
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
