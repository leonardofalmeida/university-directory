import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import './Header.scss';
import { HeaderProps } from '../../constants/interfaces';

const Header = ({ searchItems }: HeaderProps) => {
  return (
    <>
      <h1 className="title">
        <FontAwesomeIcon icon={faFolderOpen} className="icon" />
        UNIVERSITY DIRECTORY
      </h1>
      <div className="custom-field">
        <label htmlFor="search" className="placeholder">
          Search by name:
        </label>
        <input
          onChange={event => searchItems(event.target.value)}
          id="search"
          autoComplete="off"
        />
      </div>
    </>
  );
};

export default Header;
