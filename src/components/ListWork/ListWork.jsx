import PropTypes from "prop-types";

const ListWork = ({ works = [], onLocateWork }) => {
  return (
    <ul>
      {works.map(({ id, geocode, label }, idx) => (
        <li key={id}>
          <button type="button" onClick={() => onLocateWork(geocode, idx)}>
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
};

ListWork.propTypes = {
  works: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      geocode: PropTypes.arrayOf(PropTypes.number).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onLocateWork: PropTypes.func.isRequired,
};

export default ListWork;
