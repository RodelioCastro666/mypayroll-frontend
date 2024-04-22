export const Departments = () => {

    return (
        <div className="grid grid-rows-[50px_1fr] ">
        <nav>
          <div className=" px-4 py-1 border-b-[1px] flex justify-end gap-3">
            <button className=" border-[1px] rounded px-10 py-1 hover:shadow-md">
              Create
            </button>
            <button className=" border-[1px] rounded px-10  hover:shadow-md">
              Join
            </button>
          </div>
        </nav>
  
        <section>
          <div>Department 1</div>
          <div>Department 2</div>
          <div>Department 3</div>
          <div>Department 4</div>
        </section>
      </div>
    )
}