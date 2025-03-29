/* eslint-disable react/prop-types */
const Container = ({ children }) => {
  return (
    <div className='max-w-[2520px] mx-auto xl:px-8 md:px-4 sm:px-2 px-1'>
      {children}
    </div>
  )
}

export default Container
