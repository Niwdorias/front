const MovieListItem = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster, title, genres = [], status } = movie;

  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img className="w-full aspect-video" src={poster} alt={title} />
            </div>
          </td>

          <td className="w-full pl-5">
            <div>
              <h1 className="text-lg font-semibold text-main dark:text-white">
                {title}
              </h1>
              <div className="space-x-1">
                {genres.map((g, index) => {
                  return (
                    <span
                      key={g + index}
                      className=" text-main dark:text-white text-xs"
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
            </div>
          </td>

          <td className="px-5">
            <p className="text-main dark:text-white">{status}</p>
          </td>

          <td>
            <div className="flex items-center space-x-3 text-main dark:text-white text-lg">
              <button onClick={onDeleteClick} type="button">
                <i className="bi bi-trash3-fill"></i>
              </button>
              <button onClick={onEditClick} type="button">
                <i className="bi bi-pen-fill"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MovieListItem;
