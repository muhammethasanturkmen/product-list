import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function Stars({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} color="#ffc107" />);
    } else if (i - rating < 1) {
      stars.push(<FaStarHalfAlt key={i} color="#ffc107" />);
    } else {
      stars.push(<FaRegStar key={i} color="#ffc107" />);
    }
  }

  return <div style={{ display: "flex", gap: "4px" }}>{stars}</div>;
}
