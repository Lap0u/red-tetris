import socketIO from 'socket.io-client';

const App = () => {
  const socket = socketIO.connect('http://localhost:3333');
  return (
    <div className='text-red-500 text-4xl'>Salut la team rocket </div>
  )
}

export default App
