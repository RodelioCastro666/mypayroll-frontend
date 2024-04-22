export const Branches = () => {
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
        <div>Branch 1</div>
        <div>Branch 2</div>
        <div>Branch 3</div>
        <div>Branch 4</div>
      </section>
    </div>
  );
};
