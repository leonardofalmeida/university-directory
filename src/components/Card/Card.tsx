import { CardProps } from '../../constants/interfaces';
import './Card.scss';

const Card = ({
  item: { name, alpha_two_code, web_pages, country },
}: CardProps) => {
  return (
    <div className="card-box" key={name + alpha_two_code}>
      <h2>
        {name} ({alpha_two_code})
      </h2>
      {web_pages &&
        web_pages.map(url => (
          <a key={url} href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        ))}
      <p>
        <b>Country:</b> {country}
      </p>
    </div>
  );
};

export default Card;
