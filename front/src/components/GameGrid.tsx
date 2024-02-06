const GameGrid = ({grid}: {grid: number[][]}) => {
  const gridHeight = 20
  const gridWidth = 10
  return (
    <div className='flex flex-col'>
      {grid.map((row, y) => (
        <div key={y} className='flex'>
          {row.map((cell, x) => (
            <div
              key={x}
              className={`w-8 h-8 border ${cell ? 'bg-green-500' : 'bg-gray-500'}`}
            />
          ))}
          {Array.from({length: gridWidth - row.length}).map((_, x) => (
            <div
              key={x}
              className='w-8 h-8 border bg-gray-500'
            />
          ))}
        </div>
      ))}
      {Array.from({length: gridHeight - grid.length}).map((_, y) => (
        <div key={y} className='flex'>
          {Array.from({length: gridWidth}).map((_, x) => (
            <div
              key={x}
              className='w-8 h-8 border bg-gray-500'
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default GameGrid