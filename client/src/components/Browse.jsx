import Job from "./Job"
import Navbar from "./shared/Navbar"


const random = [1, 2, 3]
const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">search results: {random.length}</h1>
        <div className="grid grid-cols-3 gap-4">
          {
            random.map((item, index) => (
              <Job />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Browse